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
import gr.helix.core.web.model.ckan.Package;
import gr.helix.core.web.model.openaire.client.Publication;

@Service
public class SearchService {

    @Autowired
    private CkanServiceProxy     ckanServiceProxy;

    @Autowired
    private OpenaireServiceProxy openaireServiceProxy;

    public CompositeCatalogResult queryCatalog(EnumCatalog catalog, String term) {
        final CompositeCatalogResult result = new CompositeCatalogResult();

        switch (catalog) {
            case CKAN:
                result.add(catalog, this.queryData(term));
                break;
            case OPENAIRE:
                result.add(catalog, this.queryPublications(term));
                break;
            default:
                // Not supported
                break;
        }

        return result;
    }

    public CatalogResult<?> queryData(String term) {
        final CatalogQuery query = new CatalogQuery();
        query.setPageIndex(0);
        query.setPageSize(10);
        query.setTerm(term);

        return this.ckanServiceProxy.getPackages(query);
    }

    public CatalogResult<?> queryPublications(String term) {
        final CatalogQuery query = new CatalogQuery();
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
                        result.add(key, this.ckanServiceProxy.getPackages(catalogQuery));
                        break;
                    case OPENAIRE:
                        result.add(key, this.openaireServiceProxy.getPublications(catalogQuery));
                        break;
                    default:
                        // Not supported
                        break;
                }
            });
        }
        return result;
    }

    public CatalogResult<?> queryData(CatalogQuery query) {
        return this.ckanServiceProxy.getPackages(query);
    }

    public CatalogResult<?> queryPublications(CatalogQuery query) {
        return this.openaireServiceProxy.getPublications(query);
    }

    private CompositeCatalogResult queryAsync(CompositeCatalogQuery query) throws InterruptedException, ExecutionException {
        final CatalogQuery ckanQuery = query.getQueries().get(EnumCatalog.CKAN);

        final CompletableFuture<CatalogResult<Package>> packages = CompletableFuture
            .supplyAsync(() -> this.ckanServiceProxy.getPackages(ckanQuery)).handle((rs, ex) -> {
                if (rs != null) {
                    return rs;
                }
                return new CatalogResult<Package>();
            });

        final CatalogQuery openaireQuery = query.getQueries().get(EnumCatalog.OPENAIRE);

        final CompletableFuture<CatalogResult<Publication>> publications = CompletableFuture
            .supplyAsync(() -> this.openaireServiceProxy.getPublications(openaireQuery)).handle((rs, ex) -> {
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
