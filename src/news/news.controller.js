import { ApiResult, defaultInternalError } from '../utils/api.result.js';
import { NewsResult } from './news.result.js';
import * as newsService from './news.service.js';
import { buildPaginationInfo } from '../utils/pagination/pagination-info.js';

export async function findAll(req, res) {
    try {
        const { limit, page } = req.pagination;
        const { news, hasNext } = await newsService.findAll(limit, page);

        const paginationInfo = buildPaginationInfo(req, hasNext);

        return res.status(200).send(
            ApiResult.success(news.map(x => NewsResult.fromNewsModel(x)), paginationInfo)
        );

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

        return res.status(200).send(ApiResult.success(NewsResult.fromNewsModel(news)));

    } catch (error) {
        console.log(error);
        return defaultInternalError(res);
    }
}

export async function topNews(req, res) {
    try {
        const topNews = await newsService.latestNews();
        if(!topNews) return res.status(404).send(ApiResult.error("No news found."));

        return res.status(200).send(ApiResult.success(NewsResult.fromNewsModel(topNews)));
    } catch (error) {
        console.log(error);
        return defaultInternalError(res);
    }
}