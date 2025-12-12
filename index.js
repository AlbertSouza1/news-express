import express from 'express';
import userRoute from './src/users/user.route.js';
import authRoute from './src/auth/auth.route.js';
import 'dotenv/config';
import { connectDatabase } from './src/database/db.js';

const app = express();
const port = process.env.PORT || 3000;

connectDatabase();

app.use(express.json());

app.use("/users", userRoute);
app.use("/auth", authRoute);

app.listen(port);
