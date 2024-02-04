"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const Product_1 = __importDefault(require("../../models/Product"));
const returnVariant_1 = __importDefault(require("../../utils/returnVariant"));
async function returnProductIMEI(req, res) {
    const id = req?.params?.id;
    const properties = req.body?.properties || {};
    try {
        const product = await Product_1.default.findOne({
            where: { id },
        });
        // @ts-ignore
        product.variants = (0, returnVariant_1.default)(product?.variants, properties);
        const total_sale = product?.dataValues.total_sale || 0;
        const in_stock = product?.dataValues.in_stock || 0;
        // @ts-ignore
        product.total_sale = Math.max(total_sale - 1, 0);
        // @ts-ignore
        product.in_stock = in_stock + 1 || 0;
        await product?.save();
        res.status(200).json(product);
    }
    catch (error) {
        console.log("ERROR ", error);
        (0, error_res_1.default)(res, error);
    }
}
exports.default = returnProductIMEI;
