package gr.helix.core.web.repository;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import gr.helix.core.common.model.ApplicationException;
import gr.helix.core.web.model.EnumCatalog;
import gr.helix.core.web.model.user.Favorite;
import gr.helix.core.web.model.user.FavoriteCollection;

@Transactional
public interface IFavoriteRepository {

    /**
     * Returns all favorites registered for the given email
     *
     * @param email the email to search for
     * @return a list of {@link Favorite} objects
     */
    List<Favorite> getFavoritesByEmail(String email);

    /**
     * Adds a new URL to the favorites collection
     *
     * @param email a valid user email
     * @param catalog the type of the data catalog
     * @param handle the unique resource handle
     * @param url the resource URL
     * @param title a user friendly name for the resource
     * @param description a short description of the resource
     * @param clientId the client id of the application key used for submitting the request
     * @return an instance of {@link Favorite}
     *
     * @throws ApplicationException if a registration for the same handle already exists
     */
    Favorite addFavorite(
        String email, EnumCatalog catalog, String handle, String url, String title, String description, String clientId
    ) throws ApplicationException;

    /**
     * Adds a new URL to the favorites collection
     *
     * @param email a valid user email
     * @param catalog the type of the data catalog
     * @param handle the unique resource handle
     * @param url the resource URL
     * @param title a user friendly name for the resource
     * @param description a short description of the resource
     * @return an instance of {@link Favorite}
     *
     * @throws ApplicationException if a registration for the same handle already exists
     */
    default Favorite addFavorite(
        String email, EnumCatalog catalog, String handle, String url, String title, String description
    ) throws ApplicationException {
        return this.addFavorite(email, catalog, handle, url, title, description, null);
    }


    /**
     * Removes an existing URL from the favorites collection
     *
     * @param email a valid user email
     * @param catalog the type of the data catalog
     * @param handle the unique resource handle
     * @return a list of all updated collections
     *
     * @throws ApplicationException if a registration does not exist for the given handle
     */
    List<FavoriteCollection> removeFavorite(String email, EnumCatalog catalog, String handle) throws ApplicationException;

    /**
     * Returns all favorite collections registered for the given email
     *
     * @param email the email to search for
     * @return a list of {@link FavoriteCollection} objects
     */
    List<FavoriteCollection> getCollectionsByEmail(String email);

    /**
     * Creates a new favorite collection
     *
     * @param email the email of the collection's owner
     * @param title the name of the new collection
     * @return an instance of {@link FavoriteCollection}.
     *
     * @throws ApplicationException if a collection with the given name already exists
     */
    FavoriteCollection addCollection(String email, String title) throws ApplicationException;

    /**
     * Updates an existing favorite collection
     *
     * @param email the email of the collection's owner
     * @para id the unique collection id
     * @param title the new name of the collection
     * @return an instance of {@link FavoriteCollection}.
     *
     * @throws ApplicationException if a collection with the given name already exists
     */
    FavoriteCollection updateCollection(String email, int id, String title) throws ApplicationException;

    /**
     * Removes an existing collection
     *
     * @param email the email of the collection's owner
     * @param id the id of the collection to remove
     *
     * @throws ApplicationException if the collection with the given id does not exists or
     * the specified collection does not belong to the selected user
     */
    void removeCollection(String email, int id) throws ApplicationException;

    /**
     * Adds a favorite to a collection
     *
     * @param email the email of the collection's owner
     * @param collection the id of the collection
     * @param favorite the id of the favorite
     * @return the updated instance of {@link FavoriteCollection}.
     *
     * @throws ApplicationException if the collection/favorite with the given id does not exists or
     * the specified collection does not belong to the selected user
     */
    FavoriteCollection addFavoriteToCollection(String email, int collection, int favorite) throws ApplicationException;

    /**
     * Removes a favorite from a collection
     *
     * @param email the email of the collection's owner
     * @param collection the id of the collection
     * @param favorite the id of the favorite
     * @return the updated instance of {@link FavoriteCollection}.
     *
     * @throws ApplicationException if the collection/favorite with the given id does not exists or
     * the specified collection does not belong to the selected user
     */
    FavoriteCollection removeFavoriteFromCollection(String email, int collection, int favorite) throws ApplicationException;

}
