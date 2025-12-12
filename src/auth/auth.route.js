import { Router } from 'express';
import { login } from './auth.controller.js';
import { validateLoginFields } from './auth.middleware.js';

const route = Router();

route.post('/', validateLoginFields, login);

export default route;