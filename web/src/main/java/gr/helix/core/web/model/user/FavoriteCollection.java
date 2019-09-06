package gr.helix.core.web.model.user;

import java.time.ZonedDateTime;

public class FavoriteCollection {

    private final int           id;
    private final String        title;
    private final ZonedDateTime createdOn;
    private final ZonedDateTime updatedOn;
    private Integer[]           items = {};
    int                         datasetCounter;
    int                         publicationCounter;
    int                         notebookCounter;

    public FavoriteCollection(int id, String title, ZonedDateTime createdOn, ZonedDateTime updatedOn) {
        this.id = id;
        this.title = title;
        this.createdOn = createdOn;
        this.updatedOn = updatedOn;
    }

    public Integer[] getItems() {
        return this.items;
    }

    public void setItems(Integer[] items) {
        this.items = items;
    }

    public int getDatasetCounter() {
        return this.datasetCounter;
    }

    public void setDatasetCounter(int datasetCounter) {
        this.datasetCounter = datasetCounter;
    }

    public int getPublicationCounter() {
        return this.publicationCounter;
    }

    public void setPublicationCounter(int publicationCounter) {
        this.publicationCounter = publicationCounter;
    }

    public int getNotebookCounter() {
        return this.notebookCounter;
    }

    public void setNotebookCounter(int notebookCounter) {
        this.notebookCounter = notebookCounter;
    }

    public int getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public ZonedDateTime getCreatedOn() {
        return this.createdOn;
    }

    public ZonedDateTime getUpdatedOn() {
        return this.updatedOn;
    }

}
