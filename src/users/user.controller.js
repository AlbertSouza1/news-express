import * as userService from './user.service.js';
import { ApiResult } from '../utils/api.result.js';
import { UserResult } from './user.result.js';
import { buildPaginationInfo } from '../utils/pagination/pagination-info.js';

export async function findAll(req, res) {
    try {
        const { limit, page } = req.pagination;
        const { users, hasNext } = await userService.findAll(limit, page);

        const paginationInfo = buildPaginationInfo(req, hasNext);
        
        return res.status(200).send(ApiResult.success(users.map(user => UserResult.fromUserModel(user)), paginationInfo));

    } catch (error) {
        console.log(error);
        res.status(500).send(ApiResult.error("Internal error."));
    }
}

export async function findById(req, res) {
    try {
        return res.status(200).send(ApiResult.success(UserResult.fromUserModel(req.user)));
    } catch (error) {
        console.log(error);
        res.status(500).send(ApiResult.error("Internal error."));
    }
}

export async function createUser(req, res) {

    const body = req.body;

    try {
        const { createdUser, token } = await userService.create(body);
                
        if (!createdUser) return res.status(400).send(ApiResult.error("Error creating user."));

        const user = UserResult.fromUserModel(createdUser)
        res.status(201).send(ApiResult.success({token, user}));

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

        return res.status(200).send(ApiResult.success(UserResult.fromUserModel(user)));

    } catch (error) {
        console.log(error);
        res.status(500).send(ApiResult.error("Internal error."));
    }
}