import express from "express";
import ModelControllers from "../controllers/model.controllers";
import Sale from "../models/Sale";
import Product from "../models/Product";
import User from "../models/User";
const saleRoutes = express.Router();

const controllers = new ModelControllers(Sale);

saleRoutes.post("/", controllers.create.bind(controllers));

saleRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));

saleRoutes.get("/all", (...all) =>
  controllers.readAll(...all)({
    include: [
      {
        model: Product,
        as: "product",
      },
      {
        model: User,
        as: "customer",
      },
    ],
  })
);

saleRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));

saleRoutes.put("/:id", controllers.update.bind(controllers));

saleRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));

saleRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));

export default saleRoutes;
