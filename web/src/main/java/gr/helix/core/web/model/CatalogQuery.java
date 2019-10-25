package gr.helix.core.web.model;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import gr.helix.core.common.model.EnumCatalog;
import gr.helix.core.web.model.ckan.CkanCatalogQuery;
import gr.helix.core.web.model.openaire.OpenaireCatalogQuery;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "catalog")
@JsonSubTypes({
    @Type(name = "CKAN", value = CkanCatalogQuery.class),
    @Type(name = "OPENAIRE", value = OpenaireCatalogQuery.class),
    @Type(name = "LAB", value = CkanCatalogQuery.class),
})
public class CatalogQuery {

    private EnumCatalog catalog;

    private int         pageIndex;

    private int         pageSize;

    private String      term;

    public EnumCatalog getCatalog() {
        return this.catalog;
    }

    public void setCatalog(EnumCatalog catalog) {
        this.catalog = catalog;
    }

    public int getPageIndex() {
        return this.pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        if (pageIndex < 0) {
            pageIndex = 0;
        }
        this.pageIndex = pageIndex;
    }

    public int getPageSize() {
        return this.pageSize;
    }

    public void setPageSize(int pageSize) {
        if (pageSize > 100) {
            pageSize = 100;
        }
        this.pageSize = pageSize;
    }

    public String getTerm() {
        return this.term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    @JsonIgnore()
    public boolean isEmpty() {
        return StringUtils.isBlank(this.term);
    }

}
