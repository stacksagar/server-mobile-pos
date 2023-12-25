import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import ProductCategory from "../../models/ProductCategory";
import slugGenerator from "../../utils/slug.generator";
import Product from "../../models/Product";

export default async function updateProduct(req: Request, res: Response) {
  const id = req?.params?.id;
  try {
    const data = { ...req.body };
    if (req.body?.name) {
      data.slug = slugGenerator(req.body?.name);
    }

    await Product.update(data, {
      where: { id },
    });
    const updated = await Product.findOne({
      where: { id },
      include: [
        {
          model: ProductCategory,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json({ product: updated });
  } catch (error) {
    error_res(res, error);
  }
}
