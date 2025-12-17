export class PaginationDTO {
    constructor(valid, limit, page, message = "") {
        this.valid = valid;
        this.limit = limit;
        this.page = page;
        this.message = message;
    }

    static invalid(message) {
        return new PaginationDTO(false, 0, 0, message);
    }

    static valid(limit, page) {
        return new PaginationDTO(true, limit, page);
    }
}