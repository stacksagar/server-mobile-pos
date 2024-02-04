"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const model_filter_1 = __importDefault(require("../../utils/model.filter"));
const Product_1 = __importDefault(require("../../models/Product"));
const ProductCategory_1 = __importDefault(require("../../models/ProductCategory"));
const Brand_1 = __importDefault(require("../../models/Brand"));
async function readStockInProducts(req, res) {
    try {
        const { limit, page, offset } = (0, model_filter_1.default)(req, res);
        const products = await Product_1.default.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: ProductCategory_1.default,
                    as: "category",
                    attributes: ["name"],
                },
                {
                    model: Brand_1.default,
                    as: "brand",
                },
            ],
        });
        res.json({
            totalPages: Math.ceil(products.count / limit),
            totalItems: products.count,
            currentPage: page,
            products: products.rows,
            limit,
        });
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = readStockInProducts;
