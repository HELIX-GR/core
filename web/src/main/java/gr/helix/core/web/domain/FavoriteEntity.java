package gr.helix.core.web.domain;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import gr.helix.core.web.model.EnumCatalog;
import gr.helix.core.web.model.user.Favorite;

@Entity(name = "Favorite")
@Table(
    schema = "web", name = "`favorite`",
    uniqueConstraints = {
        @UniqueConstraint(name = "uq_favorite_handle", columnNames = {"`email`", "`catalog`", "`handle`"}),
    })
public class FavoriteEntity {

    @Id
    @Column(name = "`id`", updatable = false)
    @SequenceGenerator(schema = "web", sequenceName = "favorite_id_seq", name = "favorite_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "favorite_id_seq", strategy = GenerationType.SEQUENCE)
    Integer             id;

    @Column(name = "client_id", nullable = true)
    private String      clientId;

    @NotNull
    @Email
    @Column(name = "`email`", nullable = false)
    String              email;

    @NotNull
    @Column(name = "catalog", nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumCatalog catalog;

    @NotNull
    @Column(name = "`handle`")
    String              handle;

    @Column(name = "`url`")
    String              url;

    @NotNull
    @Column(name = "`created_on`")
    ZonedDateTime       createdOn = ZonedDateTime.now(ZoneId.systemDefault());

    @NotNull
    @Column(name = "`title`")
    String              title;

    @Column(name = "`description`")
    String              description;

    @OneToMany(
        targetEntity = FavoriteCollectionItemEntity.class,
        mappedBy = "favorite",
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    List<FavoriteCollectionItemEntity> items     = new ArrayList<>();

    public String getClientId() {
        return this.clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public EnumCatalog getCatalog() {
        return this.catalog;
    }

    public void setCatalog(EnumCatalog catalog) {
        this.catalog = catalog;
    }

    public String getHandle() {
        return this.handle;
    }

    public void setHandle(String handle) {
        this.handle = handle;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getId() {
        return this.id;
    }

    public ZonedDateTime getCreatedOn() {
        return this.createdOn;
    }

    public List<FavoriteCollectionItemEntity> getItems() {
        return this.items;
    }

    /**
     * Convert to a DTO object
     *
     * @return a new {@link Favorite} instance
     */
    public Favorite toDto() {
        return new Favorite(
            this.id,
            this.clientId,
            this.catalog,
            this.handle,
            this.url,
            this.createdOn,
            this.title,
            this.description
        );
    }

}
