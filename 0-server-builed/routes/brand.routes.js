"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const Brand_1 = __importDefault(require("../models/Brand"));
const brandRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(Brand_1.default);
brandRoutes.post("/", controllers.create.bind(controllers));
brandRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
brandRoutes.get("/all", (...all) => controllers.readAll(...all)({}));
brandRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));
brandRoutes.put("/:id", controllers.update.bind(controllers));
brandRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
brandRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = brandRoutes;
