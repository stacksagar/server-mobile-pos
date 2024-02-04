"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const error_res_1 = __importDefault(require("../../utils/error_res"));
const bcrypt_1 = __importDefault(require("bcrypt"));
async function updateUser(req, res) {
    const id = req?.params?.id;
    const { password } = req.body;
    try {
        if (!id)
            throw Error("Not Found!");
        const newData = {
            ...req.body,
        };
        if (password) {
            newData.password = await bcrypt_1.default.hash(password, 9);
        }
        else {
            delete newData.password;
        }
        await User_1.default.update(newData, {
            where: { id },
        });
        const user = await User_1.default.findOne({ where: { id } });
        res.status(200).json(user);
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = updateUser;
