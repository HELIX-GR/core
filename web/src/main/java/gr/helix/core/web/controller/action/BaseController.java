package gr.helix.core.web.controller.action;

import org.springframework.beans.factory.annotation.Autowired;

import gr.helix.core.web.service.IAuthenticationFacade;

public abstract class BaseController {

    @Autowired
    private IAuthenticationFacade authenticationFacade;

    protected int currentUserId() {
        return this.authenticationFacade.getCurrentUserId();
    }

    protected String currentUserEmail() {
        return this.authenticationFacade.getCurrentUserEmail();
    }

}
