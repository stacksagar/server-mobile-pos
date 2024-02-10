"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const Supplier_1 = __importDefault(require("../models/Supplier"));
const User_1 = __importDefault(require("../models/User"));
const PaymentHistory_1 = __importDefault(require("../models/PaymentHistory"));
const paymentHistoryRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(PaymentHistory_1.default);
paymentHistoryRoutes.post("/", controllers.create.bind(controllers));
paymentHistoryRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
paymentHistoryRoutes.get("/all", (...all) => controllers.readAll(...all)({
    include: [
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
paymentHistoryRoutes.get("/by-supplier/:supplierId", (...all) => controllers.readAll(...all)({
    where: { supplierId: all[0].params.supplierId },
    include: [
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
paymentHistoryRoutes.get("/:id", (...all) => controllers.readSingle(...all)({
    include: [
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
paymentHistoryRoutes.put("/:id", controllers.update.bind(controllers));
paymentHistoryRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
paymentHistoryRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = paymentHistoryRoutes;
