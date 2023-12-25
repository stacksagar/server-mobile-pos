import { NextFunction, Request, Response } from "express";
import ProductCategory from "../../models/ProductCategory";
import error_res from "../../utils/error_res";
import slugGenerator from "../../utils/slug.generator";

export default async function createCategory(req: Request, res: Response) {
  try {
    const exist = await ProductCategory.findOne({
      where: { name: req?.body?.name },
    });
    if (exist) throw new Error("Category already exist!");

    const newCategory = await ProductCategory.create({
      ...req.body,
      slug: slugGenerator(req?.body?.name),
    });

    res.status(201).json(newCategory);
  } catch (error) {
    return error_res(res, error);
  }
}
