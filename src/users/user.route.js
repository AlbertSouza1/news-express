import { Router } from 'express';
import * as userController from '../users/user.controller.js';
import * as userMiddleware from './user.middleware.js';
import { validatePagination } from '../utils/pagination/pagination.middleware.js';

const userRoute = Router();

userRoute.get('/', validatePagination({defaultLimit: 10, maxLimit: 50}), userController.findAll);
userRoute.get('/:id', userMiddleware.validateUserExists, userController.findById);
userRoute.post(
    '/',
    userMiddleware.validateCreateFields,
    userController.createUser
);
userRoute.patch(
    '/:id',
    userMiddleware.validateUserExists,
    userMiddleware.validateUpdateFields,
    userController.updateUser
);

export default userRoute;