import express from "express";
import ModelControllers from "../controllers/model.controllers";
import Vat from "../models/Vat";
const vatRoutes = express.Router();

const controllers = new ModelControllers(Vat);

vatRoutes.post("/", controllers.create.bind(controllers));

vatRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));

vatRoutes.get("/all", (...all) => controllers.readAll(...all)({}));

vatRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));

vatRoutes.put("/:id", controllers.update.bind(controllers));

vatRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));

vatRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));

export default vatRoutes;
