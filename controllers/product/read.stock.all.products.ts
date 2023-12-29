import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import modelFilter from "../../utils/model.filter";
import Product from "../../models/Product";
import ProductCategory from "../../models/ProductCategory";

export default async function readStockInAllProducts(
  req: Request,
  res: Response
) {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: ProductCategory,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    res.json(products);
  } catch (error) {
    error_res(res, error);
  }
}
