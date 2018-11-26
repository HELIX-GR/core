package gr.helix.core.web.repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import gr.helix.core.common.model.ApplicationException;
import gr.helix.core.web.domain.FavoriteEntity;
import gr.helix.core.web.model.EnumCatalog;
import gr.helix.core.web.model.user.Favorite;
import gr.helix.core.web.model.user.FavoriteErrorCode;

@Repository
public class DefaultFavouriteRepository implements IFavoriteRepository {

    @PersistenceContext(unitName = "default")
    private EntityManager entityManager;

    @Override
    public List<Favorite> getByEmail(String email) {
        final String qlString = "select f from Favorite f where f.email = :email";

        return this.entityManager.createQuery(qlString, FavoriteEntity.class)
            .setParameter("email", email)
            .getResultList()
            .stream()
            .map(f -> f.toDto())
            .collect(Collectors.toList());
    }

    @Override
    public void add(
        String email, EnumCatalog catalog, String handle, String url, String title, String description, String clientId
    ) throws EntityExistsException {
        final Optional<FavoriteEntity> existing = this.findByEmailAndHandle(email, handle);

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
    }

    @Override
    public void remove(String email, EnumCatalog catalog, String handle) throws ApplicationException {
        final Optional<FavoriteEntity> existing = this.findByEmailAndHandle(email, handle);

        if (!existing.isPresent()) {
            throw ApplicationException.fromMessage(FavoriteErrorCode.HANDLE_NOT_FOUND, "Favorite was not found");
        }

        this.entityManager.remove(existing.get());
    }

    private Optional<FavoriteEntity> findByEmailAndHandle(String email, String handle) {
        final String qlString = "select f from Favorite f where f.email = :email and f.handle = :handle";

        return this.entityManager.createQuery(qlString, FavoriteEntity.class)
            .setParameter("email", email)
            .setParameter("handle", handle)
            .setMaxResults(1)
            .getResultList()
            .stream()
            .findFirst();
    }

}
