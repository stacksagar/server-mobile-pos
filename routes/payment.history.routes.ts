import express from "express";
import ModelControllers from "../controllers/model.controllers";
import Supplier from "../models/Supplier";
import User from "../models/User";
import PaymentHistory from "../models/PaymentHistory";
const paymentHistoryRoutes = express.Router();

const controllers = new ModelControllers(PaymentHistory);

paymentHistoryRoutes.post("/", controllers.create.bind(controllers));
paymentHistoryRoutes.get(
  "/all/bypages",
  controllers.readAllByPages.bind(controllers)
);

paymentHistoryRoutes.get("/all", (...all) =>
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

paymentHistoryRoutes.get("/by-supplier/:supplierId", (...all) =>
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

paymentHistoryRoutes.get("/:id", (...all) =>
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

paymentHistoryRoutes.put("/:id", controllers.update.bind(controllers));

paymentHistoryRoutes.delete(
  "/multiple",
  controllers.deleteMultiples.bind(controllers)
);

paymentHistoryRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));

export default paymentHistoryRoutes;
