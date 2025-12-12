import { ApiResult } from '../utils/api.result.js';

export function validateLoginFields(req, res, next) {
    if(!req.body.email || !req.body.password)
        return res.status(400).send(ApiResult.error("Submit email and password to log in."));

    next();
}