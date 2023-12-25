import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import Product from "../../models/Product";

export default async function deleteProduct(req: Request, res: Response) {
  try {
    const id = req?.params?.id;
    if (!id) throw new Error("Please provide unique id.");

    await Product.destroy({ where: { id } });

    res.status(204).json({ message: "Product deleted!" });
  } catch (error) {
    error_res(res, error);
  }
}
