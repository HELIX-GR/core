package gr.helix.core.web.controller.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.saml.metadata.MetadataManager;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import gr.helix.core.common.model.RestResponse;
import gr.helix.core.web.config.MapConfiguration;
import gr.helix.core.web.config.SamlConfiguration;
import gr.helix.core.web.model.configuration.ClientConfiguration;

@RestController
@RequestMapping(produces = "application/json")
public class ConfigurationController extends BaseController {

    @Autowired
    private SamlConfiguration samlConfiguration;

    @Autowired
    private MetadataManager metadata;

	@Autowired
	private MapConfiguration mapConfiguration;

	@RequestMapping(value = "/action/configuration/{locale}", method = RequestMethod.GET)
	public RestResponse<ClientConfiguration> getConfiguration(String locale) {
		return RestResponse.result(this.createConfiguration());
	}

	private ClientConfiguration createConfiguration() {
		final ClientConfiguration config = new ClientConfiguration();

		config.setOsm(this.mapConfiguration.getOsm());
		config.setBingMaps(this.mapConfiguration.getBingMaps());
		config.setDefaultIdentityProvider(this.samlConfiguration.getDefaultProvider());

		this.metadata.getIDPEntityNames().stream().forEach(config::addIdentityProvider);

		return config;
	}

}
