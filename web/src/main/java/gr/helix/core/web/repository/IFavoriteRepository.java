package gr.helix.core.web.repository;

import java.util.List;

import gr.helix.core.common.model.ApplicationException;
import gr.helix.core.web.model.EnumCatalog;
import gr.helix.core.web.model.user.Favorite;

public interface IFavoriteRepository {

    /**
     * Returns all favorites registered for the given email
     *
     * @param email the email to search for
     * @return a list of {@link Favorite} objects
     */
    List<Favorite> getByEmail(String email);

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
     *
     * @throws ApplicationException if a registration for the same handle already exists
     */
    void add(
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
     *
     * @throws ApplicationException if a registration for the same handle already exists
     */
    default void add(
        String email, EnumCatalog catalog, String handle, String url, String title, String description
    ) throws ApplicationException {
        this.add(email, catalog, handle, url, title, description, null);
    }


    /**
     * Removes an existing URL from the favorites collection
     *
     * @param email a valid user email
     * @param catalog the type of the data catalog
     * @param handle the unique resource handle
     *
     * @throws ApplicationException if a registration does not exist for the given handle
     */
    void remove(String email, EnumCatalog catalog, String handle) throws ApplicationException;

}
