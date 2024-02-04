"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const Setting_1 = __importDefault(require("../../models/Setting"));
async function createSetting(req, res) {
    try {
        const setting = await Setting_1.default.create(req.body);
        res.status(201).json({ setting });
    }
    catch (error) {
        return (0, error_res_1.default)(res, error);
    }
}
exports.default = createSetting;
