package gr.helix.core.web.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CatalogResult<T> {

    private int     count;

    private int     pageIndex;

    private int     pageSize;

    private List<T> results;

    public int getCount() {
        return this.count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    @JsonProperty()
    public int getPageIndex() {
        return this.pageIndex;
    }

    @JsonIgnore()
    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }

    @JsonProperty()
    public int getPageSize() {
        return this.pageSize;
    }

    @JsonIgnore()
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public List<T> getResults() {
        return this.results;
    }

    public void setResults(List<T> results) {
        this.results = results;
    }

}
