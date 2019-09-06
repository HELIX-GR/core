package gr.helix.core.web.repository;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import gr.helix.core.common.model.ApplicationException;
import gr.helix.core.web.domain.FavoriteCollectionEntity;
import gr.helix.core.web.domain.FavoriteCollectionItemEntity;
import gr.helix.core.web.domain.FavoriteEntity;
import gr.helix.core.web.model.EnumCatalog;
import gr.helix.core.web.model.user.Favorite;
import gr.helix.core.web.model.user.FavoriteCollection;
import gr.helix.core.web.model.user.FavoriteErrorCode;

@Repository
public class DefaultFavouriteRepository implements IFavoriteRepository {

    @PersistenceContext(unitName = "default")
    private EntityManager entityManager;

    @Override
    public List<Favorite> getFavoritesByEmail(String email) {
        final String qlString = "select f from Favorite f where f.email = :email order by f.createdOn desc";

        return this.entityManager.createQuery(qlString, FavoriteEntity.class)
            .setParameter("email", email)
            .getResultList()
            .stream()
            .map(f -> f.toDto())
            .collect(Collectors.toList());
    }

    @Override
    public Favorite addFavorite(
        String email, EnumCatalog catalog, String handle, String url, String title, String description, String clientId
    ) throws EntityExistsException {
        final Optional<FavoriteEntity> existing = this.findFavoriteByEmailAndHandle(email, handle);

        if (existing.isPresent()) {
            throw ApplicationException.fromMessage(FavoriteErrorCode.HANDLE_ALREADY_EXISTS, "A registration already exists");
        }

        final FavoriteEntity favorite = new FavoriteEntity();
        favorite.setEmail(email);
        favorite.setCatalog(catalog);
        favorite.setHandle(handle);
        favorite.setUrl(url);
        favorite.setTitle(title);
        favorite.setDescription(description);
        favorite.setClientId(clientId);

        this.entityManager.persist(favorite);
        this.entityManager.flush();

        return favorite.toDto();
    }

    @Override
    public List<FavoriteCollection> removeFavorite(String email, EnumCatalog catalog, String handle) throws ApplicationException {
        final Optional<FavoriteEntity> existing = this.findFavoriteByEmailAndHandle(email, handle);
        final List<FavoriteCollectionEntity> updatedCollections = new ArrayList<FavoriteCollectionEntity>();

        if (!existing.isPresent()) {
            throw ApplicationException.fromMessage(FavoriteErrorCode.HANDLE_NOT_FOUND, "Favorite was not found");
        }

        for (final FavoriteCollectionItemEntity item : existing.get().getItems()) {
            switch (existing.get().getCatalog()) {
                case CKAN:
                    item.getCollection().setDatasetCounter(item.getCollection().getDatasetCounter() - 1);
                    break;
                case LAB:
                    item.getCollection().setNotebookCounter(item.getCollection().getNotebookCounter() - 1);
                    break;
                case OPENAIRE:
                    item.getCollection().setPublicationCounter(item.getCollection().getPublicationCounter() - 1);
                    break;
                default:
                    // Do nothing
                    break;
            }
            updatedCollections.add(item.getCollection());
        }
        // Remove all items from collections and refresh collection counters
        existing.get().getItems().clear();
        this.entityManager.flush();

        this.entityManager.remove(existing.get());

        // Return the updated collections
        return updatedCollections.stream()
            .map(c->c.toDto())
            .collect(Collectors.toList());
    }

    @Override
    public List<FavoriteCollection> getCollectionsByEmail(String email) {
        final String qlString = "select c from FavoriteCollection c where c.email = :email";

        return this.entityManager.createQuery(qlString, FavoriteCollectionEntity.class)
            .setParameter("email", email)
            .getResultList()
            .stream()
            .map(c -> c.toDto())
            .collect(Collectors.toList());
    }

    @Override
    public FavoriteCollection addCollection(String email, String title) throws ApplicationException {
        final Optional<FavoriteCollectionEntity> existing = this.findCollectionByEmailAndTitle(email, title);

        if (existing.isPresent()) {
            throw ApplicationException.fromMessage(FavoriteErrorCode.COLLECTION_ALREADY_EXISTS, "A collection already exists");
        }

        final FavoriteCollectionEntity collection = new FavoriteCollectionEntity();
        collection.setEmail(email);
        collection.setTitle(title);

        this.entityManager.persist(collection);
        this.entityManager.flush();

        return collection.toDto();
    }

    @Override
    public FavoriteCollection updateCollection(String email, int id, String title) throws ApplicationException {
        final Optional<FavoriteCollectionEntity> existing = this.findCollectionByEmailAndId(email, id);

        if (!existing.isPresent()) {
            throw ApplicationException.fromMessage(FavoriteErrorCode.COLLECTION_NOT_FOUND, "Collection was not found");
        }

        existing.get().setTitle(title);
        existing.get().setUpdatedOn(ZonedDateTime.now());

        this.entityManager.flush();

        return existing.get().toDto();
    }

    @Override
    public void removeCollection(String email, int id) throws ApplicationException {
        final Optional<FavoriteCollectionEntity> existing = this.findCollectionByEmailAndId(email, id);

        if (!existing.isPresent()) {
            throw ApplicationException.fromMessage(FavoriteErrorCode.COLLECTION_NOT_FOUND, "Collection was not found");
        }

        this.entityManager.remove(existing.get());
    }

    @Override
    public FavoriteCollection addFavoriteToCollection(String email, int collection, int favorite) throws ApplicationException {
        final Optional<FavoriteCollectionEntity> collectionEntity = this.findCollectionByEmailAndId(email, collection);
        final Optional<FavoriteEntity> favoriteEntity = this.findFavoriteByEmailAndId(email, favorite);

        if (!collectionEntity.isPresent()) {
            throw ApplicationException.fromMessage(FavoriteErrorCode.COLLECTION_NOT_FOUND, "Collection was not found");
        }
        if (!favoriteEntity.isPresent()) {
            throw ApplicationException.fromMessage(FavoriteErrorCode.HANDLE_NOT_FOUND, "Favorite was not found");
        }

        final FavoriteCollectionItemEntity item = new FavoriteCollectionItemEntity();
        item.setCollection(collectionEntity.get());
        item.setFavorite(favoriteEntity.get());

        switch (favoriteEntity.get().getCatalog()) {
            case CKAN:
                collectionEntity.get().setDatasetCounter(collectionEntity.get().getDatasetCounter() + 1);
                break;
            case LAB:
                collectionEntity.get().setNotebookCounter(collectionEntity.get().getNotebookCounter() + 1);
                break;
            case OPENAIRE:
                collectionEntity.get().setPublicationCounter(collectionEntity.get().getPublicationCounter() + 1);
                break;
            default:
                // Do nothing
                break;
        }
        collectionEntity.get().setUpdatedOn(ZonedDateTime.now());
        collectionEntity.get().getItems().add(item);

        this.entityManager.persist(item);
        this.entityManager.flush();

        return collectionEntity.get().toDto();
    }

    @Override
    public FavoriteCollection removeFavoriteFromCollection(String email, int collection, int favorite) throws ApplicationException {
        final String qlString = "select i from FavoriteCollectionItem i where i.collection.id = :collectionId and i.favorite.id = :favoriteId";

        final Optional<FavoriteCollectionItemEntity> entity = this.entityManager.createQuery(qlString, FavoriteCollectionItemEntity.class)
            .setParameter("collectionId", collection)
            .setParameter("favoriteId", favorite)
            .setMaxResults(1)
            .getResultList()
            .stream()
            .findFirst();

        if (!entity.isPresent()) {
            throw ApplicationException.fromMessage(FavoriteErrorCode.ITEM_NOT_FOUND, "Favorite does not belong to the collection");
        }

        final FavoriteEntity favoriteEntity = entity.get().getFavorite();
        final FavoriteCollectionEntity collectionEntity = entity.get().getCollection();

        switch (favoriteEntity.getCatalog()) {
            case CKAN:
                collectionEntity.setDatasetCounter(collectionEntity.getDatasetCounter() - 1);
                break;
            case LAB:
                collectionEntity.setNotebookCounter(collectionEntity.getNotebookCounter() - 1);
                break;
            case OPENAIRE:
                collectionEntity.setPublicationCounter(collectionEntity.getPublicationCounter() - 1);
                break;
            default:
                // Do nothing
                break;
        }
        collectionEntity.setUpdatedOn(ZonedDateTime.now());
        collectionEntity.getItems().remove(entity.get());

        this.entityManager.remove(entity.get());
        this.entityManager.flush();

        return collectionEntity.toDto();
    }

    private Optional<FavoriteEntity> findFavoriteByEmailAndHandle(String email, String handle) {
        final String qlString = "select f from Favorite f where f.email = :email and f.handle = :handle";

        return this.entityManager.createQuery(qlString, FavoriteEntity.class)
            .setParameter("email", email)
            .setParameter("handle", handle)
            .setMaxResults(1)
            .getResultList()
            .stream()
            .findFirst();
    }

    private Optional<FavoriteEntity> findFavoriteByEmailAndId(String email, int id) {
        final String qlString = "select f from Favorite f where f.email = :email and f.id = :id";

        return this.entityManager.createQuery(qlString, FavoriteEntity.class)
            .setParameter("email", email)
            .setParameter("id", id)
            .setMaxResults(1)
            .getResultList()
            .stream()
            .findFirst();
    }

    private Optional<FavoriteCollectionEntity> findCollectionByEmailAndTitle(String email, String title) {
        final String qlString = "select c from FavoriteCollection c where c.email = :email and c.title = :title";

        return this.entityManager.createQuery(qlString, FavoriteCollectionEntity.class)
            .setParameter("email", email)
            .setParameter("title", title)
            .setMaxResults(1)
            .getResultList()
            .stream()
            .findFirst();
    }

    private Optional<FavoriteCollectionEntity> findCollectionByEmailAndId(String email, int id) {
        final String qlString = "select c from FavoriteCollection c where c.email = :email and c.id = :id";

        return this.entityManager.createQuery(qlString, FavoriteCollectionEntity.class)
            .setParameter("email", email)
            .setParameter("id", id)
            .setMaxResults(1)
            .getResultList()
            .stream()
            .findFirst();
    }

}
