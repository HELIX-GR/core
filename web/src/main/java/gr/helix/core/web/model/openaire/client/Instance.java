package gr.helix.core.web.model.openaire.client;

import java.util.List;

import javax.xml.bind.JAXBElement;

import gr.helix.core.web.model.openaire.OpenaireProvider;
import gr.helix.core.web.model.openaire.server.ClassedSchemedElement;
import gr.helix.core.web.model.openaire.server.InferenceExtendedStringType;
import gr.helix.core.web.model.openaire.server.InstanceType;
import gr.helix.core.web.model.openaire.server.NamedIdElement;
import gr.helix.core.web.model.openaire.server.WebresourceType;

public class Instance {

    private String           accessright;
    private OpenaireProvider collectedFrom;
    private String           dateofacceptance;
    private OpenaireProvider hostedBy;
    private String           id;
    private String           license;
    private String           type;
    private String           url;

    public String getAccessright() {
        return this.accessright;
    }

    public void setAccessright(String accessright) {
        this.accessright = accessright;
    }

    public OpenaireProvider getCollectedFrom() {
        return this.collectedFrom;
    }

    public void setCollectedFrom(OpenaireProvider collectedFrom) {
        this.collectedFrom = collectedFrom;
    }

    public String getDateofacceptance() {
        return this.dateofacceptance;
    }

    public void setDateofacceptance(String dateofacceptance) {
        this.dateofacceptance = dateofacceptance;
    }

    public OpenaireProvider getHostedBy() {
        return this.hostedBy;
    }

    public void setHostedBy(OpenaireProvider hostedBy) {
        this.hostedBy = hostedBy;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLicense() {
        return this.license;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public static Instance from(InstanceType value) {
        final Instance instance = new Instance();
        instance.id = value.getId();

        final List<JAXBElement<?>> elements = value.getAccessrightOrLicenseOrInstancetype();
        if (elements != null) {
            elements.forEach(e -> {
                switch (e.getName().toString()) {
                    case "license":
                        if (e.getValue() instanceof String) {
                            instance.license = (String) e.getValue();
                        }
                        break;
                    case "hostedby":
                        if (e.getValue() instanceof NamedIdElement) {
                            instance.hostedBy = OpenaireProvider.from((NamedIdElement) e.getValue());
                        }
                        break;
                    case "accessright":
                        if (e.getValue() instanceof ClassedSchemedElement) {
                            instance.accessright = ((ClassedSchemedElement) e.getValue()).getClassname();
                        }
                        break;
                    case "dateofacceptance":
                        if (e.getValue() instanceof InferenceExtendedStringType) {
                            instance.dateofacceptance = ((InferenceExtendedStringType) e.getValue()).getValue();
                        }
                        break;
                    case "collectedfrom":
                        if (e.getValue() instanceof NamedIdElement) {
                            instance.collectedFrom = OpenaireProvider.from((NamedIdElement) e.getValue());
                        }
                        break;
                    case "instancetype":
                        if (e.getValue() instanceof ClassedSchemedElement) {
                            instance.type = ((ClassedSchemedElement) e.getValue()).getClassname();
                        }
                        break;
                    case "webresource":
                        if (e.getValue() instanceof WebresourceType) {
                            final WebresourceType resource = (WebresourceType) e.getValue();
                            instance.url = resource.getUrl();
                        }
                        break;
                }
            });
        }

        return instance;
    }

}
