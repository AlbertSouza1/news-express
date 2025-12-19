import { ApiResult } from "../utils/api.result.js";
import mongoose from "mongoose";

export const validateCreationFields = (req, res, next) => {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner)
        return res.status(400).send(ApiResult.error("Submit all fields to create a news."));

    next();
};

export const validateIdParameter = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send(ApiResult.error("Invalid id."));
    return next();
}