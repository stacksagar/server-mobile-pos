"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const Product_1 = __importDefault(require("../../models/Product"));
const ProductCategory_1 = __importDefault(require("../../models/ProductCategory"));
const SupplierHistory_1 = __importDefault(require("../../models/SupplierHistory"));
const Supplier_1 = __importDefault(require("../../models/Supplier"));
async function addQuantityProduct(req, res) {
    const adminId = req?.body?.adminId;
    const { due_amount, paid_amount, quantity } = req?.body?.supplierInvoice;
    const supplierId = req?.body?.supplierId;
    const productId = req.body?.productId || 999999999999;
    const productData = req?.body?.productData;
    try {
        await Product_1.default.update(productData, { where: { id: productId } });
        const product = await Product_1.default.findOne({
            where: { id: productId },
            include: [
                {
                    model: ProductCategory_1.default,
                    as: "category",
                    attributes: ["name"],
                },
            ],
        });
        if (!product?.dataValues?.id)
            throw new Error("Product Not Found");
        const supplier = await Supplier_1.default.findOne({ where: { id: supplierId } });
        // @ts-ignore
        supplier.total_due = supplier?.dataValues.total_due + due_amount;
        // @ts-ignore
        supplier.total_paid = supplier?.dataValues?.total_paid + paid_amount;
        // @ts-ignore
        supplier.total_puchase_amount =
            supplier?.dataValues.total_puchase_amount + paid_amount + due_amount;
        await supplier?.save();
        // @ts-ignore
        // Create association with the single supplier
        supplierId && product.addSuppliers([supplierId]);
        const history = await SupplierHistory_1.default.create({
            due_amount,
            paid_amount,
            quantity,
            total_purchase_amount: Number(due_amount) + Number(paid_amount),
            productId: product.dataValues.id,
            supplierId,
            userId: adminId,
        });
        res.status(201).json({
            product,
            history,
            supplierInvoice: req.body?.supplierInvoice,
            supplierId,
            productId,
            productData,
        });
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = addQuantityProduct;
