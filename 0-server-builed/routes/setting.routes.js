"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const read_setting_1 = __importDefault(require("../controllers/setting.controller/read.setting"));
const update_setting_1 = __importDefault(require("../controllers/setting.controller/update.setting"));
const create_setting_1 = __importDefault(require("../controllers/setting.controller/create.setting"));
const settingRoutes = express_1.default.Router();
settingRoutes.post("/", create_setting_1.default);
settingRoutes.get("/", read_setting_1.default);
settingRoutes.put("/", update_setting_1.default);
exports.default = settingRoutes;
