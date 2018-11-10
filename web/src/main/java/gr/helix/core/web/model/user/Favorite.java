package gr.helix.core.web.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;

import gr.helix.core.web.model.EnumCatalog;

public class Favorite {

    private final int         id;
    private final String      clientId;
    private final EnumCatalog catalog;
    private final String      handle;
    private final String      url;
    private final String      title;
    private final String      description;

    public Favorite(
        int id, String clientId, EnumCatalog catalog, String handle, String url, String title, String description
    ) {
        this.id = id;
        this.clientId = clientId;
        this.catalog = catalog;
        this.handle = handle;
        this.url = url;
        this.title = title;
        this.description = description;
    }

    public int getId() {
        return this.id;
    }

    @JsonIgnore()
    public String getClientId() {
        return this.clientId;
    }

    public EnumCatalog getCatalog() {
        return this.catalog;
    }

    public String getHandle() {
        return this.handle;
    }

    public String getUrl() {
        return this.url;
    }

    public String getTitle() {
        return this.title;
    }

    public String getDescription() {
        return this.description;
    }

}
