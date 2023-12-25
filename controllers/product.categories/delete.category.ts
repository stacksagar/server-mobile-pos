import { Request, Response } from "express";
import ProductCategory from "../../models/ProductCategory";
import error_res from "../../utils/error_res";

export default function deleteProductCategory(req: Request, res: Response) {
  try {
    const id = req.params?.id;

    if (!id) throw new Error("Not found!");

    ProductCategory.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "category deleted" });
  } catch (error) {
    error_res(res, error);
  }
}
