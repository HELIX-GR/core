package gr.helix.core.web.controller.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gr.helix.core.common.model.BasicErrorCode;
import gr.helix.core.common.model.RestResponse;
import gr.helix.core.web.model.openaire.client.Publication;
import gr.helix.core.web.service.SearchService;

@RestController
@RequestMapping(produces = "application/json")
public class PublicationController {

    @Autowired
    private SearchService searchService;

    @GetMapping(value = "/action/publication/{id}")
    public RestResponse<?> getPublication(@PathVariable String id) {
        try {
            final Publication result = this.searchService.getPublication(id);
            return RestResponse.result(result);
        } catch (final Exception ex) {
            return RestResponse.error(BasicErrorCode.UNKNOWN, "An unknown error has occurred");
        }
    }

    @GetMapping(value = "/action/featured-publications")
    public RestResponse<?> getFeaturedPublications() {
        try {
            final List<Publication> result = this.searchService.getFeaturedPublications();
            return RestResponse.result(result);
        } catch (final Exception ex) {
            return RestResponse.error(BasicErrorCode.UNKNOWN, "An unknown error has occurred");
        }
    }

}
