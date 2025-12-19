import { Router } from "express";
import { verifyAuthentication } from "../auth/auth.middleware.js";
import * as newsController from "./news.controller.js";
import * as newsMiddleware from "./news.middleware.js";
import { validatePagination } from "../utils/pagination/pagination.middleware.js";

const route = Router();

route.get('/', verifyAuthentication, validatePagination({ defaultLimit: 5, maxLimit: 50 }), newsController.findAll);
route.post('/', verifyAuthentication, newsMiddleware.validateCreationFields, newsController.create);
route.get('/top', verifyAuthentication, newsController.topNews);
route.get('/:id', verifyAuthentication, newsMiddleware.validateIdParameter, newsController.findById);

export default route;