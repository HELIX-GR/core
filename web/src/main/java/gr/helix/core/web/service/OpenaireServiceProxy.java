package gr.helix.core.web.service;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.client.utils.URIBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import gr.helix.core.common.model.ApplicationException;
import gr.helix.core.common.model.BasicErrorCode;
import gr.helix.core.web.config.ServiceConfiguration;
import gr.helix.core.web.model.CatalogQuery;
import gr.helix.core.web.model.CatalogResult;
import gr.helix.core.web.model.openaire.client.Publication;
import gr.helix.core.web.model.openaire.server.ClassedSchemedElement;
import gr.helix.core.web.model.openaire.server.InferenceExtendedStringType;
import gr.helix.core.web.model.openaire.server.OptionalClassedSchemedElement;
import gr.helix.core.web.model.openaire.server.Response;
import gr.helix.core.web.model.openaire.server.Result;

@Service
public class OpenaireServiceProxy {

    private static final Logger  logger = LoggerFactory.getLogger(OpenaireServiceProxy.class);

    @Autowired
    private HttpClient           httpClient;

    @Autowired
    private ServiceConfiguration openaireConfiguration;

    public CatalogResult<Publication> getPublications(CatalogQuery query) throws ApplicationException {
        try {
            // Documentation: http://api.openaire.eu/api.html#pubs

            // OpenAIRE page index starts from 1
            final URI uri = new URIBuilder()
                .setScheme(this.openaireConfiguration.getScheme())
                .setHost(this.openaireConfiguration.getHost())
                .setPort(this.openaireConfiguration.getPort())
                .setPath(this.openaireConfiguration.getPath())
                .addParameter("title", query.getTerm())
                .addParameter("page", Integer.toString(query.getPageIndex() + 1))
                .addParameter("size", Integer.toString(query.getPageSize()))
                .build();

            final HttpUriRequest request = RequestBuilder.get(uri)
                .addHeader(HttpHeaders.ACCEPT, MediaType.TEXT_HTML_VALUE)
                .addHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_XHTML_XML_VALUE)
                .addHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_XML_VALUE).build();

            try (CloseableHttpResponse response = (CloseableHttpResponse) this.httpClient.execute(request)) {
                if (response.getStatusLine().getStatusCode() != 200) {
                    throw ApplicationException.fromMessage("Failed : HTTP error code : " + response.getStatusLine().getStatusCode());
                }
                final CatalogResult<Publication> openaireResponse = this.parse(response);
                openaireResponse.setPageIndex(query.getPageIndex());
                openaireResponse.setPageSize(query.getPageSize());
                return openaireResponse;
            }
        } catch (final URISyntaxException ex) {
            logger.error("The input is not a valid URI", ex);
            throw ApplicationException.fromPattern(ex, BasicErrorCode.URI_SYNTAX_ERROR);
        } catch (final ClientProtocolException ex) {
            logger.error("An http protocol error has occured", ex);
            throw ApplicationException.fromPattern(ex, BasicErrorCode.HTTP_ERROR);
        } catch (final IOException ex) {
            logger.error("An I/O exception has occurrend or the connection was aborted", ex);
            throw ApplicationException.fromPattern(ex, BasicErrorCode.IO_ERROR);
        }
    }

    private CatalogResult<Publication> parse(HttpResponse response) {
        try (InputStream contentStream = response.getEntity().getContent()) {
            final String content = IOUtils.toString(contentStream, StandardCharsets.UTF_8);
            final StringReader reader = new StringReader(content);

            final JAXBContext jaxbContext = JAXBContext.newInstance(Response.class);
            final Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();

            final Response openaireResponse = (Response) jaxbUnmarshaller.unmarshal(reader);
            return this.responseToCatalogResponse(openaireResponse);

        } catch (final JAXBException ex) {
            logger.error("Failed to parse response", ex);
        } catch (final IOException ex) {
            logger.error("An I/O exception has occured while reading the response content", ex);
        }

        throw ApplicationException.fromMessage("Failed to read response");
    }

    private CatalogResult<Publication> responseToCatalogResponse(Response response) {
        final CatalogResult<Publication> result = new CatalogResult<Publication>();

        final List<Publication> publications = response.results.stream()
            .map(r -> r.metadata.entity)
            .filter(e -> e != null)
            .map(e -> {
                final Publication pub = new Publication();

                e.getResult().getSubjectOrTitleOrCreator().stream()
                    .forEach(element -> {
                        this.processElement(element, pub);
                    });

                return pub;
            })
            .collect(Collectors.toList());

        result.setCount(response.header.total);
        result.setResults(publications);
        return result;
    }

    private void processElement(JAXBElement<?> element, Publication pub) {
        switch (element.getName().toString()) {
            case "subject":
                this.readSubject(element, pub);
                break;
            case "dateofacceptance":
                this.readDateofAcceptance(element, pub);
                break;
            case "embargoenddate":
                this.readEmbargoEndDate(element, pub);
                break;
            case "publisher":
                this.readPublisher(element, pub);
                break;
            case "language":
                this.readLanguage(element, pub);
                break;
            case "title":
                this.readTitle(element, pub);
                break;
            case "description":
                this.readDescription(element, pub);
                break;
            case "creator":
                this.readCreator(element, pub);
                break;
            case "contributor":
                this.readContributor(element, pub);
                break;
            case "originalId":
                this.readOriginalId(element, pub);
                break;
        }
    }

    private void readSubject(JAXBElement<?> element, Publication pub) {
        if(element.getValue() instanceof OptionalClassedSchemedElement) {
            final OptionalClassedSchemedElement value = (OptionalClassedSchemedElement) element.getValue();
            pub.getSubject().add(value.getContent());
        }
    }

    private void readDateofAcceptance(JAXBElement<?> element, Publication pub) {
        if(element.getValue() instanceof InferenceExtendedStringType) {
            final InferenceExtendedStringType value = (InferenceExtendedStringType) element.getValue();
            pub.setDateOfAcceptance(value.getValue());
        }
    }

    private void readEmbargoEndDate(JAXBElement<?> element, Publication pub) {
        if (element.getValue() instanceof String) {
            pub.setEmbargoEndDate((String) element.getValue());
        }
    }

    private void readPublisher(JAXBElement<?> element, Publication pub) {
        if(element.getValue() instanceof InferenceExtendedStringType) {
            final InferenceExtendedStringType value = (InferenceExtendedStringType) element.getValue();
            pub.setPublisher(value.getValue());
        }
    }

    private void readLanguage(JAXBElement<?> element, Publication pub) {
        if(element.getValue() instanceof OptionalClassedSchemedElement) {
            final OptionalClassedSchemedElement value = (OptionalClassedSchemedElement) element.getValue();
            pub.setLanguage(value.getClassname());
        }
    }

    private void readTitle(JAXBElement<?> element, Publication pub) {
        if(element.getValue() instanceof ClassedSchemedElement) {
            final ClassedSchemedElement value = (ClassedSchemedElement) element.getValue();
            pub.setTitle(value.getContent());
        }
    }

    private void readDescription(JAXBElement<?> element, Publication pub) {
        if(element.getValue() instanceof String) {
            pub.setDescription((String) element.getValue());
        }
    }

    private void readCreator(JAXBElement<?> element, Publication pub) {
        if(element.getValue() instanceof Result.Creator) {
            final Result.Creator value = (Result.Creator) element.getValue();
            pub.addCreator(value.getRank(), value.getName(), value.getSurname(), value.getName());
        }
    }

    private void readContributor(JAXBElement<?> element, Publication pub) {
        if (element.getValue() instanceof String) {
            pub.getContributors().add((String) element.getValue());
        }
    }

    private void readOriginalId(JAXBElement<?> element, Publication pub) {
        if (element.getValue() instanceof String) {
            pub.getOriginalId().add((String) element.getValue());
        }
    }

}
