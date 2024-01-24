import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import Product from "../../models/Product";
import returnVariant from "../../utils/returnVariant";

export default async function returnProductIMEI(req: Request, res: Response) {
  const id = req?.params?.id;
  const properties = req.body?.properties || {};

  try {
    const product = await Product.findOne({
      where: { id },
    });

    // @ts-ignore
    product.variants = returnVariant(product?.variants, properties);

    const total_sale = product?.dataValues.total_sale || 0;
    const in_stock = product?.dataValues.in_stock || 0;

    // @ts-ignore
    product.total_sale = Math.max(total_sale - 1, 0);
    // @ts-ignore
    product.in_stock = in_stock + 1 || 0;

    await product?.save();

    res.status(200).json(product);
  } catch (error) {
    console.log("ERROR ", error);
    error_res(res, error);
  }
}
