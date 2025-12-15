import { ApiResult } from '../utils/api.result.js';
import * as authService from './auth.service.js';

export async function login(req, res) {

    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);

        if (!token) return res.status(401).send(ApiResult.error("Email or password invalid."))

        return res.status(200).send(ApiResult.success('', token));

    } catch (error) {
        console.log(error);
        return res.status(500).send(ApiResult.error("Internal server error."))
    }
}