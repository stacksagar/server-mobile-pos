import express from "express";
import ModelControllers from "../controllers/model.controllers";
import Discount from "../models/Discount";
const discountRoutes = express.Router();

const controllers = new ModelControllers(Discount);

discountRoutes.post("/", controllers.create.bind(controllers));

discountRoutes.get(
  "/all/bypages",
  controllers.readAllByPages.bind(controllers)
);

discountRoutes.get("/all", (...all) => controllers.readAll(...all)({}));

discountRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));

discountRoutes.put("/:id", controllers.update.bind(controllers));

discountRoutes.delete(
  "/multiple",
  controllers.deleteMultiples.bind(controllers)
);

discountRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));

export default discountRoutes;
