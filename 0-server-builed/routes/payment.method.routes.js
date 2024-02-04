"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const PaymentMethod_1 = __importDefault(require("../models/PaymentMethod"));
const paymentMethodRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(PaymentMethod_1.default);
paymentMethodRoutes.post("/", controllers.create.bind(controllers));
paymentMethodRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
paymentMethodRoutes.get("/all", (...all) => controllers.readAll(...all)({}));
paymentMethodRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));
paymentMethodRoutes.put("/:id", controllers.update.bind(controllers));
paymentMethodRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
paymentMethodRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = paymentMethodRoutes;
