package gr.helix.core.web.controller.action;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gr.helix.core.common.model.BasicErrorCode;
import gr.helix.core.common.model.EnumCatalog;
import gr.helix.core.common.model.RestResponse;
import gr.helix.core.web.model.CompositeCatalogQuery;
import gr.helix.core.web.model.CompositeCatalogResult;
import gr.helix.core.web.model.ckan.CkanCatalogQuery;
import gr.helix.core.web.service.SearchService;

@RestController
@RequestMapping(produces = "application/json")
public class SearchController {

    private static final Logger logger = LoggerFactory.getLogger(SearchController.class);

    @Autowired
    private SearchService       searchService;

    @RequestMapping(value = "/action/catalog/query", method = RequestMethod.GET)
    public RestResponse<?> query(Authentication authentication, @RequestParam EnumCatalog[] catalogs, @RequestParam String search) {
        try {
            final CompositeCatalogResult result = this.searchService.queryCatalog(catalogs, search);
            return RestResponse.result(result);
        } catch (final Exception ex) {
            logger.error(ex.getMessage(), ex);
            return RestResponse.error(BasicErrorCode.UNKNOWN, "An unknown error has occurred");
        }
    }

    @RequestMapping(value = "/action/data/query", method = RequestMethod.GET)
    public RestResponse<?> getData(Authentication authentication, @RequestParam String search) {
        try {
            return RestResponse.result(this.searchService.queryData(search));
        } catch (final Exception ex) {
            logger.error(ex.getMessage(), ex);
            return RestResponse.error(BasicErrorCode.UNKNOWN, "An unknown error has occurred");
        }
    }

    @RequestMapping(value = "/action/notebook/query", method = RequestMethod.GET)
    public RestResponse<?> getNotebooks(Authentication authentication, @RequestParam String search) {
        try {
            return RestResponse.result(this.searchService.queryNotebooks(search));
        } catch (final Exception ex) {
            logger.error(ex.getMessage(), ex);
            return RestResponse.error(BasicErrorCode.UNKNOWN, "An unknown error has occurred");
        }
    }

    @RequestMapping(value = "/action/catalog/query", method = RequestMethod.POST)
    public RestResponse<?> query(Authentication authentication, @RequestBody CompositeCatalogQuery query) {
        try {
            final CompositeCatalogResult result = this.searchService.queryCatalog(query);
            return RestResponse.result(result);
        } catch (final Exception ex) {
            logger.error(ex.getMessage(), ex);
            return RestResponse.error(BasicErrorCode.UNKNOWN, "An unknown error has occurred");
        }
    }

    @RequestMapping(value = "/action/data/query", method = RequestMethod.POST)
    public RestResponse<?> getData(Authentication authentication, @RequestBody CkanCatalogQuery query) {
        try {
            return RestResponse.result(this.searchService.queryData(query));
        } catch (final Exception ex) {
            logger.error(ex.getMessage(), ex);
            return RestResponse.error(BasicErrorCode.UNKNOWN, "An unknown error has occurred");
        }
    }

    @RequestMapping(value = "/action/notebook/query", method = RequestMethod.POST)
    public RestResponse<?> getNotebooks(Authentication authentication, @RequestBody CkanCatalogQuery query) {
        try {
            return RestResponse.result(this.searchService.queryNotebooks(query));
        } catch (final Exception ex) {
            logger.error(ex.getMessage(), ex);
            return RestResponse.error(BasicErrorCode.UNKNOWN, "An unknown error has occurred");
        }
    }

}
