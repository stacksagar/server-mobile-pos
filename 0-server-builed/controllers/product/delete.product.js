"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const Product_1 = __importDefault(require("../../models/Product"));
async function deleteProduct(req, res) {
    try {
        const id = req?.params?.id;
        if (!id)
            throw new Error("Please provide unique id.");
        await Product_1.default.destroy({ where: { id } });
        res.status(204).json({ message: "Product deleted!" });
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = deleteProduct;
