import { Router } from "express";
import { verifyAuthentication } from "../auth/auth.middleware.js";
import * as newsController from "./news.controller.js";
import * as newsMiddleware from "./news.middleware.js";
import { validatePagination } from "../utils/pagination/pagination.middleware.js";

const newsRoute = Router();

newsRoute.post('/', verifyAuthentication, newsMiddleware.validateCreationFields, newsController.create);
newsRoute.get('/', validatePagination({ defaultLimit: 5, maxLimit: 50 }), newsController.findAll);
newsRoute.get('/top', newsController.topNews);
newsRoute.get('/search', verifyAuthentication, newsController.findByTitle);
newsRoute.get('/user/:id', verifyAuthentication, newsMiddleware.validateIdParameter, newsController.findUserNews);
newsRoute.get('/:id', verifyAuthentication, newsMiddleware.validateIdParameter, newsController.findById);
newsRoute.patch('/:id', verifyAuthentication, newsMiddleware.validateIdParameter, newsMiddleware.validateUpdateFields, newsController.updateNews);
newsRoute.delete('/:id', verifyAuthentication, newsMiddleware.validateIdParameter, newsController.deleteNews);

newsRoute.patch('/like/:id', verifyAuthentication, newsMiddleware.validateIdParameter, newsController.likeNews);
newsRoute.patch('/comment/:id', verifyAuthentication, newsMiddleware.validateIdParameter, newsController.addComment);
newsRoute.patch('/removeComment/:id/:commentId', verifyAuthentication, newsMiddleware.validateIdParameter, newsController.removeComment);

export default newsRoute;