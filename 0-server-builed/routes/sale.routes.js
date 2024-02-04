"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const Sale_1 = __importDefault(require("../models/Sale"));
const Product_1 = __importDefault(require("../models/Product"));
const User_1 = __importDefault(require("../models/User"));
const saleRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(Sale_1.default);
saleRoutes.post("/", controllers.create.bind(controllers));
saleRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
saleRoutes.get("/all", (...all) => controllers.readAll(...all)({
    include: [
        {
            model: Product_1.default,
            as: "product",
        },
        {
            model: User_1.default,
            as: "customer",
        },
    ],
}));
saleRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));
saleRoutes.put("/:id", controllers.update.bind(controllers));
saleRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
saleRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = saleRoutes;
