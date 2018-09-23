package gr.helix.core.web.model.openaire;

public class OpenaireMetadata {

    String           host;

    OpenaireProvider providers[];

    public String getHost() {
        return this.host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public OpenaireProvider[] getProviders() {
        return this.providers;
    }

    public void setProviders(OpenaireProvider[] providers) {
        this.providers = providers;
    }

}
