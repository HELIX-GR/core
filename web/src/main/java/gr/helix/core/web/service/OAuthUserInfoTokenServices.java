package gr.helix.core.web.service;

import java.util.AbstractMap;
import java.util.Collection;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.common.exceptions.InvalidTokenException;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

import gr.helix.core.common.model.EnumRole;
import gr.helix.core.common.model.user.Account;
import gr.helix.core.web.model.security.User;

public class OAuthUserInfoTokenServices extends UserInfoTokenServices {

    private final UserDetailsService userService;

    public OAuthUserInfoTokenServices(String userInfoEndpointUrl, String clientId, UserDetailsService userService) {
        super(userInfoEndpointUrl, clientId);

        this.userService = userService;
    }

    @Override
    @SuppressWarnings("unchecked")
    public OAuth2Authentication loadAuthentication(String accessToken) throws AuthenticationException, InvalidTokenException {
        // Get default authentication
        final OAuth2Authentication authentication = super.loadAuthentication(accessToken);

        // Create custom user details
        final Account account = new Account(authentication.getPrincipal().toString());

        final AbstractMap<String, String> details = (AbstractMap<String, String>) authentication.getUserAuthentication().getDetails();

        details.keySet().stream().forEach(key -> {
            switch (key) {
                case "name":
                    account.setName(details.get(key));
                    break;
                case "email":
                    account.setEmail(details.get(key));
                    break;
                case "avatar_url":
                case "picture":
                    account.setImageUrl(details.get(key));
                    break;
                case "locale":
                    account.setLang(details.get(key));
                    break;
            }
        });

        // TODO: Override roles (by default ROLE_USER is set)

        // Authentication -> Account roles
        authentication.getAuthorities().stream()
            .map(r -> EnumRole.fromString(r.getAuthority()))
            .filter(r -> r != null)
            .forEach(r -> account.getRoles().add(r));

        // Account -> Authentication roles
        final Collection<? extends GrantedAuthority> authorities = account.getRoles().stream()
            .map(r -> new SimpleGrantedAuthority(r.toString()))
            .collect(Collectors.toList());

        // TODO: Get user from database
        try {
            this.userService.loadUserByUsername(authentication.getPrincipal().toString());
        }catch (final UsernameNotFoundException ex) {
            // TODO: Handle exception / Create user
        }

        // An email is required
        if (StringUtils.isBlank(account.getEmail())) {
            throw new UsernameNotFoundException("Username was not found. A valid email address is required.");
        }

        // Replace authentication
        final User user = new User(account, "");
        final UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user, "N/A", authorities);
        token.setDetails(user);

        return new OAuth2Authentication(authentication.getOAuth2Request(), token);
    }


}
