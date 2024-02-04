"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const Product_1 = __importDefault(require("../../models/Product"));
const ProductCategory_1 = __importDefault(require("../../models/ProductCategory"));
const Brand_1 = __importDefault(require("../../models/Brand"));
async function readStockInAllProducts(req, res) {
    try {
        const products = await Product_1.default.findAll({
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
        res.json(products);
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = readStockInAllProducts;
