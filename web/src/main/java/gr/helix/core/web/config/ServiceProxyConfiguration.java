package gr.helix.core.web.config;

import org.apache.http.client.HttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

import gr.helix.core.web.service.CkanServiceProxy;

@Configuration
public class ServiceProxyConfiguration {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private HttpClient   httpClient;

    @Bean
    @ConfigurationProperties(prefix = "helix.pubs.openaire")
    OpenaireServiceConfiguration openaireConfiguration() {
        return new OpenaireServiceConfiguration();
    }

    @Bean
    @ConfigurationProperties(prefix = "helix.data.ckan")
    ServiceConfiguration dataCkanConfiguration() {
        return new ServiceConfiguration();
    }

    @Bean
    @ConfigurationProperties(prefix = "helix.lab.ckan")
    ServiceConfiguration labCkanConfiguration() {
        return new ServiceConfiguration();
    }

    @Bean
    CkanServiceProxy dataCkanServiceProxy(@Qualifier("dataCkanConfiguration") ServiceConfiguration configuration) {
        final CkanServiceProxy proxy = new CkanServiceProxy();

        proxy.setObjectMapper(this.objectMapper);
        proxy.setHttpClient(this.httpClient);
        proxy.setCkanConfiguration(configuration);

        return proxy;
    }

    @Bean
    CkanServiceProxy labCkanServiceProxy(@Qualifier("labCkanConfiguration") ServiceConfiguration configuration) {
        final CkanServiceProxy proxy = new CkanServiceProxy();

        proxy.setObjectMapper(this.objectMapper);
        proxy.setHttpClient(this.httpClient);
        proxy.setCkanConfiguration(configuration);

        return proxy;
    }

}
