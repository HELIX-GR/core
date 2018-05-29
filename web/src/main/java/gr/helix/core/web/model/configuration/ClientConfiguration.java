package gr.helix.core.web.model.configuration;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Application configuration settings
 */
public class ClientConfiguration {

    @JsonIgnore
    private final List<String>    identityProviders = new ArrayList<String>();

    private String                defaultIdentityProvider;

    private OsmConfiguration      osm;

    private BingMapsConfiguration bingMaps;

    public List<String> getIdentityProviders() {
        return this.identityProviders;
    }

    public OsmConfiguration getOsm() {
        return this.osm;
    }

    public void setOsm(OsmConfiguration osm) {
        this.osm = osm;
    }

    public BingMapsConfiguration getBingMaps() {
        return this.bingMaps;
    }

    public void setBingMaps(BingMapsConfiguration bingMaps) {
        this.bingMaps = bingMaps;
    }

    public String getDefaultIdentityProvider() {
        return this.defaultIdentityProvider;
    }

    public void setDefaultIdentityProvider(String defaultIdentityProvider) {
        this.defaultIdentityProvider = defaultIdentityProvider;
    }

    public void addIdentityProvider(String identityProvider) {
        this.identityProviders.add(identityProvider);
    }
}
