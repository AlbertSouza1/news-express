import express from 'express';
import { getUser, createUser, updateUser } from '../users/user.controller.js';

const userRoute = express.Router();

userRoute.get('/', getUser);
userRoute.post('/', createUser);
userRoute.put('/', updateUser);

export default userRoute;