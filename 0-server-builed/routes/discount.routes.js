"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const Discount_1 = __importDefault(require("../models/Discount"));
const discountRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(Discount_1.default);
discountRoutes.post("/", controllers.create.bind(controllers));
discountRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
discountRoutes.get("/all", (...all) => controllers.readAll(...all)({}));
discountRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));
discountRoutes.put("/:id", controllers.update.bind(controllers));
discountRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
discountRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = discountRoutes;
