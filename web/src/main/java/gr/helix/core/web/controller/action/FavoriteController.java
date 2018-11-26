package gr.helix.core.web.controller.action;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gr.helix.core.common.model.ApplicationException;
import gr.helix.core.common.model.BasicErrorCode;
import gr.helix.core.common.model.Error;
import gr.helix.core.common.model.RestResponse;
import gr.helix.core.web.model.user.FavouriteRequest;
import gr.helix.core.web.repository.IFavoriteRepository;
import gr.helix.core.web.service.IFavoriteValidationService;

@RestController("actionFavouriteController")
@RequestMapping(produces = "application/json")
@Secured({ "ROLE_USER", "ROLE_ADMIN" })
public class FavoriteController extends BaseController {

    private static final Logger        logger = LoggerFactory.getLogger(FavoriteController.class);

    @Autowired
    private IFavoriteRepository        favoriteRepository;

    @Autowired
    private IFavoriteValidationService favoriteValidationService;

    @PostMapping(value = "/action/favorite")
    public RestResponse<?> action(@RequestBody FavouriteRequest request) {
        // Set mail for the authenticated user
        request.setEmail(this.currentUserEmail());

        final List<Error> errors = this.favoriteValidationService.validate(request);
        if (!errors.isEmpty()) {
            return RestResponse.error(errors);
        }

        try {
            switch (request.getAction()) {
                case ADD:
                    this.favoriteRepository.add(
                        request.getEmail(),
                        request.getCatalog(),
                        request.getHandle(),
                        request.getUrl(),
                        request.getTitle(),
                        request.getDescription()
                    );
                    break;
                case REMOVE:
                    this.favoriteRepository.remove(request.getEmail(), request.getCatalog(), request.getHandle());
                    break;
                default:
                    // No action
                    break;
            }
        } catch (final ApplicationException ex) {
            return RestResponse.error(ex.getErrorCode(), ex.getMessage());
        } catch (final Exception ex) {
            logger.error(ex.getMessage(), ex);
            return RestResponse.error(BasicErrorCode.UNKNOWN, "An unknown exception has occurred.");
        }

        return RestResponse.success();
    }

}
