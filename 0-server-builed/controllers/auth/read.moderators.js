"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const error_res_1 = __importDefault(require("../../utils/error_res"));
const Permission_1 = __importDefault(require("../../models/Permission"));
async function readModerators(_req, res) {
    try {
        const users = await (await User_1.default.findAll({
            include: [
                {
                    model: Permission_1.default,
                    as: "permission",
                },
            ],
        })).filter((user) => user.dataValues.role !== "user");
        res.status(200).json(users);
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = readModerators;
