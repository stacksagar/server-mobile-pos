import express from "express";
import ModelControllers from "../controllers/model.controllers";
import SupplierHistory from "../models/SupplierHistory";
import Product from "../models/Product";
import Supplier from "../models/Supplier";
const supplierHistoryRoutes = express.Router();

const controllers = new ModelControllers(SupplierHistory);

supplierHistoryRoutes.post("/", controllers.create.bind(controllers));
supplierHistoryRoutes.get(
  "/all/bypages",
  controllers.readAllByPages.bind(controllers)
);

supplierHistoryRoutes.get("/all", controllers.readAll.bind(controllers));
supplierHistoryRoutes.get("/:id", (...all) =>
  controllers.readSingle(...all)({
    include: [
      {
        model: Product,
        as: "product",
      },
      {
        model: Supplier,
        as: "supplier",
      },
    ],
  })
);

supplierHistoryRoutes.put("/:id", controllers.update.bind(controllers));

supplierHistoryRoutes.delete(
  "/multiples",
  controllers.deleteMultiples.bind(controllers)
);

supplierHistoryRoutes.delete(
  "/:id",
  controllers.deleteSingle.bind(controllers)
);

export default supplierHistoryRoutes;
