import express from 'express';
import { findAll, findById, createUser, updateUser } from '../users/user.controller.js';
import { validateUserExists, validateAllFields, validateAtLeastOneFieldPassed } from './user.middleware.js';

const userRoute = express.Router();

userRoute.get('/', findAll);
userRoute.get('/:id', validateUserExists, findById);
userRoute.post('/', validateAllFields, createUser);
userRoute.patch('/:id', validateUserExists, validateAtLeastOneFieldPassed, updateUser);

export default userRoute;