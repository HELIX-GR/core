package gr.helix.core.web.controller.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import gr.helix.core.common.model.RestResponse;
import gr.helix.core.common.model.user.Account;
import gr.helix.core.web.model.user.Favorite;
import gr.helix.core.web.model.user.Profile;
import gr.helix.core.web.repository.IFavoriteRepository;
import gr.helix.core.web.service.AuthenticationFacade;

/**
 * Actions for querying and updating user data
 */
@RestController
@Secured({ "ROLE_USER", "ROLE_ADMIN" })
@RequestMapping(produces = "application/json")
public class ProfileController {

    @Autowired
    private AuthenticationFacade authenticationFacade;

    @Autowired
    private IFavoriteRepository  favoriteRepository;

    /**
     * Get profile data for the authenticated user
     *
     * @return user profile data
     */
    @RequestMapping(value = "/action/user/profile", method = RequestMethod.GET)
    public RestResponse<?> getProfile() {
        final Account account = this.authenticationFacade.getCurrentUser().getAccount();
        final List<Favorite> favorites = this.favoriteRepository.getByEmail(account.getEmail());

        final Profile profile = new Profile();
        profile.setAccount(account);
        profile.setFavorites(favorites);

        return RestResponse.result(profile);
    }

}
