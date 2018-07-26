package gr.helix.core.web.model.ckan;

public class Response<T> {

    private boolean   success;

    private Result<T> result;

    public boolean isSuccess() {
        return this.success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Result<T> getResult() {
        return this.result;
    }

    public void setResult(Result<T> result) {
        this.result = result;
    }

}
