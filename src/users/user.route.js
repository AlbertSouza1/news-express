import { Router } from 'express';
import * as userController from '../users/user.controller.js';
import * as userMiddleware from './user.middleware.js';
import { validatePagination } from '../utils/pagination/pagination.middleware.js';
import { verifyAuthentication } from "../auth/auth.middleware.js";

const usersRoute = Router();

usersRoute.get('/', validatePagination({defaultLimit: 10, maxLimit: 50}), userController.findAll);
usersRoute.get('/logged', verifyAuthentication, userController.getLoggedUser);
usersRoute.get('/:id', userMiddleware.validateUserExists, verifyAuthentication, userController.findById);
usersRoute.post(
    '/',
    userMiddleware.validateCreateFields,
    userController.createUser
);
usersRoute.patch(
    '/:id',
    userMiddleware.validateUserExists,
    userMiddleware.validateUpdateFields,
    userController.updateUser
);

export default usersRoute;