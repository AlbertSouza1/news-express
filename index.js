import express from 'express';
import userRoute from './src/users/user.route.js'

const port = 3000;
const app = express();

app.use(express.json());

app.use("/users", userRoute);

app.listen(port);  