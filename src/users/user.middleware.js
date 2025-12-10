import { ApiResult } from '../utils/api.result.js';
import mongoose from "mongoose";
import * as userService from '../users/user.service.js';

export const validateAllFields = (req, res, next) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background)
        return res.status(400).send(ApiResult.error('Submit all fields for registration.'));

    next();
}

export const validateAtLeastOneFieldPassed = (req, res, next) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background)
        return res.status(400).send(ApiResult.error('Submit at least one field for update.'));

    next();
}

export const validateUserExists = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send(ApiResult.error("Invalid id."));

    const user = await userService.findById(req.params.id);

    if (!user)
        return res.status(400).send(ApiResult.error("User not found."));

    req.id = req.params.id;
    req.user = user;

    next();
}