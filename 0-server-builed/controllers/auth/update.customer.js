"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const error_res_1 = __importDefault(require("../../utils/error_res"));
async function updateCustomer(req, res) {
    const id = req?.params?.id;
    try {
        if (!id)
            throw Error("Not Found!");
        await User_1.default.update(req.body, {
            where: { is_customer: true, id },
        });
        const user = await User_1.default.findOne({ where: { id } });
        res.status(200).json(user);
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = updateCustomer;
