import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import ProductCategory from "../../models/ProductCategory";
import Product from "../../models/Product";
import Supplier from "../../models/Supplier";

export default async function readProduct(req: Request, res: Response) {
  try {
    const product = await Product.findOne({
      where: { id: req?.params?.id },
      include: [
        {
          model: Supplier,
          as: "supplier",
        },
        {
          model: ProductCategory,
          as: "category",
        },
      ],
    });

    res.status(201).json(product);
  } catch (error) {
    error_res(res, error);
  }
}
