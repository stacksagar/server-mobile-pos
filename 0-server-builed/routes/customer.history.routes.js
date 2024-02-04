"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const User_1 = __importDefault(require("../models/User"));
const CustomerHistory_1 = __importDefault(require("../models/CustomerHistory"));
const sellHistoryRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(CustomerHistory_1.default);
sellHistoryRoutes.post("/", controllers.create.bind(controllers));
sellHistoryRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
sellHistoryRoutes.get("/all", (...all) => controllers.readAll(...all)({
    include: [
        {
            model: User_1.default,
            as: "user",
        },
    ],
}));
sellHistoryRoutes.get("/by-supplier/:supplierId", (...all) => controllers.readAll(...all)({
    where: { supplierId: all[0].params.supplierId },
    include: [
        {
            model: User_1.default,
            as: "user",
        },
    ],
}));
sellHistoryRoutes.get("/:id", (...all) => controllers.readSingle(...all)({
    include: [
        {
            model: User_1.default,
            as: "user",
        },
    ],
}));
sellHistoryRoutes.put("/:id", controllers.update.bind(controllers));
sellHistoryRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
sellHistoryRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = sellHistoryRoutes;
