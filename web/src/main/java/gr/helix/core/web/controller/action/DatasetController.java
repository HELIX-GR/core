package gr.helix.core.web.controller.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import gr.helix.core.common.model.BasicErrorCode;
import gr.helix.core.common.model.RestResponse;
import gr.helix.core.web.model.ckan.Package;
import gr.helix.core.web.service.SearchService;

@RestController
@RequestMapping(produces = "application/json")
public class DatasetController {

    @Autowired
    private SearchService searchService;

    @RequestMapping(value = "/action/dataset/{id}", method = RequestMethod.GET)
    public RestResponse<?> getDataset(Authentication authentication, @PathVariable String id) {
        try {
            final  Package result = this.searchService.getDataset(id);
            return RestResponse.result(result);
        } catch (final Exception ex) {
            return RestResponse.error(BasicErrorCode.UNKNOWN, "An unknown error has occurred");
        }
    }

}

