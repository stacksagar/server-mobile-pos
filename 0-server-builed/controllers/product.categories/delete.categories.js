"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductCategory_1 = __importDefault(require("../../models/ProductCategory"));
const error_res_1 = __importDefault(require("../../utils/error_res"));
async function deleteProductCategories(req, res) {
    try {
        const ids = req.body?.ids || [];
        if (ids?.length < 1)
            throw new Error("Not found!");
        ProductCategory_1.default.destroy({
            where: {
                id: ids,
            },
        });
        res.status(200).json({ message: "deleted" });
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = deleteProductCategories;
