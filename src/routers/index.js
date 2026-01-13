import { Router } from 'express';
import usersRoute from '../users/user.route.js';
import authRoute from '../auth/auth.route.js';
import newsRoute from '../news/news.route.js';
import swaggerRoute from '../swagger/swagger.route.js';

const router = Router();

router.use("/users", usersRoute);
router.use("/auth", authRoute);
router.use("/news", newsRoute);
router.use("/doc", swaggerRoute);

export default router;