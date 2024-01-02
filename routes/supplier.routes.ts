import express from "express";
import ModelControllers from "../controllers/model.controllers";
import Supplier from "../models/Supplier";
import SupplierHistory from "../models/SupplierHistory";
import Product from "../models/Product";
const supplierRoutes = express.Router();

const controllers = new ModelControllers(Supplier);

supplierRoutes.post("/", controllers.create.bind(controllers));
supplierRoutes.get(
  "/all/bypages",
  controllers.readAllByPages.bind(controllers)
);

supplierRoutes.get("/all", (...all) => controllers.readAll(...all)());
supplierRoutes.get("/:id", (...all) =>
  controllers.readSingle(...all)({
    include: [
      {
        model: SupplierHistory,
        as: "histories",
      },

      {
        model: Product,
      },
    ],
  })
);

supplierRoutes.put("/:id", controllers.update.bind(controllers));

supplierRoutes.delete(
  "/multiples",
  controllers.deleteMultiples.bind(controllers)
);
supplierRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
export default supplierRoutes;
