import express from "express";
import ModelControllers from "../controllers/model.controllers";
import Supplier from "../models/Supplier";
import User from "../models/User";
import CustomerHistory from "../models/CustomerHistory";

const sellHistoryRoutes = express.Router();
const controllers = new ModelControllers(CustomerHistory);

sellHistoryRoutes.post("/", controllers.create.bind(controllers));
sellHistoryRoutes.get(
  "/all/bypages",
  controllers.readAllByPages.bind(controllers)
);

sellHistoryRoutes.get("/all", (...all) =>
  controllers.readAll(...all)({
    include: [
      {
        model: Supplier,
        as: "supplier",
      },
      {
        model: User,
        as: "user",
      },
    ],
  })
);

sellHistoryRoutes.get("/by-supplier/:supplierId", (...all) =>
  controllers.readAll(...all)({
    where: { supplierId: all[0].params.supplierId },
    include: [
      {
        model: Supplier,
        as: "supplier",
      },

      {
        model: User,
        as: "user",
      },
    ],
  })
);

sellHistoryRoutes.get("/:id", (...all) =>
  controllers.readSingle(...all)({
    include: [
      {
        model: Supplier,
        as: "supplier",
      },
      {
        model: User,
        as: "user",
      },
    ],
  })
);

sellHistoryRoutes.put("/:id", controllers.update.bind(controllers));

sellHistoryRoutes.delete(
  "/multiple",
  controllers.deleteMultiples.bind(controllers)
);

sellHistoryRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));

export default sellHistoryRoutes;
