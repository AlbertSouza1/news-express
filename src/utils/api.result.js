export class ApiResult {

    constructor({ message = null, data = null, pagination = null }) {
        this.message = message;
        this.pagination = pagination;
        this.data = data;
    }

    static success(data = null, pagination = null) {
        return new ApiResult({ message: "OK", data, pagination });
    }

    static error(message) {
        return new ApiResult({ message });
    }
}

export const defaultInternalError = (res) => res.status(500).send(ApiResult.error("Internal server error."));