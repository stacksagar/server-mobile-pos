"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const ProductCategory_1 = __importDefault(require("../../models/ProductCategory"));
const Product_1 = __importDefault(require("../../models/Product"));
async function returnProduct(req, res) {
    const id = req?.params?.id;
    const quantity = Number(req.body?.quantity || "1");
    try {
        const product = await Product_1.default.findOne({
            where: { id },
            include: [
                {
                    model: ProductCategory_1.default,
                    as: "category",
                    attributes: ["name"],
                },
            ],
        });
        const total_sale = product?.dataValues.total_sale || 0;
        const in_stock = product?.dataValues.in_stock || 0;
        // @ts-ignore
        product.total_sale = Math.max(total_sale - quantity, 0);
        // @ts-ignore
        product.in_stock = Math.max(in_stock + quantity, 0);
        await product?.save();
        res.status(200).json({ product });
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = returnProduct;
