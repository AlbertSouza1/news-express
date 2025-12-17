import { ApiResult, defaultInternalError } from '../utils/api.result.js';
import { NewsResult } from './news.result.js';
import * as newsService from './news.service.js';

export async function findAll(req, res) {
    try {
        const { limit, page } = req.pagination;
        const news = await newsService.findAll(limit, page);

        return res.status(200).send(ApiResult.success('', news));
        
    } catch (error) {
        console.log(error);
        return defaultInternalError(res);
    }
}

export async function create(req, res) {
    try {
        const news = await newsService.create({
            ...req.body,
            user: req.userId
        });

        if (!news)
            return res.status(400).send("Error creating news.");

        return res.status(200).send(ApiResult.success('', NewsResult.fromNewsModel(news)));

    } catch (error) {
        console.log(error);
        return defaultInternalError(res);
    }
}