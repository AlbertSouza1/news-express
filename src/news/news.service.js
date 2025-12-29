import { News } from './News.js';
import { getSkipValue } from '../utils/db-skip-calculator.js';
import { OperationResult } from '../utils/operation.result.js';

export const findAll = async (limit = 5, page = 1) => {
    const data = await News.find()
        .sort({ _id: -1 })
        .skip(getSkipValue(limit, page))
        .limit(limit + 1)
        .populate("user")
        .lean();

    const hasNext = data.length > limit;
    const news = data.slice(0, limit);
    return { news, hasNext };
};

export const create = async (body) => await News.create(body);
export const latestNews = async () => await News.findOne().sort({ _id: -1 }).populate("user").lean();
export const findById = async (id) => await News.findById(id).populate("user");
export const findByTitle = async (title) => {
    return await News.find({ title: { $regex: `${title || ""}`, $options: "i" } })
        .sort({ _id: - 1 })
        .populate("user")
        .lean();
}
export const findUserNews = async (userId) => {
    return await News.find({ user: userId })
        .sort({ _id: -1 })
        .populate("user");
}
export const update = async (id, userId, body) => {
    const news = await News.findById(id);

    if (!news)
        return OperationResult.error("No news found for the provided id.");

    if (!news.user.equals(userId))
        return OperationResult.error("Users can only update their own news.");

    const { title, text, banner } = body;
    const data = await News.updateOne({ _id: id }, { title, text, banner });
    if (!data) return OperationResult.error("Failed to update news.");

    return OperationResult.success();
}

export const deleteNews = async (id, userId) => {
    const news = await News.findById(id);

    if(!news)
        return OperationResult.error("No news found for the provided id.");

    if(!news.user.equals(userId))
        return OperationResult.error("Users can only delete their own news.");

    const result = await News.deleteOne({ _id: id });

    if(!result)
        return OperationResult.error("Failed to delete news.");

    return OperationResult.success();
}