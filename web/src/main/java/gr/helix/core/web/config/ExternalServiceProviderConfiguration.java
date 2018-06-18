package gr.helix.core.web.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import gr.helix.core.web.model.configuration.BingMapsConfiguration;
import gr.helix.core.web.model.configuration.OsmConfiguration;
import gr.helix.core.web.model.configuration.WordPressConfiguration;

@Configuration
@ConfigurationProperties()
public class ExternalServiceProviderConfiguration {

    private OsmConfiguration       osm;

    private BingMapsConfiguration  bingMaps;

    private WordPressConfiguration wordPress;

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

}
