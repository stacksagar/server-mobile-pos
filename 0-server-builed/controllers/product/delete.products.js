"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const Product_1 = __importDefault(require("../../models/Product"));
async function deleteProducts(req, res) {
    const ids = req.body.ids || [];
    try {
        if (ids?.length < 1)
            throw new Error("Not found!");
        await Product_1.default.destroy({
            where: {
                id: ids,
            },
        });
        res.status(204).json({ message: "Products deleted!" });
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = deleteProducts;
