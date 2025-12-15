export class ApiResult {

    constructor(message, data = null) {
        this.message = message;
        this.data = data;
    }

    static success(message, data = null) {
        return new ApiResult(message, data);
    }

    static error(message) {
        return new ApiResult(message, null);
    }   
}

export const defaultInternalError = (res) => res.status(500).send(ApiResult.error("Internal server error."));