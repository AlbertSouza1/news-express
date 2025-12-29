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
        if (!topNews) return res.status(404).send(ApiResult.error("No news found."));

        return res.status(200).send(ApiResult.success(NewsResult.fromNewsModel(topNews)));
    } catch (error) {
        console.log(error);
        return defaultInternalError(res);
    }
}

export async function findById(req, res) {
    try {
        const id = req.params.id;
        const news = await newsService.findById(id);

        if (!news)
            return res.status(400).send(ApiResult.error("No news found for the provided id."));

        return res.status(200).send(ApiResult.success(NewsResult.fromNewsModel(news)));

    } catch (error) {
        console.log(error);
        return defaultInternalError(res);
    }
}

export async function findByTitle(req, res) {
    try {
        const { title } = req.query;
        const news = await newsService.findByTitle(title);

        if (!news || news.length === 0)
            return res.status(400).send(ApiResult.error("No news found for the provided search text."))

        return res.status(200).send(ApiResult.success(news.map(x => NewsResult.fromNewsModel(x))));

    } catch (error) {
        console.log(error);
        return defaultInternalError(res);
    }
}

export async function findUserNews(req, res) {
    try {
        const userId = req.params.id;
        const news = await newsService.findUserNews(userId);

        if (!news || news.length === 0)
            return res.status(400).send(ApiResult.error("No news found for this user."));

        return res.status(200).send(ApiResult.success(news.map(x => NewsResult.fromNewsModel(x))));

    } catch (error) {
        console.log(error);
        return defaultInternalError(res);
    }
}

export async function updateNews(req, res) {
    try {
        const { userId, body } = req;
        const id = req.params.id;

        const result = await newsService.update(id, userId, body);

        if (!result.success)
            return res.status(400).send(ApiResult.error(result.message));

        return res.status(200).send(ApiResult.success());

    } catch (error) {
        console.log(error);
        return defaultInternalError(res);
    }
}

export async function deleteNews(req, res) {
    try {
        const userId = req.userId;
        const id = req.params.id;

        const result = await newsService.deleteNews(id, userId);

        if(!result.success)
            return res.status(400).send(ApiResult.error(result.message));

        return res.status(200).send(ApiResult.success());

    } catch (error) {
        console.log(error);
        return defaultInternalError(res);
    }
}

export async function likeNews(req, res) {
    try {
        const userId = req.userId;
        const id = req.params.id;
        
        const result = await newsService.likeNews(id, userId);

        if(!result.success)
            return res.status(400).send(ApiResult.error(result.message));

        return res.status(200).send(ApiResult.success(result.data));

    } catch (error) {
        console.log(error);
        return defaultInternalError(res);
    }
}