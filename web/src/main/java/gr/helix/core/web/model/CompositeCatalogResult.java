package gr.helix.core.web.model;

import java.util.HashMap;
import java.util.Map;

public class CompositeCatalogResult {

    private Map<String, CatalogResult<?>> catalogs = new HashMap<String, CatalogResult<?>>();

    public Map<String, CatalogResult<?>> getCatalogs() {
        return this.catalogs;
    }

    public void setCatalogs(Map<String, CatalogResult<?>> results) {
        this.catalogs = results;
    }

}
