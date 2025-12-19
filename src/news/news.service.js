import { News } from './News.js';
import { getSkipValue } from '../utils/db-skip-calculator.js';

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
export const latestNews = async () => await News.findOne().sort({ _id: -1 }).populate("user");
export const findById = async (id) => await News.findById(id);
export const findByTitle = async (title) => {
    return await News.find({ title: { $regex: `${title || ""}`, $options: "i" } })
        .sort({ _id: - 1 })
        .populate("user");
} 