export class ApiResult {

    constructor(message, data = null, pagination = null) {
        this.message = message;
        this.pagination = pagination;
        this.data = data;
    }

    static success(message, data = null, pagination = null) {
        return new ApiResult(message, data, pagination);
    }

    static error(message) {
        return new ApiResult(message, null);
    }   
}

export const defaultInternalError = (res) => res.status(500).send(ApiResult.error("Internal server error."));