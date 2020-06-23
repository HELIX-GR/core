package gr.helix.core.web.controller.action;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import gr.helix.core.common.model.RestResponse;
import gr.helix.core.web.config.ExternalServiceProviderConfiguration;
import gr.helix.core.web.model.EnumAuthProvider;
import gr.helix.core.web.model.configuration.ClientConfiguration;
import gr.helix.core.web.service.CkanServiceProxy;

@RestController
@RequestMapping(produces = "application/json")
public class ConfigurationController extends BaseController {

    @Value("${helix.authentication-providers:forms}")
    private String                               authProviders;

    @Value("${helix.jupyter.notebook-viewer}")
    private String                               jupyterNotebookViewer;

    @Autowired
    private ExternalServiceProviderConfiguration serviceProviderConfiguration;

    @Autowired
    @Qualifier("dataCkanServiceProxy")
    private CkanServiceProxy                     dataCkanServiceProxy;

    @Autowired
    @Qualifier("labCkanServiceProxy")
    private CkanServiceProxy                     labCkanServiceProxy;

    @RequestMapping(value = "/action/configuration/{locale}", method = RequestMethod.GET)
    public RestResponse<ClientConfiguration> getConfiguration(String locale) {
        return RestResponse.result(this.createConfiguration());
    }

    private ClientConfiguration createConfiguration() {
        final ClientConfiguration config = new ClientConfiguration();

        config.setOsm(this.serviceProviderConfiguration.getOsm());
        config.setBingMaps(this.serviceProviderConfiguration.getBingMaps());
        config.setWordPress(this.serviceProviderConfiguration.getWordPress());
        config.setJupyterNotebookViewer(this.jupyterNotebookViewer);

        config.setData(this.dataCkanServiceProxy.getMetadata());
        config.setLab(this.labCkanServiceProxy.getMetadata());

        Arrays.stream(this.authProviders.split(","))
            .map(String::trim)
            .map(EnumAuthProvider::fromString)
            .filter(s -> s != null)
            .forEach(s -> config.getAuthProviders().add(s));

        return config;
    }

}
