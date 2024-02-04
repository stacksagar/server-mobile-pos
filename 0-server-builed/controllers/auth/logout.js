"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const error_res_1 = __importDefault(require("../../utils/error_res"));
async function logoutController(req, res) {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt)
            return res.sendStatus(204);
        const refresh_token = cookies?.jwt;
        const user = await User_1.default.findOne({ where: { refresh_token } });
        if (user) {
            // @ts-ignore
            user.refresh_token = "";
            await user.save();
        }
        res.clearCookie("jwt", {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 90,
        });
        return res.sendStatus(204);
    }
    catch (error) {
        return (0, error_res_1.default)(res, error);
    }
}
exports.default = logoutController;
