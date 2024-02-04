"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const Expense_1 = __importDefault(require("../models/Expense"));
const expenseRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(Expense_1.default);
expenseRoutes.post("/", controllers.create.bind(controllers));
expenseRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
expenseRoutes.get("/all", (...all) => controllers.readAll(...all)({}));
expenseRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));
expenseRoutes.put("/:id", controllers.update.bind(controllers));
expenseRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
expenseRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = expenseRoutes;
