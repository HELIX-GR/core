package gr.helix.core.web.model.openaire;

import gr.helix.core.web.model.openaire.server.NamedIdElement;

public class OpenaireProvider {

    private String id;

    private String name;

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static OpenaireProvider from(NamedIdElement value) {
        final OpenaireProvider instance = new OpenaireProvider();
        instance.id = value.getId();
        instance.name = value.getName();
        return instance;
    }

}
