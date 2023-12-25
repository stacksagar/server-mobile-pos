import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import modelFilter from "../../utils/model.filter";
import Product from "../../models/Product";
import ProductCategory from "../../models/ProductCategory";

export default async function readStockOutProducts(
  req: Request,
  res: Response
) {
  try {
    const { offset, limit, page } = modelFilter(req, res);

    const products = await Product.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: ProductCategory,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    res.json({
      totalPages: Math.ceil(products.count / limit),
      totalItems: products.count,
      currentPage: page,
      products: products.rows,
      limit,
    });
  } catch (error) {
    error_res(res, error);
  }
}
