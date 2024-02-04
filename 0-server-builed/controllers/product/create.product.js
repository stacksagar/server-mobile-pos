"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const slug_generator_1 = __importDefault(require("../../utils/slug.generator"));
const Product_1 = __importDefault(require("../../models/Product"));
const ProductCategory_1 = __importDefault(require("../../models/ProductCategory"));
const SupplierHistory_1 = __importDefault(require("../../models/SupplierHistory"));
async function createProduct(req, res) {
    const supplierInvoice = req?.body?.supplierInvoice || {};
    const supplierId = req?.body?.supplierId;
    const adminId = req?.body?.adminId;
    try {
        const newProduct = await Product_1.default.create({
            ...req.body,
            purchase_price: req.body?.purchase_price || 0,
            sale_price: req.body?.sale_price || 0,
            slug: (0, slug_generator_1.default)(req?.body?.name),
        });
        // @ts-ignore
        // Create association with the single supplier
        supplierId && newProduct.addSuppliers([supplierId]);
        await SupplierHistory_1.default.create({
            ...supplierInvoice,
            total_purchase_amount: Number(supplierInvoice?.due_amount) +
                Number(supplierInvoice?.paid_amount),
            productId: newProduct.dataValues.id,
            supplierId,
            userId: adminId,
        });
        const product = await Product_1.default.findOne({
            where: { id: newProduct.dataValues?.id },
            include: [
                {
                    model: ProductCategory_1.default,
                    as: "category",
                    attributes: ["name"],
                },
            ],
        });
        res.status(201).json(product);
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = createProduct;
