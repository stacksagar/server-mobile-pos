import express from "express";
import ModelControllers from "../controllers/model.controllers";
import Brand from "../models/Brand";
const brandRoutes = express.Router();

const controllers = new ModelControllers(Brand);

brandRoutes.post("/", controllers.create.bind(controllers));

brandRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));

brandRoutes.get("/all", (...all) => controllers.readAll(...all)({}));

brandRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));

brandRoutes.put("/:id", controllers.update.bind(controllers));

brandRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));

brandRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));

export default brandRoutes;
