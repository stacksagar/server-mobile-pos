import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import Product from "../../models/Product";
import removeVariantsWithIMEIs from "../../utils/removeVariantsWithIMEIs";

export default async function returnProductIMEIs(req: Request, res: Response) {
  const id = req?.params?.id;
  const imeis = req.body?.imei ? [req?.body?.imei] : req.body?.imeis || [];
  const quantity = imeis?.length || 0;

  try {
    const product = await Product.findOne({
      where: { id },
    });

    // @ts-ignore
    product.variants = removeVariantsWithIMEIs(
      imeis,
      // @ts-ignore
      product?.variants
    );

    // @ts-ignore
    const total_sale = product?.dataValues.total_sale || 0;
    const in_stock = product?.dataValues.in_stock || 0;

    // @ts-ignore
    product.total_sale = total_sale + quantity;
    // @ts-ignore
    product.in_stock = Math.max(in_stock - quantity, 0);

    await product?.save();

    res.status(200).json(product);
  } catch (error) {
    console.log("ERROR ", error);
    error_res(res, error);
  }
}
