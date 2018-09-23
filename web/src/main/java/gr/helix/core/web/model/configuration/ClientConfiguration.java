package gr.helix.core.web.model.configuration;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import gr.helix.core.web.model.ckan.CkanMetadata;
import gr.helix.core.web.model.openaire.OpenaireMetadata;

/**
 * Application configuration settings
 */
public class ClientConfiguration {

    @JsonIgnore
    private final List<String>     identityProviders = new ArrayList<String>();

    private String                 defaultIdentityProvider;

    private OsmConfiguration       osm;

    private BingMapsConfiguration  bingMaps;

    private WordPressConfiguration wordPress;

    private CkanMetadata           ckan;

    private OpenaireMetadata       openaire;

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

    public WordPressConfiguration getWordPress() {
        return this.wordPress;
    }

    public void setWordPress(WordPressConfiguration wordPress) {
        this.wordPress = wordPress;
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

    public CkanMetadata getCkan() {
        return this.ckan;
    }

    public void setCkan(CkanMetadata ckan) {
        this.ckan = ckan;
    }

    public OpenaireMetadata getOpenaire() {
        return this.openaire;
    }

    public void setOpenaire(OpenaireMetadata openaire) {
        this.openaire = openaire;
    }

}
