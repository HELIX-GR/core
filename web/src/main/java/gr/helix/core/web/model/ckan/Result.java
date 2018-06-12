package gr.helix.core.web.model.ckan;

import java.util.List;

public class Result<T> {

    private int     count;

    private String  sort;

    private List<T> results;

    public int getCount() {
        return this.count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getSort() {
        return this.sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public List<T> getResults() {
        return this.results;
    }

    public void setResults(List<T> results) {
        this.results = results;
    }

}
