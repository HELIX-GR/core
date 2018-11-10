package gr.helix.core.web.model.user;

import gr.helix.core.web.model.EnumCatalog;

public class FavouriteRequest {

    public enum EnumAction {
        UNDEFINED,
        LIST,
        ADD,
        REMOVE,
    }

    private EnumAction  action;
    private EnumCatalog catalog;
    private String      description;
    private String      email;
    private String      handle;
    private String      title;
    private String      url;

    public EnumCatalog getCatalog() {
        return this.catalog;
    }

    public void setCatalog(EnumCatalog catalog) {
        this.catalog = catalog;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHandle() {
        return this.handle;
    }

    public void setHandle(String handle) {
        this.handle = handle;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public EnumAction getAction() {
        return (this.action != null ? this.action : EnumAction.UNDEFINED);
    }

    public void setAction(EnumAction action) {
        this.action = action;
    }

}
