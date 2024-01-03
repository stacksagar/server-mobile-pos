import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import Product from "../../models/Product";
import ProductCategory from "../../models/ProductCategory";
import SupplierHistory from "../../models/SupplierHistory";
import Supplier from "../../models/Supplier";
import { SupplierHistoryT } from "../../global.types";

export default async function addQuantityProduct(req: Request, res: Response) {
  const adminId = req?.body?.adminId;

  const { due_amount, paid_amount, quantity } = req?.body?.supplierInvoice;

  const supplierId = req?.body?.supplierId;
  const productId = req.body?.productId || 999999999999;
  const productData = req?.body?.productData;

  try {
    await Product.update(productData, { where: { id: productId } });

    const product = await Product.findOne({
      where: { id: productId },
      include: [
        {
          model: ProductCategory,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    if (!product?.dataValues?.id) throw new Error("Product Not Found");

    const supplier = await Supplier.findOne({ where: { id: supplierId } });

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

    const history = await SupplierHistory.create({
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
  } catch (error) {
    error_res(res, error);
  }
}
