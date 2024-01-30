import express from "express";
import ModelControllers from "../controllers/model.controllers";
import Warranty from "../models/Warranty";
import ProductCategory from "../models/ProductCategory";
import Product from "../models/Product";
import User from "../models/User";
import Brand from "../models/Brand";
const warrantyRoutes = express.Router();

const controllers = new ModelControllers(Warranty);

warrantyRoutes.post("/", controllers.create.bind(controllers));

warrantyRoutes.get(
  "/all/bypages",
  controllers.readAllByPages.bind(controllers)
);

warrantyRoutes.get("/all", (...all) =>
  controllers.readAll(...all)({
    include: [
      {
        model: ProductCategory,
        as: "category",
      },
      {
        model: Product,
        as: "product",
      },
      {
        model: User,
        as: "customer",
      },
      {
        model: Brand,
        as: "brand",
      },
    ],
  })
);

warrantyRoutes.get("/:id", (...all) =>
  controllers.readSingle(...all)({
    include: [
      {
        model: ProductCategory,
        as: "category",
      },
      {
        model: Product,
        as: "product",
      },
      {
        model: User,
        as: "customer",
      },
      {
        model: Brand,
        as: "brand",
      },
    ],
  })
);

warrantyRoutes.put("/:id", controllers.update.bind(controllers));

warrantyRoutes.delete(
  "/multiple",
  controllers.deleteMultiples.bind(controllers)
);

warrantyRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));

export default warrantyRoutes;
