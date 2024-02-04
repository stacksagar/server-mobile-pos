"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const ProductCategory_1 = __importDefault(require("../../models/ProductCategory"));
const slug_generator_1 = __importDefault(require("../../utils/slug.generator"));
const Product_1 = __importDefault(require("../../models/Product"));
async function updateProduct(req, res) {
    const id = req?.params?.id;
    try {
        const data = { ...req.body };
        if (req.body?.name) {
            data.slug = (0, slug_generator_1.default)(req.body?.name);
        }
        await Product_1.default.update(data, {
            where: { id },
        });
        const updated = await Product_1.default.findOne({
            where: { id },
            include: [
                {
                    model: ProductCategory_1.default,
                    as: "category",
                    attributes: ["name"],
                },
            ],
        });
        res.status(200).json({ product: updated });
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = updateProduct;
