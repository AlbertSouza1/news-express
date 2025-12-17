import { ApiResult } from "../api.result.js";
import { PaginationDTO } from "./pagination.dto.js";

export function validatePagination(options = {}) {
    return (req, res, next) => {

        if (!options.defaultLimit || !options.maxLimit)
            return res.status(500).send("Internal server error. No pagination settings provided.");

        const result = validateLimitAndPage(req.query, options);

        if (!result.valid)
            return res.status(400).send(ApiResult.error(result.message));

        req.pagination = { limit: result.limit, page: result.page };
        next();
    }
}

const validateLimitAndPage = (query, options = {}) => {
    const { defaultLimit, maxLimit } = options;

    const defaultPage = 1;
    let { limit = defaultLimit, page = defaultPage } = query;
    console.log(query);

    limit = Number(limit);
    page = Number(page);

    if (Number.isNaN(limit) || Number.isNaN(page))
        return PaginationDTO.invalid("Invalid query parameters.");

    if (limit > Number(maxLimit))
        return PaginationDTO.invalid(`The limit parameter must be ${maxLimit} or lower.`);

    return PaginationDTO.valid(limit, page);
}