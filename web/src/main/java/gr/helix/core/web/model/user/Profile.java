package gr.helix.core.web.model.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.Assert;

import gr.helix.core.common.model.user.Account;

public class Profile {

    private Account        account;

    private List<Favorite> favorites = new ArrayList<Favorite>();

    public Account getAccount() {
        return this.account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public List<Favorite> getFavorites() {
        return this.favorites;
    }

    public void setFavorites(List<Favorite> favorites) {
        Assert.notNull(favorites, "List of Favorite must not be null");
        this.favorites = favorites;
    }

}
