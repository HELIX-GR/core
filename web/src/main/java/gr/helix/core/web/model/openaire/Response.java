package gr.helix.core.web.model.openaire;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Class for the OpenAIRE HTTP API (http://api.openaire.eu/api.html) response
 * root element.
 *
 * The XSD at https://www.openaire.eu/schema/1.0/oaf-1.0.xsd defines only the
 * schema for class {@link Entity} and its properties types.
 */
@XmlRootElement(name = "response", namespace = "")
public class Response {

    @XmlElementWrapper(name = "results", namespace = "")
    @XmlElement(name = "result")
    public List<Result> results;

    @XmlRootElement(name = "result", namespace = "")
    public static class Result {

        @XmlElement(name = "metadata", namespace = "")
        public Metadata metadata;

    }

    @XmlRootElement(name = "metadata", namespace = "")
    public static class Metadata {

        @XmlElement(name = "entity", namespace = "http://namespace.openaire.eu/oaf")
        public Entity entity;

    }

}
