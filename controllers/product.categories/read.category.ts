import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import ProductCategory from "../../models/ProductCategory";

export default function readProductCategory(req: Request, res: Response) {
  const id = req.body;
  try {
    const category = ProductCategory.findOne({ where: { id } });
    res.status(200).json(category);
  } catch (error) {
    error_res(res, error);
  }
}
