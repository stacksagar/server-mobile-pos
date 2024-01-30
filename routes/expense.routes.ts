import express from "express";
import ModelControllers from "../controllers/model.controllers";
import Expense from "../models/Expense";
const expenseRoutes = express.Router();

const controllers = new ModelControllers(Expense);

expenseRoutes.post("/", controllers.create.bind(controllers));

expenseRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));

expenseRoutes.get("/all", (...all) => controllers.readAll(...all)({}));

expenseRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));

expenseRoutes.put("/:id", controllers.update.bind(controllers));

expenseRoutes.delete(
  "/multiple",
  controllers.deleteMultiples.bind(controllers)
);

expenseRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));

export default expenseRoutes;
