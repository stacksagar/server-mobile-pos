import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import ProductCategory from "../../models/ProductCategory";
import Product from "../../models/Product";

export default async function occurredSaleProduct(req: Request, res: Response) {
  const id = req?.params?.id;
  const quantity = Number(req.body?.quantity || "1");

  try {
    const product = await Product.findOne({
      where: { id },
      include: [
        {
          model: ProductCategory,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    const total_sale = product?.dataValues.total_sale || 0;
    const in_stock = product?.dataValues.in_stock || 0;

    // @ts-ignore
    product.total_sale = total_sale + quantity;
    // @ts-ignore
    product.in_stock = Math.max(in_stock - quantity, 0);

    await product?.save();

    res.status(200).json({ product });
  } catch (error) {
    error_res(res, error);
  }
}
