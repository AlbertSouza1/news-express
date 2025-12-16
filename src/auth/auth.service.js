import { User } from "../users/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (email, password) => {

    const user = await User.findOne({ email: email }).select("+password");

    if(!user) return null;

    const loginSuccessfull = await bcrypt.compare(password, user.password);

    if(loginSuccessfull)
        return generateToken(user.id);

    return null;
}

const generateToken = (id) => {
    return jwt.sign( { userId: id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
}
