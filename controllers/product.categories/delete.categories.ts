import { Request, Response } from "express";
import ProductCategory from "../../models/ProductCategory";
import error_res from "../../utils/error_res";

export default async function deleteProductCategories(
  req: Request,
  res: Response
) {
  try {
    const ids = req.body?.ids || [];

    if (ids?.length < 1) throw new Error("Not found!");

    ProductCategory.destroy({
      where: {
        id: ids,
      },
    });

    res.status(200).json({ message: "deleted" });
  } catch (error) {
    error_res(res, error);
  }
}
