import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDatabase } from './src/database/db.js';
import router from './src/routers/index.js';

const app = express();

connectDatabase();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(router);

export default app;