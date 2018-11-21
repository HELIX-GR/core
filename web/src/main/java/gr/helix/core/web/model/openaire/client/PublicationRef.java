package gr.helix.core.web.model.openaire.client;

import java.util.List;

import javax.xml.bind.JAXBElement;

import gr.helix.core.web.model.openaire.server.OptionalClassedSchemedElement;
import gr.helix.core.web.model.openaire.server.RelToType;
import gr.helix.core.web.model.openaire.server.RelType;

public class PublicationRef {

    private String publisher;
    private String dateOfAcceptance;
    private String title;
    private Double similarity;
    private String id;

    public String getPublisher() {
        return this.publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getDateOfAcceptance() {
        return this.dateOfAcceptance;
    }

    public void setDateOfAcceptance(String dateOfAcceptance) {
        this.dateOfAcceptance = dateOfAcceptance;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getSimilarity() {
        return this.similarity;
    }

    public void setSimilarity(Double similarity) {
        this.similarity = similarity;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public static PublicationRef from(RelType value) {
        final PublicationRef instance = new PublicationRef();
        final List<JAXBElement<?>> elements = value.getToOrTitleOrWebsiteurl();
        if (elements != null) {
            elements.forEach(element -> {
                switch (element.getName().toString()) {
                    case "to":
                        if (element.getValue() instanceof RelToType) {
                            final RelToType obj = (RelToType) element.getValue();
                            instance.id = obj.getValue();
                        }
                        break;
                    case "dateofacceptance":
                        if (element.getValue() instanceof String) {
                            instance.dateOfAcceptance = (String) element.getValue();
                        }
                        break;
                    case "title":
                        if (element.getValue() instanceof OptionalClassedSchemedElement) {
                            final OptionalClassedSchemedElement obj = (OptionalClassedSchemedElement) element.getValue();
                            instance.title = obj.getContent();
                        }
                        break;
                    case "similarity":
                        if (element.getValue() instanceof Double) {
                            instance.similarity = (Double) element.getValue();
                        }
                        break;
                    case "publisher":
                        if (element.getValue() instanceof String) {
                            instance.publisher = (String) element.getValue();
                        }
                        break;

                }
            });

            if (instance.getId() != null) {
                return instance;
            }
        }

        return null;
    }

}
