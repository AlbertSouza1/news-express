import { ApiResult, defaultInternalError } from '../utils/api.result.js';
import jwt from 'jsonwebtoken';

export function validateLoginFields(req, res, next) {
    if (!req.body.email || !req.body.password)
        return res.status(400).send(ApiResult.error("Submit email and password to log in."));

    next();
}

export function verifyAuthentication(req, res, next) {

    try {
        const token = extractToken(req);
        if (!token) return res.status(401).send("Invalid token.");

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) return res.status(401).send("Invalid token.");

            req.userId = decoded.userId;
            return next();
        });

    } catch (error) {
        console.log(error);
        return defaultInternalError(res);
    }
}

const extractToken = (req) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) return null;

    const parts = tokenHeader.split(' ');

    if (parts.length !== 2)  return null;

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) return null;
    
    return token
}