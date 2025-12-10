import * as userService from './user.service.js';
import { ApiResult } from '../utils/api.result.js';
import mongoose from 'mongoose';
import { validateAllFields, validateAtLeastOneFieldPassed } from './user-validator.js';

export async function findAll(req, res) {
    try {
        const users = await userService.findAll();
        if (users.length === 0)
            return res.status(404).send(ApiResult.error("No users found."));

        return res.status(200).send(ApiResult.success("", users));
    } catch (error) {
        console.log(error);
        res.status(500).send(ApiResult.error("Internal error."));
    }
}

export async function findById(req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send(ApiResult.error("Invalid id."))

        const user = await userService.findById(id);

        if (!user)
            return res.status(404).send(ApiResult.error("User not found."));

        return res.status(200).send(ApiResult.success("", user));

    } catch (error) {
        console.log(error);
        res.status(500).send(ApiResult.error("Internal error."));
    }
}

export async function createUser(req, res) {

    const body = req.body;

    try {

        if (!validateAllFields(body))
            return res.status(400).send(ApiResult.error('Submit all fields for registration.'));

        const user = await userService.create(body);

        if (!user) {
            return res.status(400).send(ApiResult.error("Error creating user."));
        }

        res.status(201).send(ApiResult.success(
            "User created successfully",
            {
                id: user._id,
                name,
                username,
                email,
                avatar,
                background
            }
        ));
    } catch (error) {
        res.status(500).send(ApiResult.error("Internal error."));
    }
}

export async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send(ApiResult.error("Invalid id."))

        if (!validateAtLeastOneFieldPassed(body))
            return res.status(400).send(ApiResult.error('Submit at least one field for update.'));

        const user = await userService.update(id, body);

        if (!user)
            return res.status(400).send(ApiResult.error("No user updated."));

        return res.status(200).send(ApiResult.success("User updated successfully.", user));

    } catch (error) {
        console.log(error);
        res.status(500).send(ApiResult.error("Internal error."));
    }
}