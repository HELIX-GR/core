package gr.helix.core.web.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import gr.helix.core.web.model.configuration.BingMapsConfiguration;
import gr.helix.core.web.model.configuration.OsmConfiguration;

@Configuration
@ConfigurationProperties()
public class MapConfiguration {

    private OsmConfiguration      osm;

    private BingMapsConfiguration bingMaps;

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

}
