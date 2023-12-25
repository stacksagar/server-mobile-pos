import { Request, Response } from "express";
import ProductCategory from "../../models/ProductCategory";
import modelFilter from "../../utils/model.filter";
import error_res from "../../utils/error_res";

export default async function readProductCategories(
  req: Request,
  res: Response
) {
  try {
    const { page, limit, offset } = modelFilter(req, res);

    const categories = await ProductCategory.findAndCountAll({
      limit,
      offset,
    });

    res.json({
      totalPages: Math.ceil(categories.count / limit),
      totalItems: categories.count,
      currentPage: page,
      categories: categories.rows,
      limit,
    });
  } catch (error) {
    error_res(res, error);
  }
}
