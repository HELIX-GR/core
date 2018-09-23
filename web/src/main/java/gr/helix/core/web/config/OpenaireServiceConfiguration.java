package gr.helix.core.web.config;

import gr.helix.core.web.model.openaire.OpenaireProvider;

public class OpenaireServiceConfiguration extends ServiceConfiguration {

    OpenaireProvider providers[];

    public OpenaireProvider[] getProviders() {
        return this.providers;
    }

    public void setProviders(OpenaireProvider[] providers) {
        this.providers = providers;
    }
}
