"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const Product_1 = __importDefault(require("../../models/Product"));
const removeVariantsWithIMEIs_1 = __importDefault(require("../../utils/removeVariantsWithIMEIs"));
async function removeProductIMEIs(req, res) {
    const id = req?.params?.id;
    const imeis = req.body?.imei ? [req?.body?.imei] : req.body?.imeis || [];
    const quantity = imeis?.length || 0;
    try {
        const product = await Product_1.default.findOne({
            where: { id },
        });
        // @ts-ignore
        product.variants = (0, removeVariantsWithIMEIs_1.default)(imeis, 
        // @ts-ignore
        product?.variants);
        // @ts-ignore
        const total_sale = product?.dataValues.total_sale || 0;
        const in_stock = product?.dataValues.in_stock || 0;
        // @ts-ignore
        product.total_sale = total_sale + quantity;
        // @ts-ignore
        product.in_stock = Math.max(in_stock - quantity, 0);
        await product?.save();
        res.status(200).json(product);
    }
    catch (error) {
        console.log("ERROR ", error);
        (0, error_res_1.default)(res, error);
    }
}
exports.default = removeProductIMEIs;
