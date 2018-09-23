package gr.helix.core.web.service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gr.helix.core.web.model.CatalogQuery;
import gr.helix.core.web.model.CatalogResult;
import gr.helix.core.web.model.CompositeCatalogQuery;
import gr.helix.core.web.model.CompositeCatalogResult;
import gr.helix.core.web.model.EnumCatalog;
import gr.helix.core.web.model.ckan.CkanCatalogQuery;
import gr.helix.core.web.model.ckan.Package;
import gr.helix.core.web.model.openaire.OpenaireCatalogQuery;
import gr.helix.core.web.model.openaire.client.Publication;

@Service
public class SearchService {

    @Autowired
    private CkanServiceProxy     ckanServiceProxy;

    @Autowired
    private OpenaireServiceProxy openaireServiceProxy;

    public CompositeCatalogResult queryCatalog(EnumCatalog[] catalogs, String term) throws InterruptedException, ExecutionException {
        final CompositeCatalogQuery compositeQuery = new CompositeCatalogQuery();

        for (final EnumCatalog catalog : catalogs) {
            switch (catalog) {
                case CKAN:
                    final CkanCatalogQuery ckanQuery = new CkanCatalogQuery();
                    ckanQuery.setPageIndex(0);
                    ckanQuery.setPageSize(10);
                    ckanQuery.setTerm(term);
                    compositeQuery.getQueries().put(EnumCatalog.CKAN, ckanQuery);
                    break;
                case OPENAIRE:
                    final CatalogQuery openaireQuery = new OpenaireCatalogQuery();
                    openaireQuery.setPageIndex(0);
                    openaireQuery.setPageSize(10);
                    openaireQuery.setTerm(term);
                    compositeQuery.getQueries().put(EnumCatalog.OPENAIRE, openaireQuery);
                    break;
                default:
                    // Not supported
                    break;
            }
        }

        return this.queryCatalog(compositeQuery);
    }

    public CatalogResult<?> queryData(String term) {
        final CkanCatalogQuery query = new CkanCatalogQuery();
        query.setPageIndex(0);
        query.setPageSize(10);
        query.setTerm(term);

        return this.ckanServiceProxy.getPackages(query, false);
    }

    public CatalogResult<?> queryPublications(String term) {
        final OpenaireCatalogQuery query = new OpenaireCatalogQuery();
        query.setPageIndex(0);
        query.setPageSize(10);
        query.setTerm(term);

        return this.openaireServiceProxy.getPublications(query);
    }

    public CompositeCatalogResult queryCatalog(CompositeCatalogQuery query) throws InterruptedException, ExecutionException {
        final CompositeCatalogResult result = new CompositeCatalogResult();
        if (query.isParallel()) {
            result.merge(this.queryAsync(query));
        } else {
            query.getQueries().keySet().stream().forEach(key -> {
                final CatalogQuery catalogQuery = query.getQueries().get(key);
                switch (key) {
                    case CKAN:
                        result.add(key, this.ckanServiceProxy.getPackages((CkanCatalogQuery) catalogQuery, true));
                        break;
                    case OPENAIRE:
                        result.add(key, this.openaireServiceProxy.getPublications((OpenaireCatalogQuery) catalogQuery));
                        break;
                    default:
                        // Not supported
                        break;
                }
            });
        }
        return result;
    }

    public CatalogResult<?> queryData(CkanCatalogQuery query) {
        return this.ckanServiceProxy.getPackages(query, true);
    }

    public CatalogResult<?> queryPublications(OpenaireCatalogQuery query) {
        return this.openaireServiceProxy.getPublications(query);
    }

    private CompositeCatalogResult queryAsync(CompositeCatalogQuery query)
            throws InterruptedException, ExecutionException {
        final CatalogQuery ckanQuery = query.getQueries().get(EnumCatalog.CKAN);

        final CompletableFuture<CatalogResult<Package>> packages = CompletableFuture
                .supplyAsync(() -> this.ckanServiceProxy.getPackages((CkanCatalogQuery) ckanQuery, true)).handle((rs, ex) -> {
                    if (rs != null) {
                        return rs;
                    }
                    return new CatalogResult<Package>();
                });

        final CatalogQuery openaireQuery = query.getQueries().get(EnumCatalog.OPENAIRE);

        final CompletableFuture<CatalogResult<Publication>> publications = CompletableFuture
                .supplyAsync(() -> this.openaireServiceProxy.getPublications((OpenaireCatalogQuery) openaireQuery)).handle((rs, ex) -> {
                    if (rs != null) {
                        return rs;
                    }
                    return new CatalogResult<Publication>();
                });

        final CompletableFuture<CompositeCatalogResult> compositeResult = packages
                .thenCombine(publications, (ckanResult, openaireResult) -> {
                    final CompositeCatalogResult result = new CompositeCatalogResult();
                    result.getCatalogs().put(EnumCatalog.CKAN, ckanResult);
                    result.getCatalogs().put(EnumCatalog.OPENAIRE, openaireResult);
                    return result;
                }).handle((rs, ex) -> {
                    if (rs != null) {
                        return rs;
                    }
                    return new CompositeCatalogResult();
                });

        return compositeResult.get();
    }

}
