package gr.helix.core.web.model.configuration;

public class WordPressConfiguration {

    private String            endpoint;

    private WordPressCategory categories[];

    public String getEndpoint() {
        return this.endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    public WordPressCategory[] getCategories() {
        return this.categories;
    }

    public void setCategories(WordPressCategory[] categories) {
        this.categories = categories;
    }

}
