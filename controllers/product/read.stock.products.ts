import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import modelFilter from "../../utils/model.filter";
import Product from "../../models/Product";
import ProductCategory from "../../models/ProductCategory";
import Brand from "../../models/Brand";

export default async function readStockInProducts(req: Request, res: Response) {
  try {
    const { limit, page, offset } = modelFilter(req, res);

    const products = await Product.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: ProductCategory,
          as: "category",
          attributes: ["name"],
        },
        {
          model: Brand,
          as: "brand",
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
