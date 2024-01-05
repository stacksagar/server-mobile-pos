import express from "express";
import ModelControllers from "../controllers/model.controllers";
import Product from "../models/Product";
import Barcode from "../models/Barcode";
const barcodeRoutes = express.Router();

const controllers = new ModelControllers(Barcode);

barcodeRoutes.post("/", controllers.create.bind(controllers));
barcodeRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));

barcodeRoutes.get("/all", (...all) =>
  controllers.readAll(...all)({
    include: [
      {
        model: Product,
        as: "product",
      },
    ],
  })
);

barcodeRoutes.get("/by-supplier/:supplierId", (...all) =>
  controllers.readAll(...all)({
    where: { supplierId: all[0].params.supplierId },
    include: [
      {
        model: Product,
        as: "product",
      },
    ],
  })
);

barcodeRoutes.get("/:id", (...all) =>
  controllers.readSingle(...all)({
    include: [
      {
        model: Product,
        as: "product",
      },
    ],
  })
);

barcodeRoutes.put("/:id", controllers.update.bind(controllers));

barcodeRoutes.delete(
  "/multiple",
  controllers.deleteMultiples.bind(controllers)
);

barcodeRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));

export default barcodeRoutes;
