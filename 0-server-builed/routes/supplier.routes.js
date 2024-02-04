"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const Supplier_1 = __importDefault(require("../models/Supplier"));
const SupplierHistory_1 = __importDefault(require("../models/SupplierHistory"));
const Product_1 = __importDefault(require("../models/Product"));
const supplierRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(Supplier_1.default);
supplierRoutes.post("/", controllers.create.bind(controllers));
supplierRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
supplierRoutes.get("/all", (...all) => controllers.readAll(...all)());
supplierRoutes.get("/:id", (...all) => controllers.readSingle(...all)({
    include: [
        {
            model: SupplierHistory_1.default,
            as: "histories",
        },
        {
            model: Product_1.default,
        },
    ],
}));
supplierRoutes.put("/:id", controllers.update.bind(controllers));
supplierRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
supplierRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = supplierRoutes;
