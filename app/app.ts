import express from "express";
import { not_found, error_response } from "../middlewares/errors";
import middlewares from "../middlewares/middlewares";
import internalRoutes from "./internal.routes";
import externalRoutes from "./external.routes";

const app = express();

app.use(middlewares);
app.set("view engine", "ejs");

app.use(internalRoutes);
app.use("/api", externalRoutes);

app.use(not_found);
app.use(error_response);

export default app;
