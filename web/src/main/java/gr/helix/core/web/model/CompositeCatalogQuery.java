package gr.helix.core.web.model;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class CompositeCatalogQuery {

    private Map<EnumCatalog, CatalogQuery> queries = new HashMap<EnumCatalog, CatalogQuery>();

    public Map<EnumCatalog, CatalogQuery> getQueries() {
        return this.queries;
    }

    public void setQueries(Map<EnumCatalog, CatalogQuery> queries) {
        this.queries = queries;
    }

    @JsonIgnore()
    public boolean isEmpty() {
        return this.queries.values().stream().allMatch(q -> q.isEmpty());
    }

    @JsonIgnore()
    public boolean isParallel() {
        return (this.queries.values().stream().filter(q -> !q.isEmpty()).count() > 1);
    }

}
