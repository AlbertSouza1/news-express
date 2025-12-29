import { Router } from "express";
import { verifyAuthentication } from "../auth/auth.middleware.js";
import * as newsController from "./news.controller.js";
import * as newsMiddleware from "./news.middleware.js";
import { validatePagination } from "../utils/pagination/pagination.middleware.js";

const route = Router();

route.post('/', verifyAuthentication, newsMiddleware.validateCreationFields, newsController.create);
route.get('/', validatePagination({ defaultLimit: 5, maxLimit: 50 }), newsController.findAll);
route.get('/top', newsController.topNews);
route.get('/search', verifyAuthentication, newsController.findByTitle);
route.get('/user/:id', verifyAuthentication, newsMiddleware.validateIdParameter, newsController.findUserNews);
route.get('/:id', verifyAuthentication, newsMiddleware.validateIdParameter, newsController.findById);
route.patch('/:id', verifyAuthentication, newsMiddleware.validateIdParameter, newsMiddleware.validateUpdateFields, newsController.updateNews);
route.delete('/:id', verifyAuthentication, newsMiddleware.validateIdParameter, newsController.deleteNews);

export default route;