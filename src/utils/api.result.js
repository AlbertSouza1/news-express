export class ApiResult {

    constructor(message = String, data = any) {
        this.message = message;
        this.data = data;
    }

    static success(message = String, data = any) {
        return new ApiResult(message, data);
    }

    static error(message = String) {
        return new ApiResult(message, null);
    }
}