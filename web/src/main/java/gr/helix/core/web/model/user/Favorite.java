package gr.helix.core.web.model.user;

import java.time.ZonedDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import gr.helix.core.web.model.EnumCatalog;

public class Favorite {

    private final int           id;
    private final String        clientId;
    private final EnumCatalog   catalog;
    private final String        handle;
    private final String        url;
    private final ZonedDateTime createdOn;
    private final String        title;
    private final String        description;

    public Favorite(
        int id, String clientId, EnumCatalog catalog, String handle, String url, ZonedDateTime createdOn, String title, String description
    ) {
        this.id = id;
        this.clientId = clientId;
        this.catalog = catalog;
        this.handle = handle;
        this.url = url;
        this.createdOn = createdOn;
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

    public ZonedDateTime getCreatedOn() {
        return this.createdOn;
    }

    public String getTitle() {
        return this.title;
    }

    public String getDescription() {
        return this.description;
    }

}
