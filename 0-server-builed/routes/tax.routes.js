"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const Tax_1 = __importDefault(require("../models/Tax"));
const taxRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(Tax_1.default);
taxRoutes.post("/", controllers.create.bind(controllers));
taxRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
taxRoutes.get("/all", (...all) => controllers.readAll(...all)({}));
taxRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));
taxRoutes.put("/:id", controllers.update.bind(controllers));
taxRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
taxRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = taxRoutes;
