"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_controllers_1 = __importDefault(require("../controllers/model.controllers"));
const Page_1 = __importDefault(require("../models/Page"));
const pageRoutes = express_1.default.Router();
const controllers = new model_controllers_1.default(Page_1.default);
pageRoutes.post("/", controllers.create.bind(controllers));
pageRoutes.get("/all/bypages", controllers.readAllByPages.bind(controllers));
pageRoutes.get("/all", (...all) => controllers.readAll(...all)({}));
pageRoutes.get("/:id", (...all) => controllers.readSingle(...all)({}));
pageRoutes.put("/:id", controllers.update.bind(controllers));
pageRoutes.delete("/multiple", controllers.deleteMultiples.bind(controllers));
pageRoutes.delete("/:id", controllers.deleteSingle.bind(controllers));
exports.default = pageRoutes;
