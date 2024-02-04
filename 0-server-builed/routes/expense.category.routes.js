"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const ExpenseCategory_1 = __importDefault(require("../models/ExpenseCategory"));
const expenseCategoryRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(ExpenseCategory_1.default);
expenseCategoryRoutes.post("/", controllers.create.bind(controllers));
expenseCategoryRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
expenseCategoryRoutes.get("/all", (...all) => controllers.readAll(...all)({}));
expenseCategoryRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));
expenseCategoryRoutes.put("/:id", controllers.update.bind(controllers));
expenseCategoryRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
expenseCategoryRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = expenseCategoryRoutes;
