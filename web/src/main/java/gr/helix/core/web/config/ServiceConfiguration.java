package gr.helix.core.web.config;

public class ServiceConfiguration {

    private EndpointConfiguration api;

    private EndpointConfiguration site;

    public EndpointConfiguration getApi() {
        return this.api;
    }

    public void setApi(EndpointConfiguration api) {
        this.api = api;
    }

    public EndpointConfiguration getSite() {
        return this.site;
    }

    public void setSite(EndpointConfiguration site) {
        this.site = site;
    }

}
