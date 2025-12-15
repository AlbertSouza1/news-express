import { Router } from "express";
import { verifyAuthentication } from "../auth/auth.middleware.js";
import * as newsController from "./news.controller.js";
import * as newsMiddleware from "./news.middleware.js";

const route = Router();

route.get('/', verifyAuthentication, newsController.findAll);
route.post('/', verifyAuthentication, newsMiddleware.validateCreationFields, newsController.create);

export default route;