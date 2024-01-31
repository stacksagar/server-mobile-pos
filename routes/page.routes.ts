import express from "express";
import ModelControllers from "../controllers/model.controllers";
import Page from "../models/Page";
const pageRoutes = express.Router();

const controllers = new ModelControllers(Page);

pageRoutes.post("/", controllers.create.bind(controllers));

pageRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));

pageRoutes.get("/all", (...all) => controllers.readAll(...all)({}));

pageRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));

pageRoutes.put("/:id", controllers.update.bind(controllers));

pageRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));

pageRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));

export default pageRoutes;