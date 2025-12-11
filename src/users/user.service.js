import { User } from "./User.js";
import bycrypt from 'bcrypt';

export const findAll = async () => await User.find();
export const findById = async (id) => await User.findById(id);

export const create = async (body) => {
    const saltRounds = 10;
    const hashedPassword = await bycrypt.hash(body.password, saltRounds);

    body.password = hashedPassword;
    return await User.create(body);
}

export const update = async (id, body) => await User.findByIdAndUpdate(id, body, { new: true });