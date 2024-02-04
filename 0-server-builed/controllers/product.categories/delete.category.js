"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductCategory_1 = __importDefault(require("../../models/ProductCategory"));
const error_res_1 = __importDefault(require("../../utils/error_res"));
function deleteProductCategory(req, res) {
    try {
        const id = req.params?.id;
        if (!id)
            throw new Error("Not found!");
        ProductCategory_1.default.destroy({
            where: {
                id,
            },
        });
        res.status(200).json({ message: "category deleted" });
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = deleteProductCategory;
