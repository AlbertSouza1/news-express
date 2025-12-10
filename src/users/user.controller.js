import * as userService from './user.service.js';
import { ApiResult } from '../utils/api.result.js';
import { UserResult } from './user.result.js';

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
        return res.status(200).send(ApiResult.success(
            "",
            new UserResult(
                req.id,
                req.user.name,
                req.user.username,
                req.user.email,
                req.user.avatar,
                req.user.background
            )
        ));

    } catch (error) {
        console.log(error);
        res.status(500).send(ApiResult.error("Internal error."));
    }
}

export async function createUser(req, res) {

    const body = req.body;

    try {

        const user = await userService.create(body);

        if (!user) {
            return res.status(400).send(ApiResult.error("Error creating user."));
        }

        res.status(201).send(ApiResult.success(
            "User created successfully",
            new UserResult(
                user._id,
                user.name,
                user.username,
                user.email,
                user.avatar,
                user.background
            )
        ));
    } catch (error) {
        res.status(500).send(ApiResult.error("Internal error."));
    }
}

export async function updateUser(req, res) {
    try {
        const body = req.body;
        const user = await userService.update(req.id, body);

        if (!user)
            return res.status(400).send(ApiResult.error("No user updated."));
        
        return res.status(200).send(ApiResult.success(
            "User updated successfully.",
            new UserResult(
                user._id,
                user.name,
                user.username,
                user.email,
                user.avatar,
                user.background
            )
        ));

    } catch (error) {
        console.log(error);
        res.status(500).send(ApiResult.error("Internal error."));
    }
}