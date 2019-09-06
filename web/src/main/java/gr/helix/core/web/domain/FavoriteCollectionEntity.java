package gr.helix.core.web.domain;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
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

import gr.helix.core.web.model.user.FavoriteCollection;

@Entity(name = "FavoriteCollection")
@Table(
    schema = "web", name = "`favorite_collection`",
    uniqueConstraints = {
        @UniqueConstraint(name = "uq_favorite_collection_email_title", columnNames = {"`email`", "`title`"}),
    }
)
public class FavoriteCollectionEntity {

    @Id
    @Column(name = "`id`", updatable = false)
    @SequenceGenerator(
        schema = "web",
        sequenceName = "favorite_collection_id_seq",
        name = "favorite_collection_id_seq",
        allocationSize = 1
    )
    @GeneratedValue(generator = "favorite_collection_id_seq", strategy = GenerationType.SEQUENCE)
    int                                id;

    @NotNull
    @Email
    @Column(name = "`email`", nullable = false)
    String                             email;

    @NotNull
    @Column(name = "`created_on`")
    ZonedDateTime                      createdOn = ZonedDateTime.now(ZoneId.systemDefault());

    @NotNull
    @Column(name = "`updated_on`")
    ZonedDateTime                      updatedOn = ZonedDateTime.now(ZoneId.systemDefault());

    @NotNull
    @Column(name = "`title`")
    String                             title;

    @NotNull
    @Column(name = "`data_count`")
    int                                datasetCounter;

    @NotNull
    @Column(name = "`pubs_count`")
    int                                publicationCounter;

    @NotNull
    @Column(name = "`lab_count`")
    int                                notebookCounter;

    @OneToMany(
        targetEntity = FavoriteCollectionItemEntity.class,
        mappedBy = "collection",
        fetch = FetchType.EAGER,
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    List<FavoriteCollectionItemEntity> items     = new ArrayList<>();

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getId() {
        return this.id;
    }

    public ZonedDateTime getCreatedOn() {
        return this.createdOn;
    }

    public ZonedDateTime getUpdatedOn() {
        return this.updatedOn;
    }

    public void setUpdatedOn(ZonedDateTime updatedOn) {
        this.updatedOn = updatedOn;
    }

    public int getDatasetCounter() {
        return this.datasetCounter;
    }

    public void setDatasetCounter(int datasetCounter) {
        this.datasetCounter = datasetCounter;
    }

    public int getPublicationCounter() {
        return this.publicationCounter;
    }

    public void setPublicationCounter(int publicationCounter) {
        this.publicationCounter = publicationCounter;
    }

    public int getNotebookCounter() {
        return this.notebookCounter;
    }

    public void setNotebookCounter(int notebookCounter) {
        this.notebookCounter = notebookCounter;
    }

    public List<FavoriteCollectionItemEntity> getItems() {
        return this.items;
    }

    /**
     * Convert to a DTO object
     *
     * @return a new {@link FavoriteCollection} instance
     */
    public FavoriteCollection toDto() {
        final Integer[] items = this.items.stream().map(i -> i.getFavorite().getId()).toArray(Integer[]::new);

        final FavoriteCollection result = new FavoriteCollection(
            this.id,
            this.title,
            this.createdOn,
            this.updatedOn
        );

        result.setItems(items);
        result.setDatasetCounter(this.datasetCounter);
        result.setPublicationCounter(this.publicationCounter);
        result.setNotebookCounter(this.notebookCounter);

        return result;
    }

}
