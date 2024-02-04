"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const ProductCategory_1 = __importDefault(require("../../models/ProductCategory"));
async function updateProductCategory(req, res) {
    const id = req.params?.id;
    try {
        if (!id)
            throw new Error("Not Found");
        await ProductCategory_1.default.update(req.body, { where: { id } });
        const updated = await ProductCategory_1.default.findOne({ where: { id } });
        res.status(200).json(updated);
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = updateProductCategory;
