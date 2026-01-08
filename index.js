import express from 'express';
import cors from 'cors';
import userRoute from './src/users/user.route.js';
import authRoute from './src/auth/auth.route.js';
import newsRoute from './src/news/news.route.js';
import swaggerRoute from './src/swagger/swagger.route.js';

import 'dotenv/config';
import { connectDatabase } from './src/database/db.js';

const app = express();
const port = process.env.PORT || 3000;

connectDatabase();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/doc", swaggerRoute);

app.listen(port);
