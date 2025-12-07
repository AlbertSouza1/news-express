import express from 'express';
import userRoute from './src/users/user.route.js'
import 'dotenv/config';
import { connectDatabase } from './src/database/db.js';

const app = express();
const port = 3000;

connectDatabase();

app.use(express.json());

app.use("/users", userRoute);

app.listen(port);  