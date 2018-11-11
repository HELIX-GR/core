package gr.helix.core.web.service;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
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
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import gr.helix.core.common.model.ApplicationException;
import gr.helix.core.common.model.BasicErrorCode;
import gr.helix.core.web.config.EndpointConfiguration;
import gr.helix.core.web.config.OpenaireServiceConfiguration;
import gr.helix.core.web.model.CatalogResult;
import gr.helix.core.web.model.openaire.OpenaireCatalogQuery;
import gr.helix.core.web.model.openaire.OpenaireMetadata;
import gr.helix.core.web.model.openaire.client.Publication;
import gr.helix.core.web.model.openaire.server.ClassedSchemedElement;
import gr.helix.core.web.model.openaire.server.InferenceExtendedStringType;
import gr.helix.core.web.model.openaire.server.OptionalClassedSchemedElement;
import gr.helix.core.web.model.openaire.server.Response;
import gr.helix.core.web.model.openaire.server.Result;

@Service
public class OpenaireServiceProxy {

    private static final Logger          logger                  = LoggerFactory.getLogger(OpenaireServiceProxy.class);

    private static final String          API_SEARCH_PUBLICATIONS = "search/publications";

    private static final DateFormat      dateFormat              = new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    private HttpClient                   httpClient;

    @Autowired
    @Qualifier("openaireConfiguration")
    private OpenaireServiceConfiguration openaireConfiguration;

    public OpenaireMetadata getMetadata() {
        final OpenaireMetadata metadata = new OpenaireMetadata();

        try {
            final EndpointConfiguration endpoint = this.openaireConfiguration.getSite();
            final String host = new URIBuilder()
                .setScheme(endpoint.getScheme())
                .setHost(endpoint.getHost())
                .setPort(endpoint.getPort())
                .build()
                .toString();
            metadata.setHost(host);
            metadata.setProviders(this.openaireConfiguration.getProviders());
        } catch (final URISyntaxException e) {
            // Ignore
        }

        return metadata;
    }

    public CatalogResult<Publication> getPublications(OpenaireCatalogQuery query) throws ApplicationException {
        try {
            // Documentation: http://api.openaire.eu/api.html#pubs

            // OpenAIRE page index starts from 1
            final List<String> providers = Arrays.stream(query.getProviders())
                .filter(p -> !StringUtils.isBlank(p))
                .collect(Collectors.toList());
            if(providers.isEmpty()) {
                Arrays.stream(this.openaireConfiguration.getProviders())
                    .forEach(p -> providers.add(p.getId()));
            }

            final EndpointConfiguration endpoint = this.openaireConfiguration.getApi();
            final URIBuilder builder = new URIBuilder()
                .setScheme(endpoint.getScheme())
                .setHost(endpoint.getHost())
                .setPort(endpoint.getPort())
                .setPath(API_SEARCH_PUBLICATIONS)
                .addParameter("model", "openaire")
                .addParameter("OA", "true")
                .addParameter("title", query.getTerm())
                .addParameter("page", Integer.toString(query.getPageIndex() + 1))
                .addParameter("size", Integer.toString(query.getPageSize()))
                .addParameter("openaireProviderID", String.join(",", providers))
                .addParameter("sortBy", "resultdateofacceptance,descending");

            if (query.getFromDateAccepted() != null) {
                builder.addParameter("fromDateAccepted", dateFormat.format(query.getFromDateAccepted()));
            }
            if (query.getToDateAccepted() != null) {
                builder.addParameter("toDateAccepted", dateFormat.format(query.getToDateAccepted()));
            }
            if ((query.getAuthors() != null) && (query.getAuthors().length != 0)) {
                builder.addParameter("author", String.join(" ", query.getAuthors()));
            }

            final URI uri = builder.build();

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
                .filter(r -> (r.header != null) && (r.metadata.entity != null))
                .map(r -> {
                    final Publication pub = new Publication();

                    pub.setObjectIdentifier(r.header.objIdentifier);
                    r.metadata.entity.getResult().getSubjectOrTitleOrCreator().stream()
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
            case "fulltext":
                this.readFullText(element, pub);
                break;
            case "format":
                this.readFormat(element, pub);
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

    private void readFullText(JAXBElement<?> element, Publication pub) {
        if(element.getValue() instanceof String) {
            pub.setFullTextUrl((String) element.getValue());
        }
        if(element.getValue() instanceof InferenceExtendedStringType) {
            final InferenceExtendedStringType value = (InferenceExtendedStringType) element.getValue();
            pub.setFullTextUrl(value.getValue());
        }
    }

    private void readFormat(JAXBElement<?> element, Publication pub) {
        if(element.getValue() instanceof String) {
            pub.setFormat((String) element.getValue());
        }
    }

}
