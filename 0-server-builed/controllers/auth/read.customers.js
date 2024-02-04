"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const error_res_1 = __importDefault(require("../../utils/error_res"));
const CustomerHistory_1 = __importDefault(require("../../models/CustomerHistory"));
async function readCustomers(req, res) {
    try {
        const data = await User_1.default.findAll({
            where: { is_customer: true },
            include: [
                {
                    model: CustomerHistory_1.default,
                    as: "histories",
                },
            ],
        });
        res.status(200).json(data);
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = readCustomers;
