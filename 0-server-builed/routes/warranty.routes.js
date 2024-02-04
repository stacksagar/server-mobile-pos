"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const Warranty_1 = __importDefault(require("../models/Warranty"));
const ProductCategory_1 = __importDefault(require("../models/ProductCategory"));
const Product_1 = __importDefault(require("../models/Product"));
const User_1 = __importDefault(require("../models/User"));
const Brand_1 = __importDefault(require("../models/Brand"));
const warrantyRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(Warranty_1.default);
warrantyRoutes.post("/", controllers.create.bind(controllers));
warrantyRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
warrantyRoutes.get("/all", (...all) => controllers.readAll(...all)({
    include: [
        {
            model: ProductCategory_1.default,
            as: "category",
        },
        {
            model: Product_1.default,
            as: "product",
        },
        {
            model: User_1.default,
            as: "customer",
        },
        {
            model: Brand_1.default,
            as: "brand",
        },
    ],
}));
warrantyRoutes.get("/:id", (...all) => controllers.readSingle(...all)({
    include: [
        {
            model: ProductCategory_1.default,
            as: "category",
        },
        {
            model: Product_1.default,
            as: "product",
        },
        {
            model: User_1.default,
            as: "customer",
        },
        {
            model: Brand_1.default,
            as: "brand",
        },
    ],
}));
warrantyRoutes.put("/:id", controllers.update.bind(controllers));
warrantyRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
warrantyRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = warrantyRoutes;
