"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const error_res_1 = __importDefault(require("../../utils/error_res"));
const bcrypt_1 = __importDefault(require("bcrypt"));
async function createUser(req, res) {
    const { password } = req.body;
    try {
        const hashed_password = await bcrypt_1.default.hash(password, 9);
        const data = await User_1.default.create({
            ...req.body,
            password: hashed_password,
            is_customer: false,
        });
        res.status(200).json(data);
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = createUser;
