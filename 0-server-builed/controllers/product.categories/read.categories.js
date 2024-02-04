"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductCategory_1 = __importDefault(require("../../models/ProductCategory"));
const model_filter_1 = __importDefault(require("../../utils/model.filter"));
const error_res_1 = __importDefault(require("../../utils/error_res"));
async function readProductCategories(req, res) {
    try {
        const { page, limit, offset } = (0, model_filter_1.default)(req, res);
        const categories = await ProductCategory_1.default.findAndCountAll({
            limit,
            offset,
        });
        res.json({
            totalPages: Math.ceil(categories.count / limit),
            totalItems: categories.count,
            currentPage: page,
            categories: categories.rows,
            limit,
        });
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = readProductCategories;
