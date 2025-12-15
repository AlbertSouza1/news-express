import { ApiResult } from "../utils/api.result.js";

export const validateCreationFields = (req, res, next) => {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner)
        return res.status(400).send(ApiResult.error("Submit all fields to create a news."));

    next();
};