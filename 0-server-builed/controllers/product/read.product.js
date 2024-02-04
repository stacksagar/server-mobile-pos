"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const ProductCategory_1 = __importDefault(require("../../models/ProductCategory"));
const Product_1 = __importDefault(require("../../models/Product"));
const Supplier_1 = __importDefault(require("../../models/Supplier"));
const SupplierHistory_1 = __importDefault(require("../../models/SupplierHistory"));
const Brand_1 = __importDefault(require("../../models/Brand"));
async function readProduct(req, res) {
    try {
        const product = await Product_1.default.findOne({
            where: { id: req?.params?.id },
            include: [
                {
                    model: Supplier_1.default,
                },
                {
                    model: ProductCategory_1.default,
                    as: "category",
                },
                {
                    model: SupplierHistory_1.default,
                    as: "histories",
                },
                {
                    model: Brand_1.default,
                    as: "brand",
                },
            ],
        });
        res.status(201).json(product);
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = readProduct;
