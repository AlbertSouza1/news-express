import { ApiResult, defaultInternalError } from '../utils/api.result.js';

export function validateLoginFields(req, res, next) {
    if (!req.body.email || !req.body.password)
        return res.status(400).send(ApiResult.error("Submit email and password to log in."));

    next();
}

export function verifyAuthentication(req, res, next) {

    try {
        const tokenHeader = req.headers.authorization;
        if (!tokenHeader) return res.status(401).send(ApiResult.error("No authentication token was provided."));

        const token = tokenHeader.split(' ')[1];

        next();

    } catch (error) {
        return defaultInternalError();
    }
}