"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const Vat_1 = __importDefault(require("../models/Vat"));
const vatRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(Vat_1.default);
vatRoutes.post("/", controllers.create.bind(controllers));
vatRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
vatRoutes.get("/all", (...all) => controllers.readAll(...all)({}));
vatRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));
vatRoutes.put("/:id", controllers.update.bind(controllers));
vatRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
vatRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = vatRoutes;
