package gr.helix.core.web.model.user;

import gr.helix.core.common.model.ErrorCode;

public enum FavoriteErrorCode implements ErrorCode
{
    ACTION_NOT_SUPPORTED,
    EMAIL_MISSING,
    CATALOG_MISSING,
    TITLE_MISSING,
    HANDLE_MISSING,
    URL_MISSING,
    HANDLE_ALREADY_EXISTS,
    HANDLE_NOT_FOUND,
    ;

    @Override
    public String key() {
        return (this.getClass().getSimpleName() + '.' + this.name());
    }

}
