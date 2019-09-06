package gr.helix.core.web.domain;

import java.time.ZoneId;
import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity(name = "FavoriteCollectionItem")
@Table(
    schema = "web", name = "`favorite_collection_item`"
)
public class FavoriteCollectionItemEntity {

    @Id
    @Column(name = "`id`", updatable = false)
    @SequenceGenerator(
        schema = "web",
        sequenceName = "favorite_collection_item_id_seq",
        name = "favorite_collection_item_id_seq",
        allocationSize = 1
    )
    @GeneratedValue(generator = "favorite_collection_item_id_seq", strategy = GenerationType.SEQUENCE)
    Integer                  id;

    @NotNull
    @Column(name = "`created_on`", updatable = false)
    ZonedDateTime            createdOn = ZonedDateTime.now(ZoneId.systemDefault());

    @NotNull
    @ManyToOne(targetEntity = FavoriteCollectionEntity.class)
    @JoinColumn(name = "collection", updatable = false)
    FavoriteCollectionEntity collection;

    @NotNull
    @ManyToOne(targetEntity = FavoriteEntity.class)
    @JoinColumn(name = "favorite", updatable = false)
    FavoriteEntity favorite;

    public FavoriteCollectionEntity getCollection() {
        return this.collection;
    }

    public void setCollection(FavoriteCollectionEntity collection) {
        this.collection = collection;
    }

    public FavoriteEntity getFavorite() {
        return this.favorite;
    }

    public void setFavorite(FavoriteEntity favorite) {
        this.favorite = favorite;
    }

    public Integer getId() {
        return this.id;
    }

    public ZonedDateTime getCreatedOn() {
        return this.createdOn;
    }

}
