package gr.helix.core.web.model.openaire.client;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import gr.helix.core.web.model.openaire.OpenaireProvider;

public class Publication {

    private String               objectIdentifier;

    private List<String>         subjects     = new ArrayList<String>();

    private String               dateOfAcceptance;

    private String               embargoEndDate;

    private String               publisher;

    private String               language;

    private String               title;

    private List<String>         description  = new ArrayList<String>();

    private List<Creator>        creators     = new ArrayList<Creator>();

    private List<String>         contributors = new ArrayList<String>();

    private List<String>         originalId   = new ArrayList<String>();

    private String               format;

    private String               fullTextUrl;

    private Journal              journal;

    private List<String>         sources      = new ArrayList<String>();

    private String               bestAccessRight;

    private OpenaireProvider     collectedFrom;

    private OpenaireProvider     hostedBy;

    private List<PublicationRef> related      = new ArrayList<PublicationRef>();

    private String               url;

    private String               type;

    public String getObjectIdentifier() {
        return this.objectIdentifier;
    }

    public void setObjectIdentifier(String objectIdentifier) {
        this.objectIdentifier = objectIdentifier;
    }

    public List<String> getSubjects() {
        return this.subjects;
    }

    public void setSubjects(List<String> subjects) {
        this.subjects = subjects;
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
        return this.language.equalsIgnoreCase("Undetermined") ? null : this.language;
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

    public List<String> getDescription() {
        return this.description;
    }

    public void setDescription(List<String> description) {
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

    public String getFormat() {
        return this.format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public String getFullTextUrl() {
        return this.fullTextUrl;
    }

    public void setFullTextUrl(String fullTextUrl) {
        this.fullTextUrl = fullTextUrl;
    }

    public Journal getJournal() {
        return this.journal;
    }

    public void setJournal(Journal journal) {
        this.journal = journal;
    }

    public List<String> getSources() {
        return this.sources;
    }

    public void setSources(List<String> sources) {
        this.sources = sources;
    }

    public String getBestAccessRight() {
        return this.bestAccessRight;
    }

    public void setBestAccessRight(String bestAccessRight) {
        this.bestAccessRight = bestAccessRight;
    }

    public OpenaireProvider getCollectedFrom() {
        return this.collectedFrom;
    }

    public void setCollectedFrom(OpenaireProvider collectedFrom) {
        this.collectedFrom = collectedFrom;
    }

    public List<PublicationRef> getRelated() {
        return this.related;
    }

    public void setRelated(List<PublicationRef> related) {
        this.related = related;
    }

    public OpenaireProvider getHostedBy() {
        return this.hostedBy;
    }

    public void setHostedBy(OpenaireProvider hostedBy) {
        this.hostedBy = hostedBy;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void addCreator(BigInteger rank, String name, String surname, String value) {
        final Creator creator = new Creator();
        creator.setRank(rank.intValue());
        creator.setName(name);
        creator.setSurname(surname);
        creator.setValue(value);
        this.creators.add(creator);
    }

    public void addRelatedPublication(PublicationRef ref) {
        if (ref != null) {
            final PublicationRef existing = this.related.stream()
                .filter(r -> r.getId().equals(ref.getId()))
                .findFirst()
                .orElse(null);

            if (existing == null) {
                this.related.add(ref);
            }
        }
    }
}
