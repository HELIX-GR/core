package gr.helix.core.web.service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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

    private static final Logger  logger = LoggerFactory.getLogger(SearchService.class);

    @Autowired
    @Qualifier("dataCkanServiceProxy")
    private CkanServiceProxy     dataCkanServiceProxy;

    @Autowired
    @Qualifier("labCkanServiceProxy")
    private CkanServiceProxy     labCkanServiceProxy;

    @Autowired
    private OpenaireServiceProxy openaireServiceProxy;

    public CompositeCatalogResult queryCatalog(EnumCatalog[] catalogs, String term) throws InterruptedException, ExecutionException {
        final CompositeCatalogQuery compositeQuery = new CompositeCatalogQuery();

        for (final EnumCatalog catalog : catalogs) {
            switch (catalog) {
                case CKAN:
                    final CkanCatalogQuery dataQuery = new CkanCatalogQuery();
                    dataQuery.setPageIndex(0);
                    dataQuery.setPageSize(10);
                    dataQuery.setTerm(term);
                    compositeQuery.getQueries().put(catalog, dataQuery);
                    break;
                case OPENAIRE:
                    final CatalogQuery openaireQuery = new OpenaireCatalogQuery();
                    openaireQuery.setPageIndex(0);
                    openaireQuery.setPageSize(10);
                    openaireQuery.setTerm(term);
                    compositeQuery.getQueries().put(catalog, openaireQuery);
                    break;
                case LAB:
                    final CkanCatalogQuery labQuery = new CkanCatalogQuery();
                    labQuery.setPageIndex(0);
                    labQuery.setPageSize(10);
                    labQuery.setTerm(term);
                    compositeQuery.getQueries().put(catalog, labQuery);
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

        return this.dataCkanServiceProxy.getPackages(query, false);
    }

    public CatalogResult<?> queryNotebooks(String term) {
        final CkanCatalogQuery query = new CkanCatalogQuery();
        query.setPageIndex(0);
        query.setPageSize(10);
        query.setTerm(term);

        return this.labCkanServiceProxy.getPackages(query, false);
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
                        result.add(key, this.dataCkanServiceProxy.getPackages((CkanCatalogQuery) catalogQuery, true));
                        break;
                    case OPENAIRE:
                        result.add(key, this.openaireServiceProxy.getPublications((OpenaireCatalogQuery) catalogQuery));
                        break;
                    case LAB:
                        result.add(key, this.labCkanServiceProxy.getPackages((CkanCatalogQuery) catalogQuery, true));
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
        return this.dataCkanServiceProxy.getPackages(query, true);
    }

    public CatalogResult<?> queryNotebooks(CkanCatalogQuery query) {
        return this.labCkanServiceProxy.getPackages(query, true);
    }

    public CatalogResult<?> queryPublications(OpenaireCatalogQuery query) {
        return this.openaireServiceProxy.getPublications(query);
    }

    private CompositeCatalogResult queryAsync(CompositeCatalogQuery query) throws InterruptedException, ExecutionException {
        // Data
        final CatalogQuery dataQuery = query.getQueries().get(EnumCatalog.CKAN);
        final CompletableFuture<CatalogResult<Package>> packages = CompletableFuture
                .supplyAsync(() -> this.dataCkanServiceProxy.getPackages((CkanCatalogQuery) dataQuery, true)).handle((rs, ex) -> {
                    if (rs != null) {
                        return rs;
                    }
                    return new CatalogResult<Package>();
                });
        // Notebooks
        final CatalogQuery notebookQuery = query.getQueries().get(EnumCatalog.LAB);
        final CompletableFuture<CatalogResult<Package>> notebooks = CompletableFuture
                .supplyAsync(() -> this.labCkanServiceProxy.getPackages((CkanCatalogQuery) notebookQuery, true)).handle((rs, ex) -> {
                    if (rs != null) {
                        return rs;
                    }
                    return new CatalogResult<Package>();
                });
        // Publications
        final CatalogQuery openaireQuery = query.getQueries().get(EnumCatalog.OPENAIRE);
        final CompletableFuture<CatalogResult<Publication>> publications = CompletableFuture
                .supplyAsync(() -> this.openaireServiceProxy.getPublications((OpenaireCatalogQuery) openaireQuery)).handle((rs, ex) -> {
                    if (rs != null) {
                        return rs;
                    }
                    return new CatalogResult<Publication>();
                });
        // Combine all results
        final CompletableFuture<CompositeCatalogResult> compositeResult = packages
                .thenCombine(notebooks, (dataResult, notebookResult) -> {
                    final CompositeCatalogResult result = new CompositeCatalogResult();
                    result.getCatalogs().put(EnumCatalog.CKAN, dataResult);
                    result.getCatalogs().put(EnumCatalog.LAB, notebookResult);
                    return result;
                })
                .thenCombine(publications, (result, openaireResult) -> {
                    result.getCatalogs().put(EnumCatalog.OPENAIRE, openaireResult);
                    return result;
                }).handle((rs, ex) -> {
                    if (ex != null) {
                        logger.error(ex.getMessage(), ex);
                    }
                    if (rs != null) {
                        return rs;
                    }
                    return new CompositeCatalogResult();
                });

        return compositeResult.get();
    }

}
