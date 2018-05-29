package gr.helix.core.common.model.user;

import java.io.Serializable;

public class AccountInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    private final Integer           id;

    private final String            name;

    public AccountInfo(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

}
