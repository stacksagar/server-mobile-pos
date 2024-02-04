"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../../config/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../models/User"));
const error_res_1 = __importDefault(require("../../utils/error_res"));
async function refreshController(req, res) {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt)
            return res.sendStatus(204);
        const refresh_token = cookies.jwt;
        const user = await User_1.default.findOne({ where: { refresh_token } });
        if (!user)
            return res.sendStatus(403);
        jsonwebtoken_1.default.verify(refresh_token, process.env.JWT_REFRESH_TOKEN, (error, decoded) => {
            if (error || user?.dataValues.id !== decoded?.id)
                return res.sendStatus(403);
            const access_token = (0, jwt_1.create_access_token)({
                id: user?.dataValues?.id,
                role: user?.dataValues?.role,
            });
            res.json({ user, access_token });
        });
    }
    catch (error) {
        return (0, error_res_1.default)(res, error);
    }
}
exports.default = refreshController;
