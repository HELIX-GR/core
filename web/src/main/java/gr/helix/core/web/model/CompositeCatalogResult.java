package gr.helix.core.web.model;

import java.util.HashMap;
import java.util.Map;

import gr.helix.core.common.model.EnumCatalog;

public class CompositeCatalogResult {

    private Map<EnumCatalog, CatalogResult<?>> catalogs = new HashMap<EnumCatalog, CatalogResult<?>>();

    public Map<EnumCatalog, CatalogResult<?>> getCatalogs() {
        return this.catalogs;
    }

    public void setCatalogs(Map<EnumCatalog, CatalogResult<?>> results) {
        this.catalogs = results;
    }

    public void add(EnumCatalog key, CatalogResult<?> value) {
        this.catalogs.put(key, value);
    }

    public void merge(CompositeCatalogResult result) {
        this.catalogs.putAll(result.catalogs);
    }

}
