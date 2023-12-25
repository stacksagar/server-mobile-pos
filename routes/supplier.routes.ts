import express from "express";
import ModelControllers from "../controllers/model.controllers";
import Supplier from "../models/Supplier";
import SupplierHistory from "../models/SupplierHistory";
const supplierRoutes = express.Router();

const controllers = new ModelControllers(Supplier);

supplierRoutes.post("/", controllers.create.bind(controllers));
supplierRoutes.get(
  "/all/bypages",
  controllers.readAllByPages.bind(controllers)
);

supplierRoutes.get("/all", controllers.readAll.bind(controllers));
supplierRoutes.get("/:id", (...all) =>
  controllers.readSingle(...all)({
    include: {
      model: SupplierHistory,
      as: "histories",
    },
  })
);

supplierRoutes.put("/:id", controllers.update.bind(controllers));

supplierRoutes.delete(
  "/multiples",
  controllers.deleteMultiples.bind(controllers)
);
supplierRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
export default supplierRoutes;
