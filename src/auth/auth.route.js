import { Router } from 'express';
import { login } from './auth.controller.js';
import { validateLoginFields } from './auth.middleware.js';

const authRoute = Router();

authRoute.post('/', validateLoginFields, login);

export default authRoute;