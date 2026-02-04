import { User } from "./User.js";
import { getSkipValue } from "../utils/db-skip-calculator.js";
import * as authService from '../auth/auth.service.js';

export const findAll = async (limit, page) => {
    const data = await User.find()
        .skip(getSkipValue(limit, page))
        .limit(limit + 1)
        .lean();

    const hasNext = data.length > limit;
    return { users: data.slice(0, limit), hasNext };
}
export const findById = async (id) => await User.findById(id);
export const create = async (body) => {    
    const createdUser = await User.create(body);   
    if(!createdUser) return null;

    const { email, password } = body;
    const token = await authService.login(email, password);

    return { createdUser, token };
}

export const update = async (id, body) => await User.findByIdAndUpdate(id, body, { new: true });