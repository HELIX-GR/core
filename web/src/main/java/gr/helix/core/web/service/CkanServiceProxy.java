package gr.helix.core.web.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;

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

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import gr.helix.core.common.model.ApplicationException;
import gr.helix.core.common.model.BasicErrorCode;
import gr.helix.core.web.config.ServiceConfiguration;
import gr.helix.core.web.model.CatalogQuery;
import gr.helix.core.web.model.CatalogResult;
import gr.helix.core.web.model.ckan.Package;
import gr.helix.core.web.model.ckan.Response;;

@Service
public class CkanServiceProxy {

    private static final Logger  logger = LoggerFactory.getLogger(CkanServiceProxy.class);

    @Autowired
    private ObjectMapper         objectMapper;

    @Autowired
    private HttpClient           httpClient;

    @Autowired
    private ServiceConfiguration ckanConfiguration;

    public CatalogResult<Package> getPackages(CatalogQuery query) throws ApplicationException {
        try {
            // Documentation: http://docs.ckan.org/en/latest/api/index.html

            // CKAN start index starts from 0
            final URI uri = new URIBuilder()
                .setScheme(this.ckanConfiguration.getScheme())
                .setHost(this.ckanConfiguration.getHost())
                .setPort(this.ckanConfiguration.getPort())
                .setPath(this.ckanConfiguration.getPath())
                .addParameter("q", query.getTerm())
                .addParameter("sort", "relevance asc, metadata_modified desc")
                .addParameter("rows", Integer.toString(query.getPageSize()))
                .addParameter("start", Integer.toString(query.getPageSize() * query.getPageIndex()))
                .build();

            final HttpUriRequest request = RequestBuilder.post(uri)
                .addHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE)
                .build();

            try (CloseableHttpResponse response = (CloseableHttpResponse) this.httpClient.execute(request)) {
                if (response.getStatusLine().getStatusCode() != 200) {
                    throw ApplicationException.fromMessage("Failed : HTTP error code : " + response.getStatusLine().getStatusCode());
                }
                final CatalogResult<Package> ckanResponse = this.parse(response);
                ckanResponse.setPageIndex(query.getPageIndex());
                ckanResponse.setPageSize(query.getPageSize());
                return ckanResponse;
            }
        } catch (final URISyntaxException ex) {
            logger.error("The input is not a valid URI", ex);
            throw ApplicationException.fromPattern(ex, BasicErrorCode.URI_SYNTAX_ERROR);
        } catch (final ClientProtocolException ex) {
            logger.error("An HTTP protocol error has occurred", ex);
            throw ApplicationException.fromPattern(ex, BasicErrorCode.HTTP_ERROR);
        } catch (final IOException ex) {
            logger.error("An I/O exception has occurred or the connection was aborted", ex);
            throw ApplicationException.fromPattern(ex, BasicErrorCode.IO_ERROR);
        }
    }

    private CatalogResult<Package> parse(HttpResponse response) {
        try (InputStream contentStream = response.getEntity().getContent()) {
            final Response<Package> ckanResponse =  this.objectMapper.readValue(contentStream, new TypeReference<Response<Package>>() { });

            final CatalogResult<Package> result = new CatalogResult<Package>();
            result.setCount(ckanResponse.getResult().getCount());
            result.setResults(ckanResponse.getResult().getResults());
            return result;

        } catch (final IOException ex) {
            logger.error("An I/O exception has occured while reading the response content", ex);
        }

        throw ApplicationException.fromMessage("Failed to read response");
    }

}
