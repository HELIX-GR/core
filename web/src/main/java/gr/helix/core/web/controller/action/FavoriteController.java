package gr.helix.core.web.controller.action;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import gr.helix.core.common.model.BasicErrorCode;
import gr.helix.core.common.model.Error;
import gr.helix.core.common.model.RestResponse;
import gr.helix.core.web.model.user.Favorite;
import gr.helix.core.web.model.user.FavouriteRequest;
import gr.helix.core.web.repository.IFavoriteRepository;
import gr.helix.core.web.service.IFavoriteValidationService;

@RestController("actionFavouriteController")
@RequestMapping(produces = "application/json")
@Secured({ "ROLE_USER" })
public class FavoriteController extends BaseController {

    private static final Logger        logger = LoggerFactory.getLogger(FavoriteController.class);

    @Autowired
    private IFavoriteRepository        favoriteRepository;

    @Autowired
    private IFavoriteValidationService favoriteValidationService;

    @RequestMapping(value = "/action/favorite", method = RequestMethod.POST)
    public RestResponse<?> query(@RequestBody FavouriteRequest request) {

        final List<Error> errors = this.favoriteValidationService.validate(request);
        if (!errors.isEmpty()) {
            return RestResponse.error(errors);
        }

        try {
            switch (request.getAction()) {
                case ADD:
                    this.favoriteRepository.add(
                        this.currentUserEmail(),
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
                case LIST:
                    final List<Favorite> favorites = this.favoriteRepository.getByEmail(request.getEmail());
                    return RestResponse.result(favorites);
                default:
                    // No action
                    break;
            }
        } catch (final Exception ex) {
            logger.error(ex.getMessage(), ex);
            return RestResponse.error(BasicErrorCode.UNKNOWN, ex.getMessage());
        }

        return RestResponse.success();
    }

}
