import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import ProductCategory from "../../models/ProductCategory";

export default async function updateProductCategory(
  req: Request,
  res: Response
) {
  const id = req.params?.id;
  try {
    if (!id) throw new Error("Not Found");

    await ProductCategory.update(req.body, { where: { id } });

    const updated = await ProductCategory.findOne({ where: { id } });

    res.status(200).json(updated);
  } catch (error) {
    error_res(res, error);
  }
}
