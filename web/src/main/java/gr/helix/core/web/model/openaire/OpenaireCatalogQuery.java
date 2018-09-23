package gr.helix.core.web.model.openaire;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import gr.helix.core.web.model.CatalogQuery;

public class OpenaireCatalogQuery extends CatalogQuery {

    private String authors[]   = {};
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date   fromDateAccepted;
    private String providers[] = {};
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date   toDateAccepted;

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

}
