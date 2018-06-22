package gr.helix.core.web.controller.action;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.providers.ExpiringUsernameAuthenticationToken;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import gr.helix.core.common.model.BasicErrorCode;
import gr.helix.core.common.model.RestResponse;
import gr.helix.core.common.model.user.Account;
import gr.helix.core.common.service.UserService;
import gr.helix.core.web.controller.SsoController;
import gr.helix.core.web.model.security.User;

/**
 * Actions for querying and updating user data
 */
@RestController
@Secured({ "ROLE_USER", "ROLE_ADMIN" })
@RequestMapping(produces = "application/json")
public class ProfileController {

    private static final Logger logger = LoggerFactory.getLogger(SsoController.class);

    @Autowired
    UserService userService;

    /**
     * Get profile data for the authenticated user
     *
     * @param authentication the authenticated principal
     * @return user profile data
     */
    @RequestMapping(value = "/action/user/profile", method = RequestMethod.GET)
    public RestResponse<?> getProfile(Authentication authentication) {
        if (authentication instanceof ExpiringUsernameAuthenticationToken) {
            return RestResponse.result(((User) authentication.getDetails()).getAccount());
        }
        if (authentication instanceof UsernamePasswordAuthenticationToken) {
            final String username = authentication.getName();

            final Account account = this.userService.findOneByUsername(username);
            Assert.state(account != null, "Expected to find a user with authenticated username!");

            return RestResponse.result(account);
        }
        if (authentication instanceof OAuth2Authentication) {
            final OAuth2Authentication oauth2Authentication = (OAuth2Authentication) authentication;

            return RestResponse.result(((User) oauth2Authentication.getUserAuthentication().getDetails()).getAccount());
        }

        logger.warn("User not found " + authentication.getName() );
        return RestResponse.error(BasicErrorCode.USER_NOT_FOUND, "User not found");
    }

}
