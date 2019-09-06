package gr.helix.core.web.service;

import java.util.List;

import gr.helix.core.common.model.Error;
import gr.helix.core.web.model.user.FavoriteCollectionRequest;
import gr.helix.core.web.model.user.FavouriteRequest;

public interface IFavoriteValidationService {

    /**
     * Validates a favorite request
     *
     * @param request the request to validate
     * @return a list of {@Link Error} objects if one or more errors are found;
     * Otherwise an empty collection is returned
     */
    List<Error> validate(FavouriteRequest request);

    /**
     * Validates a collection request
     *
     * @param request the request to validate
     * @return a list of {@Link Error} objects if one or more errors are found;
     * Otherwise an empty collection is returned
     */
    List<Error> validate(FavoriteCollectionRequest request);

}
