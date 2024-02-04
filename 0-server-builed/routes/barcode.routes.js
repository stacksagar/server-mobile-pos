"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const Product_1 = __importDefault(require("../models/Product"));
const Barcode_1 = __importDefault(require("../models/Barcode"));
const barcodeRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(Barcode_1.default);
barcodeRoutes.post("/", controllers.create.bind(controllers));
barcodeRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
barcodeRoutes.get("/all", (...all) => controllers.readAll(...all)({
    include: [
        {
            model: Product_1.default,
            as: "product",
        },
    ],
}));
barcodeRoutes.get("/by-supplier/:supplierId", (...all) => controllers.readAll(...all)({
    where: { supplierId: all[0].params.supplierId },
    include: [
        {
            model: Product_1.default,
            as: "product",
        },
    ],
}));
barcodeRoutes.get("/:id", (...all) => controllers.readSingle(...all)({
    include: [
        {
            model: Product_1.default,
            as: "product",
        },
    ],
}));
barcodeRoutes.put("/:id", controllers.update.bind(controllers));
barcodeRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
barcodeRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = barcodeRoutes;
