import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json" with { type: "json" };

const swaggerRoute = Router();

swaggerRoute.use("/", swaggerUI.serve);
swaggerRoute.get("/", swaggerUI.setup(swaggerDocument));

export default swaggerRoute;