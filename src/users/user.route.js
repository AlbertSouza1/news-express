import express from 'express';
import { findAll, findById, createUser, updateUser } from '../users/user.controller.js';

const userRoute = express.Router();

userRoute.get('/', findAll);
userRoute.get('/:id', findById);
userRoute.post('/', createUser);
userRoute.patch('/:id', updateUser);

export default userRoute;