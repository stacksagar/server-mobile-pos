"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const error_res_1 = __importDefault(require("../../utils/error_res"));
async function deleteUsers(req, res) {
    const ids = req.body?.ids || [];
    try {
        if (!ids || ids?.length < 1)
            return res.json({ message: "Not Found" });
        await User_1.default.destroy({ where: { id: ids } });
        res.status(204).json({ message: "items deleted!" });
    }
    catch (error) {
        return (0, error_res_1.default)(res, error);
    }
}
exports.default = deleteUsers;
