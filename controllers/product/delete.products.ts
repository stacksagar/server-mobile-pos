import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import Product from "../../models/Product";

export default async function deleteProducts(req: Request, res: Response) {
  const ids = req.body.ids || [];
  try {
    if (ids?.length < 1) throw new Error("Not found!");

    await Product.destroy({
      where: {
        id: ids,
      },
    });

    res.status(204).json({ message: "Products deleted!" });
  } catch (error) {
    error_res(res, error);
  }
}
