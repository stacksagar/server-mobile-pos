import express from "express";
import ModelControllers from "../controllers/model.controllers";
import ExpenseCategory from "../models/ExpenseCategory";
const expenseCategoryRoutes = express.Router();

const controllers = new ModelControllers(ExpenseCategory);

expenseCategoryRoutes.post("/", controllers.create.bind(controllers));

expenseCategoryRoutes.get(
  "/all/bypages",
  controllers.readAllByPages.bind(controllers)
);

expenseCategoryRoutes.get("/all", (...all) => controllers.readAll(...all)({}));

expenseCategoryRoutes.get("/:id", (...all) =>
  controllers.readSingle(...all)({})
);

expenseCategoryRoutes.put("/:id", controllers.update.bind(controllers));

expenseCategoryRoutes.delete(
  "/multiple",
  controllers.deleteMultiples.bind(controllers)
);

expenseCategoryRoutes.delete(
  "/:id",
  controllers.deleteSingle.bind(controllers)
);

export default expenseCategoryRoutes;
