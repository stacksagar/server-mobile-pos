import express from "express";
import ModelControllers from "../controllers/model.controllers";
import Tax from "../models/Tax";
const taxRoutes = express.Router();

const controllers = new ModelControllers(Tax);

taxRoutes.post("/", controllers.create.bind(controllers));

taxRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));

taxRoutes.get("/all", (...all) => controllers.readAll(...all)({}));

taxRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));

taxRoutes.put("/:id", controllers.update.bind(controllers));

taxRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));

taxRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));

export default taxRoutes;
