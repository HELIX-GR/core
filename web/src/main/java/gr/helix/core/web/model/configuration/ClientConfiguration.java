package gr.helix.core.web.model.configuration;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import gr.helix.core.web.model.EnumAuthProvider;
import gr.helix.core.web.model.ckan.CkanMetadata;

/**
 * Application configuration settings
 */
public class ClientConfiguration {

    private final List<EnumAuthProvider> authProviders     = new ArrayList<EnumAuthProvider>();

    private String                       jupyterNotebookViewer;

    @JsonIgnore
    private final List<String>           identityProviders = new ArrayList<String>();

    private String                       defaultIdentityProvider;

    private OsmConfiguration             osm;

    private BingMapsConfiguration        bingMaps;

    private WordPressConfiguration       wordPress;

    private CkanMetadata                 data;

    private CkanMetadata                 lab;

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

    public CkanMetadata getData() {
        return this.data;
    }

    public void setData(CkanMetadata data) {
        this.data = data;
    }

    public CkanMetadata getLab() {
        return this.lab;
    }

    public void setLab(CkanMetadata lab) {
        this.lab = lab;
    }

    public List<EnumAuthProvider> getAuthProviders() {
        return this.authProviders;
    }

    public String getJupyterNotebookViewer() {
        return this.jupyterNotebookViewer;
    }

    public void setJupyterNotebookViewer(String jupyterNotebookViewer) {
        this.jupyterNotebookViewer = jupyterNotebookViewer;
    }

}
