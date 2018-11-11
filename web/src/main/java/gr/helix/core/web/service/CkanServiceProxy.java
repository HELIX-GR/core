package gr.helix.core.web.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.apache.commons.lang.StringUtils;
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
import org.springframework.http.MediaType;
import org.springframework.util.Assert;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import gr.helix.core.common.model.ApplicationException;
import gr.helix.core.common.model.BasicErrorCode;
import gr.helix.core.web.config.EndpointConfiguration;
import gr.helix.core.web.config.ServiceConfiguration;
import gr.helix.core.web.model.CatalogResult;
import gr.helix.core.web.model.ckan.ArrayResponse;
import gr.helix.core.web.model.ckan.CkanCatalogQuery;
import gr.helix.core.web.model.ckan.CkanCatalogResult;
import gr.helix.core.web.model.ckan.CkanMetadata;
import gr.helix.core.web.model.ckan.Group;
import gr.helix.core.web.model.ckan.License;
import gr.helix.core.web.model.ckan.ObjectResponse;
import gr.helix.core.web.model.ckan.Organization;
import gr.helix.core.web.model.ckan.Package;
import gr.helix.core.web.model.ckan.Result;
import gr.helix.core.web.model.ckan.Tag;;

public class CkanServiceProxy {

    private static final Logger  logger = LoggerFactory.getLogger(CkanServiceProxy.class);

    private ObjectMapper         objectMapper;

    private HttpClient           httpClient;

    private ServiceConfiguration ckanConfiguration;

    @PostConstruct
    public void initi() throws Exception {
        Assert.notNull(this.objectMapper, "An instance of ObjectMapper is required");
        Assert.notNull(this.httpClient, "An instance of HttpClient is required");
        Assert.notNull(this.ckanConfiguration, "An instance of ServiceConfiguration is required");
    }

    public void setObjectMapper(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public void setHttpClient(HttpClient httpClient) {
        this.httpClient = httpClient;
    }

    public void setCkanConfiguration(ServiceConfiguration ckanConfiguration) {
        this.ckanConfiguration = ckanConfiguration;
    }

    public CatalogResult<Package> getPackages(CkanCatalogQuery query, boolean includeFacets) throws ApplicationException {
        try {
            // Documentation: http://docs.ckan.org/en/latest/api/index.html

            // CKAN start index starts from 0
            final EndpointConfiguration endpoint = this.ckanConfiguration.getApi();
            final URIBuilder builder = new URIBuilder()
                .setScheme(endpoint.getScheme())
                .setHost(endpoint.getHost())
                .setPort(endpoint.getPort())
                .setPath(this.composePath("api/action/package_search"))
                .addParameter("q", query.getTerm())
                .addParameter("sort", "relevance asc, metadata_modified desc")
                .addParameter("rows", Integer.toString(query.getPageSize()))
                .addParameter("start", Integer.toString(query.getPageSize() * query.getPageIndex()));

            if ((includeFacets) && (query.getFacets() != null)) {
                final String facetQuery = this.buildFacetQuery(query.getFacets());
                if (!StringUtils.isBlank(facetQuery)) {
                    builder.addParameter("facet.field", "[\"license_id\",\"organization\", \"groups\", \"tags\", \"res_format\"]");
                    builder.addParameter("fq", facetQuery);
                }
            }

            final URI uri = builder.build();

            final HttpUriRequest request = RequestBuilder.post(uri)
                .addHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE)
                .build();

            try (CloseableHttpResponse response = (CloseableHttpResponse) this.httpClient.execute(request)) {
                if (response.getStatusLine().getStatusCode() != 200) {
                    throw ApplicationException.fromMessage("Failed : HTTP error code : " + response.getStatusLine().getStatusCode());
                }
                final CatalogResult<Package> ckanResponse = this.parsePackages(response);
                ckanResponse.setPageIndex(query.getPageIndex());
                ckanResponse.setPageSize(query.getPageSize());
                return ckanResponse;
            }
        } catch (final ApplicationException ex) {
            throw ex;
        } catch (final Exception ex) {
            this.handleException(ex);
        }
        return null;
    }

    public CkanMetadata getMetadata() {
        final CkanMetadata metadata = new CkanMetadata();

        metadata.setLicenses(this.getLicenses());
        metadata.setFormats(this.getFormats());
        metadata.setTags(this.getTags());
        metadata.setGroups(this.getGroups());
        metadata.setOrganizations(this.getOrganizations());


        try {
            final EndpointConfiguration endpoint = this.ckanConfiguration.getApi();
            final String host = new URIBuilder()
                .setScheme(endpoint.getScheme())
                .setHost(endpoint.getHost())
                .setPort(endpoint.getPort())
                .build()
                .toString();
            metadata.setHost(host);
        } catch (final URISyntaxException e) {
            // Ignore
        }

        return metadata;
    }

    private void handleException(Exception ex) {
        if (ex instanceof URISyntaxException) {
            logger.error("The input is not a valid URI", ex);
            throw ApplicationException.fromPattern(ex, BasicErrorCode.URI_SYNTAX_ERROR);
        }
        if (ex instanceof ClientProtocolException) {
            logger.error("An HTTP protocol error has occurred", ex);
            throw ApplicationException.fromPattern(ex, BasicErrorCode.HTTP_ERROR);
        }
        if (ex instanceof IOException) {
            logger.error("An I/O exception has occurred or the connection was aborted", ex);
            throw ApplicationException.fromPattern(ex, BasicErrorCode.IO_ERROR);
        }

        throw ApplicationException.fromPattern(BasicErrorCode.UNKNOWN);
    }

    private List<License> getLicenses() {
        try {
            final EndpointConfiguration endpoint = this.ckanConfiguration.getApi();
            final URI uri = new URIBuilder()
                .setScheme(endpoint.getScheme())
                .setHost(endpoint.getHost())
                .setPort(endpoint.getPort())
                .setPath(this.composePath("api/action/license_list"))
                .build();

            final HttpUriRequest request = RequestBuilder.get(uri)
                .addHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE)
                .build();

            try (CloseableHttpResponse response = (CloseableHttpResponse) this.httpClient.execute(request)) {
                if (response.getStatusLine().getStatusCode() != 200) {
                    throw ApplicationException.fromMessage("Failed : HTTP error code : " + response.getStatusLine().getStatusCode());
                }
                final ArrayResponse<License> ckanResponse = this.parseLicenses(response);

                return ckanResponse.getResult();
            }
        } catch (final ApplicationException ex) {
            throw ex;
        } catch (final Exception ex) {
            this.handleException(ex);
        }

        return null;
    }

    private List<String> getFormats() {
        try {
            final EndpointConfiguration endpoint = this.ckanConfiguration.getApi();
            final URI uri = new URIBuilder()
                .setScheme(endpoint.getScheme())
                .setHost(endpoint.getHost())
                .setPort(endpoint.getPort())
                .setPath(this.composePath("api/action/format_autocomplete"))
                .setParameter("q", "")
                .setParameter("limit", "1000")
                .build();

            final HttpUriRequest request = RequestBuilder.get(uri)
                .addHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE)
                .build();

            try (CloseableHttpResponse response = (CloseableHttpResponse) this.httpClient.execute(request)) {
                if (response.getStatusLine().getStatusCode() != 200) {
                    throw ApplicationException.fromMessage("Failed : HTTP error code : " + response.getStatusLine().getStatusCode());
                }
                final ArrayResponse<String> ckanResponse = this.parseStringArray(response);

                return ckanResponse.getResult();
            }
        } catch (final ApplicationException ex) {
            throw ex;
        } catch (final Exception ex) {
            this.handleException(ex);
        }

        return null;
    }

    private List<Tag> getTags() {
        try {
            final EndpointConfiguration endpoint = this.ckanConfiguration.getApi();
            final URI uri = new URIBuilder()
                .setScheme(endpoint.getScheme())
                .setHost(endpoint.getHost())
                .setPort(endpoint.getPort())
                .setPath(this.composePath("api/action/tag_list"))
                .setParameter("all_fields", "true")
                .build();

            final HttpUriRequest request = RequestBuilder.get(uri)
                .addHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE)
                .build();

            try (CloseableHttpResponse response = (CloseableHttpResponse) this.httpClient.execute(request)) {
                if (response.getStatusLine().getStatusCode() != 200) {
                    throw ApplicationException.fromMessage("Failed : HTTP error code : " + response.getStatusLine().getStatusCode());
                }
                final ArrayResponse<Tag> ckanResponse = this.parseTags(response);

                return ckanResponse.getResult();
            }
        } catch (final ApplicationException ex) {
            throw ex;
        } catch (final Exception ex) {
            this.handleException(ex);
        }

        return null;
    }

    private List<Organization> getOrganizations() {
        try {
            final EndpointConfiguration endpoint = this.ckanConfiguration.getApi();
            final URI uri = new URIBuilder()
                .setScheme(endpoint.getScheme())
                .setHost(endpoint.getHost())
                .setPort(endpoint.getPort())
                .setPath(this.composePath("api/action/organization_list"))
                .setParameter("limit", "1000")
                .setParameter("all_fields", "true")
                .build();

            final HttpUriRequest request = RequestBuilder.get(uri)
                .addHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE)
                .build();

            try (CloseableHttpResponse response = (CloseableHttpResponse) this.httpClient.execute(request)) {
                if (response.getStatusLine().getStatusCode() != 200) {
                    throw ApplicationException.fromMessage("Failed : HTTP error code : " + response.getStatusLine().getStatusCode());
                }
                final ArrayResponse<Organization> ckanResponse = this.parseOrganizations(response);

                return ckanResponse.getResult();
            }
        } catch (final ApplicationException ex) {
            throw ex;
        } catch (final Exception ex) {
            this.handleException(ex);
        }

        return null;
    }

    private List<Group> getGroups() {
        try {
            final EndpointConfiguration endpoint = this.ckanConfiguration.getApi();
            final URI uri = new URIBuilder()
                .setScheme(endpoint.getScheme())
                .setHost(endpoint.getHost())
                .setPort(endpoint.getPort())
                .setPath(this.composePath("api/action/group_list"))
                .setParameter("limit", "1000")
                .setParameter("all_fields", "true")
                .build();

            final HttpUriRequest request = RequestBuilder.get(uri)
                .addHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE)
                .build();

            try (CloseableHttpResponse response = (CloseableHttpResponse) this.httpClient.execute(request)) {
                if (response.getStatusLine().getStatusCode() != 200) {
                    throw ApplicationException.fromMessage("Failed : HTTP error code : " + response.getStatusLine().getStatusCode());
                }
                final ArrayResponse<Group> ckanResponse = this.parseGroups(response);

                return ckanResponse.getResult();
            }
        } catch (final ApplicationException ex) {
            throw ex;
        } catch (final Exception ex) {
            this.handleException(ex);
        }

        return null;
    }

    private CatalogResult<Package> parsePackages(HttpResponse response) {
        try (InputStream contentStream = response.getEntity().getContent()) {
            final ObjectResponse<Result<Package>> ckanResponse =
                this.objectMapper.readValue(contentStream, new TypeReference<ObjectResponse<Result<Package>>>() { });

            final CkanCatalogResult<Package> result = new CkanCatalogResult<Package>();
            result.setCount(ckanResponse.getResult().getCount());
            result.setResults(ckanResponse.getResult().getResults());
            result.setFacets(ckanResponse.getResult().getFacets());
            result.setSearchFacets(ckanResponse.getResult().getSearchFacets());
            return result;

        } catch (final IOException ex) {
            logger.error("An I/O exception has occured while reading the response content", ex);
        }

        throw ApplicationException.fromMessage("Failed to read response");
    }

    private ArrayResponse<Organization> parseOrganizations(HttpResponse response) {
        try (InputStream contentStream = response.getEntity().getContent()) {
            return this.objectMapper.readValue(contentStream, new TypeReference<ArrayResponse<Organization>>() { });
        } catch (final IOException ex) {
            logger.error("An I/O exception has occured while reading the response content", ex);
        }

        throw ApplicationException.fromMessage("Failed to read response");
    }

    private ArrayResponse<Group> parseGroups(HttpResponse response) {
        try (InputStream contentStream = response.getEntity().getContent()) {
            return this.objectMapper.readValue(contentStream, new TypeReference<ArrayResponse<Group>>() { });
        } catch (final IOException ex) {
            logger.error("An I/O exception has occured while reading the response content", ex);
        }

        throw ApplicationException.fromMessage("Failed to read response");
    }

    private ArrayResponse<License> parseLicenses(HttpResponse response) {
        try (InputStream contentStream = response.getEntity().getContent()) {
            return this.objectMapper.readValue(contentStream, new TypeReference<ArrayResponse<License>>() { });
        } catch (final IOException ex) {
            logger.error("An I/O exception has occured while reading the response content", ex);
        }

        throw ApplicationException.fromMessage("Failed to read response");
    }

    private ArrayResponse<Tag> parseTags(HttpResponse response) {
        try (InputStream contentStream = response.getEntity().getContent()) {
            return this.objectMapper.readValue(contentStream, new TypeReference<ArrayResponse<Tag>>() { });
        } catch (final IOException ex) {
            logger.error("An I/O exception has occured while reading the response content", ex);
        }

        throw ApplicationException.fromMessage("Failed to read response");
    }

    private ArrayResponse<String> parseStringArray(HttpResponse response) {
        try (InputStream contentStream = response.getEntity().getContent()) {
            return this.objectMapper.readValue(contentStream, new TypeReference<ArrayResponse<String>>() { });
        } catch (final IOException ex) {
            logger.error("An I/O exception has occured while reading the response content", ex);
        }

        throw ApplicationException.fromMessage("Failed to read response");
    }

    private String composePath(String path) {
        final String relativePath = this.ckanConfiguration.getApi().getPath();
        if (StringUtils.isBlank(relativePath)) {
            return path;
        }
        return relativePath + "/" + path;
    }

    private String buildFacetQuery(CkanCatalogQuery.FacetQuery query) {
        String queryString = "";

        queryString += this.buildFacetQueryExpression("license_id", query.getLicenses());
        queryString += this.buildFacetQueryExpression("tags", query.getTags());
        queryString += this.buildFacetQueryExpression("res_format", query.getFormats());
        queryString += this.buildFacetQueryExpression("groups", query.getGroups());
        queryString += this.buildFacetQueryExpression("organization", query.getOrganizations());

        return queryString;
    }

    private String buildFacetQueryExpression(String key, List<String> values) {
        if ((values != null) && (values.size() > 0)) {
            final String expression = values.stream()
                .map(value -> "\"" + value + "\"")
                .collect(Collectors.joining(" OR "));

            return String.format("+%s:(%s)", key, expression);
        }

        return "";
    }

}
