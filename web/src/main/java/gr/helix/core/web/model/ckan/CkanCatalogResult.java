package gr.helix.core.web.model.ckan;

import com.fasterxml.jackson.annotation.JsonProperty;

import gr.helix.core.web.model.CatalogResult;

public class CkanCatalogResult<T> extends CatalogResult<T> {

    @JsonProperty("facets")
    private FacetCollection       facets;

    @JsonProperty("searchFacets")
    private SearchFacetCollection searchFacets;

    public FacetCollection getFacets() {
        return this.facets;
    }

    public void setFacets(FacetCollection facets) {
        this.facets = facets;
    }

    public SearchFacetCollection getSearchFacets() {
        return this.searchFacets;
    }

    public void setSearchFacets(SearchFacetCollection searchFacets) {
        this.searchFacets = searchFacets;
    }

}
