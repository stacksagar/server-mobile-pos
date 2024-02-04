"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const error_res_1 = __importDefault(require("../../utils/error_res"));
async function removeAmountCustomer(req, res) {
    const { due, paid } = req.body;
    const id = req?.params?.id;
    try {
        if (!id)
            throw Error("Not Found!");
        const user = await User_1.default.findOne({ where: { id } });
        if (!user?.dataValues?.id)
            throw Error("Not Found!");
        // @ts-ignore
        user.paid = (user.paid || 0) - (Number(paid) || 0) || 0;
        // @ts-ignore
        user.due = (user.due || 0) - (Number(due) || 0) || 0;
        await user.save();
        res.status(200).json(user);
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = removeAmountCustomer;
