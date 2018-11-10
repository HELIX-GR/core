package gr.helix.core.web.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import gr.helix.core.common.model.Error;
import gr.helix.core.web.model.user.FavoriteErrorCode;
import gr.helix.core.web.model.user.FavouriteRequest;

@Service
public class FavoriteValidationService implements IFavoriteValidationService {

    @Override
    public List<Error> validate(FavouriteRequest request) {
        final List<Error> errors = new ArrayList<Error>();

        if (StringUtils.isBlank(request.getEmail())) {
            errors.add(new Error(FavoriteErrorCode.EMAIL_MISSING, "Email is required"));
        }

        switch (request.getAction()) {
            case ADD:
                if (request.getCatalog() == null) {
                    errors.add(new Error(FavoriteErrorCode.CATALOG_MISSING, "Catalog is required"));
                }
                if (StringUtils.isBlank(request.getTitle())) {
                    errors.add(new Error(FavoriteErrorCode.TITLE_MISSING, "Title is required"));
                }
                if (StringUtils.isBlank(request.getHandle())) {
                    errors.add(new Error(FavoriteErrorCode.HANDLE_MISSING, "Handle is required"));
                }
                if (StringUtils.isBlank(request.getUrl())) {
                    errors.add(new Error(FavoriteErrorCode.URL_MISSING, "Url is required"));
                }
                break;
            case REMOVE:
                if (request.getCatalog() == null) {
                    errors.add(new Error(FavoriteErrorCode.CATALOG_MISSING, "Catalog is required"));
                }
                if (StringUtils.isBlank(request.getHandle())) {
                    errors.add(new Error(FavoriteErrorCode.HANDLE_MISSING, "Handle is required"));
                }
                break;
            case LIST:
                break;
            default:
                errors.add(new Error(FavoriteErrorCode.ACTION_NOT_SUPPORTED, "Action is not supported or missing"));
                break;
        }

        return errors;
    }

}
