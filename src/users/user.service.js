import { User } from "./User.js";

export const findAll = async () => await User.find();
export const findById = async (id) => await User.findById(id);
export const create = async (body) => await User.create(body);
export const update = async (id, body) => await User.findByIdAndUpdate(id, body, { new: true });