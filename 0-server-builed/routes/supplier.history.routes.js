"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const SupplierHistory_1 = __importDefault(require("../models/SupplierHistory"));
const Product_1 = __importDefault(require("../models/Product"));
const Supplier_1 = __importDefault(require("../models/Supplier"));
const User_1 = __importDefault(require("../models/User"));
const supplierHistoryRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(SupplierHistory_1.default);
supplierHistoryRoutes.post("/", controllers.create.bind(controllers));
supplierHistoryRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
supplierHistoryRoutes.get("/all", (...all) => controllers.readAll(...all)({
    include: [
        {
            model: Product_1.default,
            as: "product",
        },
        {
            model: Supplier_1.default,
            as: "supplier",
        },
        {
            model: User_1.default,
            as: "user",
        },
    ],
}));
supplierHistoryRoutes.get("/by-supplier/:supplierId", (...all) => controllers.readAll(...all)({
    where: { supplierId: all[0].params.supplierId },
    include: [
        {
            model: Supplier_1.default,
            as: "supplier",
        },
        {
            model: Product_1.default,
            as: "product",
        },
        {
            model: User_1.default,
            as: "user",
        },
    ],
}));
supplierHistoryRoutes.get("/:id", (...all) => controllers.readSingle(...all)({
    include: [
        {
            model: Product_1.default,
            as: "product",
        },
        {
            model: Supplier_1.default,
            as: "supplier",
        },
        {
            model: User_1.default,
            as: "user",
        },
    ],
}));
supplierHistoryRoutes.put("/:id", controllers.update.bind(controllers));
supplierHistoryRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
supplierHistoryRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = supplierHistoryRoutes;
