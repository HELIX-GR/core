package gr.helix.core.web.config;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.DelegatingAuthenticationEntryPoint;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.switchuser.SwitchUserFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.filter.CompositeFilter;

import gr.helix.core.common.config.OAuthUserInfoDetailResolver;
import gr.helix.core.common.repository.AccountRepository;
import gr.helix.core.common.service.CustomUserDetailsService;
import gr.helix.core.common.service.OAuthUserInfoTokenServices;
import gr.helix.core.web.logging.filter.MappedDiagnosticContextFilter;

@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true)
@EnableOAuth2Client
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private static final String                API_REG_EX    = "/api/v\\d+/.*";

    private static final String                ACTION_REG_EX = "/action/.*";

    private final RegexRequestMatcher          apiMatcher    = new RegexRequestMatcher(API_REG_EX, null);

    private final Pattern                      csrfMethods   = Pattern.compile("^(POST|PUT|DELETE)$");

    @Autowired
    AccountRepository                          accountRepository;

    @Autowired
    OAuthUserInfoDetailResolver                userInfoDetailResolver;

    @Bean
    public SimpleUrlAuthenticationFailureHandler authenticationFailureHandler() {
        final SimpleUrlAuthenticationFailureHandler failureHandler = new SimpleUrlAuthenticationFailureHandler();
        failureHandler.setUseForward(true);
        failureHandler.setDefaultFailureUrl("/login");
        return failureHandler;
    }

    /**
     * Returns the authentication manager currently used by Spring. It represents a
     * bean definition with the aim allow wiring from other classes performing the
     * Inversion of Control (IoC).
     *
     * @throws Exception
     */
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    public SimpleUrlAuthenticationFailureHandler oauth2FailureHandler() {
        final SimpleUrlAuthenticationFailureHandler handler = new SimpleUrlAuthenticationFailureHandler();
        handler.setDefaultFailureUrl("/error/401");
        return handler;
    }

    @Autowired
    @Qualifier("defaultUserDetailsService")
    CustomUserDetailsService userService;

    @Autowired
    OAuth2ClientContext oauth2ClientContext;

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        final LinkedHashMap<RequestMatcher, AuthenticationEntryPoint> map = new LinkedHashMap<RequestMatcher, AuthenticationEntryPoint>();

        map.put(new RegexRequestMatcher(API_REG_EX, null), new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
        map.put(new RegexRequestMatcher(ACTION_REG_EX, null), new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));

        final DelegatingAuthenticationEntryPoint entryPoint = new DelegatingAuthenticationEntryPoint(map);
        entryPoint.setDefaultEntryPoint(new LoginUrlAuthenticationEntryPoint("/"));

        return entryPoint;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            // Public
            .antMatchers(
                "/",
                // Site parts
                "/about/**",
                "/contact",
                "/datasets/**",
                "/error/**",
                "/main/**",
                "/news/**",
                "/notebooks/**",
                "/pages/**",
                "/the-action/**",
                "/network/**",
                "/applications/**",
                "/news-events/**",
                "/terms-of-use",
                // Assets
                "/css/**",
                "/docs/**",
                "/fonts/**",
                "/i18n/**",
                "/images/**",
                "/js/**",
                "/vendor/**",
                // Authentication endpoints
                "/login**",
                "/logged-out",
                // Error pages
                "/error**",
                // Public action API endpoints
                "/action/catalog/**",
                "/action/ckan/**",
                "/action/configuration/**",
                "/action/dataset/**",
                "/action/notebook/**"
             ).permitAll()
            // Public API endpoints
            .regexMatchers(API_REG_EX).permitAll()
            // Private API endpoints
            .antMatchers(
                "/logged-in",
                "/logout",
                "/action/**"
            ).authenticated()
            .anyRequest().authenticated();

        http.csrf().requireCsrfProtectionMatcher((HttpServletRequest req) -> {
            // Disable for API
            if (this.apiMatcher.matches(req)) {
                return false;
            }
            // Include all state-changing methods
            if (this.csrfMethods.matcher(req.getMethod()).matches()) {
                return true;
            }

            return false;
        });

        http.exceptionHandling().authenticationEntryPoint(this.authenticationEntryPoint());

        http.formLogin()
            .loginPage("/login")
            .failureUrl("/error/401")
            .defaultSuccessUrl("/logged-in", true)
            .usernameParameter("username")
            .passwordParameter("password");

        http.logout()
            .logoutUrl("/logout")
            .logoutSuccessUrl("/logged-out")
            .invalidateHttpSession(true)
            .clearAuthentication(true)
            .permitAll();

        http.addFilterBefore(this.oauth2Filter(), BasicAuthenticationFilter.class);
        http.addFilterAfter(new MappedDiagnosticContextFilter(), SwitchUserFilter.class);
    }

    private Filter oauth2Filter() {
        final CompositeFilter filter = new CompositeFilter();
        final List<Filter> filters = new ArrayList<>();

        filters.add(this.oauth2Filter(this.google(), "/login/google"));
        filters.add(this.oauth2Filter(this.github(), "/login/github"));
        filters.add(this.oauth2Filter(this.helix(), "/login/helix"));
        filter.setFilters(filters);

        return filter;
    }

    private Filter oauth2Filter(ClientResources client, String path) {
        final OAuth2ClientAuthenticationProcessingFilter filter = new OAuth2ClientAuthenticationProcessingFilter(path);

        final OAuth2RestTemplate template = new OAuth2RestTemplate(client.getClient(), this.oauth2ClientContext);

        final OAuthUserInfoTokenServices tokenServices = new OAuthUserInfoTokenServices(
            client.getResource().getUserInfoUri(),
            client.getClient().getClientId(),
            this.userService,
            this.userInfoDetailResolver,
            this.accountRepository);

        tokenServices.setRestTemplate(template);

        filter.setRestTemplate(template);
        filter.setTokenServices(tokenServices);

        filter.setAuthenticationFailureHandler(this.oauth2FailureHandler());

        return filter;
    }

    @Bean
    @ConfigurationProperties("github")
    public ClientResources github() {
        return new ClientResources();
    }

    @Bean
    @ConfigurationProperties("google")
    public ClientResources google() {
        return new ClientResources();
    }

    @Bean
    @ConfigurationProperties("helix")
    public ClientResources helix() {
        return new ClientResources();
    }

    @Bean
    public FilterRegistrationBean<OAuth2ClientContextFilter> oauth2ClientFilterRegistration(OAuth2ClientContextFilter filter) {
        final FilterRegistrationBean<OAuth2ClientContextFilter> registration = new FilterRegistrationBean<OAuth2ClientContextFilter>();
        registration.setFilter(filter);
        registration.setOrder(-100);
        return registration;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder builder) throws Exception {
        builder.userDetailsService(this.userService).passwordEncoder(new BCryptPasswordEncoder());
        builder.eraseCredentials(true);
    }

}
