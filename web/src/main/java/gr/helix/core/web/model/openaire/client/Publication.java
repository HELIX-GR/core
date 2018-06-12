package gr.helix.core.web.model.openaire.client;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

public class Publication {

    private List<String>  subject      = new ArrayList<String>();

    private String        dateOfAcceptance;

    private String        embargoEndDate;

    private String        publisher;

    private String        language;

    private String        title;

    private String        description;

    private List<Creator> creators     = new ArrayList<Creator>();

    private List<String>  contributors = new ArrayList<String>();

    private List<String>  originalId   = new ArrayList<String>();

    public List<String> getSubject() {
        return this.subject;
    }

    public void setSubject(List<String> subject) {
        this.subject = subject;
    }

    public String getDateOfAcceptance() {
        return this.dateOfAcceptance;
    }

    public void setDateOfAcceptance(String dateOfAcceptance) {
        this.dateOfAcceptance = dateOfAcceptance;
    }

    public String getEmbargoEndDate() {
        return this.embargoEndDate;
    }

    public void setEmbargoEndDate(String embargoEndDate) {
        this.embargoEndDate = embargoEndDate;
    }

    public String getPublisher() {
        return this.publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getLanguage() {
        return this.language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Creator> getCreators() {
        return this.creators;
    }

    public void setCreators(List<Creator> creators) {
        this.creators = creators;
    }

    public List<String> getContributors() {
        return this.contributors;
    }

    public void setContributors(List<String> contributors) {
        this.contributors = contributors;
    }

    public List<String> getOriginalId() {
        return this.originalId;
    }

    public void setOriginalId(List<String> originalId) {
        this.originalId = originalId;
    }

    public void addCreator(BigInteger rank, String name, String surname, String value) {
        final Creator creator = new Creator();
        creator.setRank(rank.intValue());
        creator.setName(name);
        creator.setSurname(surname);
        creator.setValue(value);
        this.creators.add(creator);
    }
}
