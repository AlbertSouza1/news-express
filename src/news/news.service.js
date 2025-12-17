import { News } from './News.js';
import { getSkipValue } from '../utils/db-skip-calculator.js';

export const findAll = async (limit = 5, page = 1) => {   
    return await News.find()
        .sort({ _id: -1 })
        .skip(getSkipValue(limit, page))
        .limit(limit)
        .populate("user")
        .lean();
};

export const create = async (body) => await News.create(body);