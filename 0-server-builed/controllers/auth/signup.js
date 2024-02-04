"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const error_res_1 = __importDefault(require("../../utils/error_res"));
async function signupController(req, res) {
    try {
        const user = User_1.default.create(req.body);
        res.status(200).json({ user });
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = signupController;