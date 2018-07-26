package gr.helix.core.web.controller.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.saml.metadata.MetadataManager;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import gr.helix.core.common.model.RestResponse;
import gr.helix.core.web.config.ExternalServiceProviderConfiguration;
import gr.helix.core.web.config.SamlConfiguration;
import gr.helix.core.web.model.configuration.ClientConfiguration;
import gr.helix.core.web.service.CkanServiceProxy;

@RestController
@RequestMapping(produces = "application/json")
public class ConfigurationController extends BaseController {

    @Autowired
    private SamlConfiguration                    samlConfiguration;

    @Autowired
    private MetadataManager                      metadata;

    @Autowired
    private ExternalServiceProviderConfiguration serviceProviderConfiguration;

    @Autowired
    private CkanServiceProxy                     ckanServiceProxy;

    @RequestMapping(value = "/action/configuration/{locale}", method = RequestMethod.GET)
    public RestResponse<ClientConfiguration> getConfiguration(String locale) {
        return RestResponse.result(this.createConfiguration());
    }

    private ClientConfiguration createConfiguration() {
        final ClientConfiguration config = new ClientConfiguration();

        config.setOsm(this.serviceProviderConfiguration.getOsm());
        config.setBingMaps(this.serviceProviderConfiguration.getBingMaps());
        config.setDefaultIdentityProvider(this.samlConfiguration.getDefaultProvider());
        config.setWordPress(this.serviceProviderConfiguration.getWordPress());

        config.setCkan(this.ckanServiceProxy.getMetadata());

        this.metadata.getIDPEntityNames().stream().forEach(config::addIdentityProvider);

        return config;
    }

}
