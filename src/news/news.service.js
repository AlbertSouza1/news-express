import { News } from './News.js';

export const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    return await News.find().skip(skip).limit(limit);
};

export const create = async (body) => await News.create(body);
    