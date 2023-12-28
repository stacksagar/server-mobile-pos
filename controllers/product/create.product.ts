import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import slugGenerator from "../../utils/slug.generator";
import Product from "../../models/Product";
import ProductCategory from "../../models/ProductCategory";
import SupplierHistory from "../../models/SupplierHistory";

export default async function createProduct(req: Request, res: Response) {
  const supplierInvoice = req?.body?.supplierInvoice || {};
  try {
    const newProduct = await Product.create({
      ...req.body,
      purchase_price: req.body?.purchase_price || 0,
      sale_price: req.body?.sale_price || 0,
      slug: slugGenerator(req?.body?.name),
    });

    await SupplierHistory.create({
      ...supplierInvoice,
      supplierId: newProduct.dataValues.supplierId,
      productId: newProduct.dataValues.id,
      total_purchase_amount:
        Number(supplierInvoice?.due_amount) +
        Number(supplierInvoice?.paid_amount),
    });

    const product = await Product.findOne({
      where: { id: newProduct.dataValues?.id },
      include: [
        {
          model: ProductCategory,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    res.status(201).json(product);
  } catch (error) {
    error_res(res, error);
  }
}
