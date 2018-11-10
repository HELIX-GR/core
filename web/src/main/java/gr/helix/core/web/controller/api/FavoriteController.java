package gr.helix.core.web.controller.api;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gr.helix.core.common.model.ApplicationException;
import gr.helix.core.common.model.ApplicationKey;
import gr.helix.core.common.model.BasicErrorCode;
import gr.helix.core.common.model.Error;
import gr.helix.core.common.model.RestResponse;
import gr.helix.core.common.repository.IApplicationKeyRepository;
import gr.helix.core.web.model.user.Favorite;
import gr.helix.core.web.model.user.FavouriteRequest;
import gr.helix.core.web.repository.IFavoriteRepository;
import gr.helix.core.web.service.IFavoriteValidationService;

@RestController("apiFavouriteController")
@RequestMapping(produces = "application/json")
@CrossOrigin
public class FavoriteController {

    private static final Logger        logger                = LoggerFactory.getLogger(FavoriteController.class);

    private static final String        AUTHENTICATION_HEADER = "X-API-Key";

    @Autowired
    private IApplicationKeyRepository  applicationKeyRepository;

    @Autowired
    private IFavoriteRepository        favoriteRepository;

    @Autowired
    private IFavoriteValidationService favoriteValidationService;

    @PostMapping(value = "/api/v1/favorite")
    public RestResponse<?> query(
        @RequestHeader(required = false, value = AUTHENTICATION_HEADER) String applicationKey,
        @RequestBody FavouriteRequest request
    ) {
        final Optional<ApplicationKey> key = this.applicationKeyRepository.findByKey(applicationKey);

        if ((!key.isPresent()) || (key.get().getRevoked())) {
            return RestResponse.error(
                BasicErrorCode.AUTHENTICATION_INVALID_KEY,
                "Application key is invalid or missing. Header X-API-Key must be set to a valid application key value"
            );
        }

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
                        request.getDescription(),
                        key.get().getClientId()
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
        } catch (final ApplicationException ex) {
            return RestResponse.error(ex.getErrorCode(), ex.getMessage());
        } catch (final Exception ex) {
            logger.error(ex.getMessage(), ex);
            return RestResponse.error(BasicErrorCode.UNKNOWN, "An unknown exception has occurred.");
        }

        return RestResponse.success();
    }

}
