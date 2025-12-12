import { User } from "../users/User.js";
import bcrypt from 'bcrypt';

export const login = async (email, password) => {

    const user = await User.findOne({ email: email }).select("+password");

    if(!user) return false;

    return await bcrypt.compare(password, user.password);
}