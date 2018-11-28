package gr.helix.core.web.model.openaire;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import gr.helix.core.web.model.CatalogQuery;

public class OpenaireCatalogQuery extends CatalogQuery {

    private static DateFormat dateFormat  = new SimpleDateFormat("yyyy-MM-dd");

    private String            authors[]   = {};
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date              fromDateAccepted;
    private String            providers[] = {};
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date              toDateAccepted;

    public String[] getAuthors() {
        return this.authors;
    }

    public void setAuthors(String[] authors) {
        this.authors = authors;
    }

    public Date getFromDateAccepted() {
        return this.fromDateAccepted;
    }

    public void setFromDateAccepted(Date fromDateAccepted) {
        this.fromDateAccepted = fromDateAccepted;
    }

    public String[] getProviders() {
        return this.providers;
    }

    public void setProviders(String[] providers) {
        this.providers = providers;
    }

    public Date getToDateAccepted() {
        return this.toDateAccepted;
    }

    public void setToDateAccepted(Date toDateAccepted) {
        this.toDateAccepted = toDateAccepted;
    }

    @Override
    public String toString() {
        if (this.authors != null) {
            Arrays.sort(this.authors);
        }
        if (this.providers != null) {
            Arrays.sort(this.providers);
        }

        return "[providers=" + (this.providers != null ? String.join(",", this.providers) : "") + ", " +
                "authors=" + (this.authors != null ? String.join(",", this.authors) : "") + ", " +
                "fromDateAccepted=" + (this.fromDateAccepted == null ? "" : dateFormat.format(this.fromDateAccepted)) + ", " +
                "toDateAccepted=" + (this.toDateAccepted == null ? "" : dateFormat.format(this.toDateAccepted)) + ", " +
                "term=" + this.getTerm() + ", " +
                "pageIndex=" + Integer.toString(this.getPageIndex()) + ", " +
                "pageSize=" + Integer.toString(this.getPageSize()) + "]";
    }

}
