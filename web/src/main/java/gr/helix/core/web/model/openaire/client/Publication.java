package gr.helix.core.web.model.openaire.client;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import gr.helix.core.web.model.openaire.OpenaireProvider;

public class Publication {

    private String                       bestAccessRight;
    private final List<OpenaireProvider> collectedFrom = new ArrayList<OpenaireProvider>();
    private final List<String>           contributors  = new ArrayList<String>();
    private final List<Creator>          creators      = new ArrayList<Creator>();
    private String                       dateOfAcceptance;
    private final List<String>           description   = new ArrayList<String>();
    private String                       embargoEndDate;
    private String                       format;
    private String                       fullTextUrl;
    private final List<Instance>         instances     = new ArrayList<Instance>();
    private Journal                      journal;
    private String                       language;
    private String                       objectIdentifier;
    private final List<String>           originalId    = new ArrayList<String>();
    private String                       publisher;
    private final List<PublicationRef>   related       = new ArrayList<PublicationRef>();
    private String                       resultType;
    private final List<String>           sources       = new ArrayList<String>();
    private final List<String>           subjects      = new ArrayList<String>();
    private String                       title;

    public String getObjectIdentifier() {
        return this.objectIdentifier;
    }

    public void setObjectIdentifier(String objectIdentifier) {
        this.objectIdentifier = objectIdentifier;
    }

    public List<String> getSubjects() {
        return this.subjects;
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

    public List<Creator> getCreators() {
        return this.creators;
    }

    public List<String> getContributors() {
        return this.contributors;
    }

    public List<String> getOriginalId() {
        return this.originalId;
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

    public String getBestAccessRight() {
        return this.bestAccessRight;
    }

    public void setBestAccessRight(String bestAccessRight) {
        this.bestAccessRight = bestAccessRight;
    }

    public List<OpenaireProvider> getCollectedFrom() {
        return this.collectedFrom;
    }

    public List<PublicationRef> getRelated() {
        return this.related;
    }

    public String getResultType() {
        return this.resultType;
    }

    public void setResultType(String resultType) {
        this.resultType = resultType;
    }

    public List<Instance> getInstances() {
        return this.instances;
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

    public void addInstance(Instance instance) {
        if (instance != null) {
            this.instances.add(instance);
        }
    }

}
