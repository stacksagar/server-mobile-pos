import express from "express";
import ModelControllers from "../controllers/model.controllers";
import PaymentMethod from "../models/PaymentMethod";
const paymentMethodRoutes = express.Router();

const controllers = new ModelControllers(PaymentMethod);

paymentMethodRoutes.post("/", controllers.create.bind(controllers));

paymentMethodRoutes.get(
  "/all/bypages",
  controllers.readAllByPages.bind(controllers)
);

paymentMethodRoutes.get("/all", (...all) => controllers.readAll(...all)({}));

paymentMethodRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));

paymentMethodRoutes.put("/:id", controllers.update.bind(controllers));

paymentMethodRoutes.delete(
  "/multiple",
  controllers.deleteMultiples.bind(controllers)
);

paymentMethodRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));

export default paymentMethodRoutes;
