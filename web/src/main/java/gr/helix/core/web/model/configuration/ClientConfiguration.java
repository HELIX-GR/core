package gr.helix.core.web.model.configuration;

import java.util.ArrayList;
import java.util.List;

import gr.helix.core.web.model.EnumAuthProvider;
import gr.helix.core.web.model.ckan.CkanMetadata;

/**
 * Application configuration settings
 */
public class ClientConfiguration {

    private final List<EnumAuthProvider> authProviders     = new ArrayList<EnumAuthProvider>();

    private String                       jupyterNotebookViewer;

    private OsmConfiguration             osm;

    private BingMapsConfiguration        bingMaps;

    private WordPressConfiguration       wordPress;

    private CkanMetadata                 data;

    private CkanMetadata                 lab;

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
