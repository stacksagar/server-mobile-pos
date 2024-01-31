import { Request, Response } from "express";
import Page from "../models/Page";
import Product from "../models/Product";
import ProductCategory from "../models/ProductCategory";
import modelFilter from "../utils/model.filter";

async function singleProduct(req: Request, res: Response) {
  const product = await Product.findOne({
    where: { slug: req.params?.slug },
    include: [{ model: ProductCategory, as: "category" }],
  });

  const categoryId = product?.dataValues?.categoryId;

  const related_products = await (
    await Product.findAll({ where: { categoryId }, limit: 4 })
  ).filter((p) => p?.dataValues?.id !== product?.dataValues?.id);

  console.log("related_products ", related_products.length);
  res.render("./pages/items/item", { product, related_products, reviews: [] });
}

async function products(req: Request, res: Response) {
  const products = await Product.findAndCountAll({});

  res.render("./pages/items/items", {
    products: products.rows,

    category: {},
    totalPages: 1,
    totalItems: products.count,
    currentPage: 1,
    limit: 50,
  });
}

const productControllers = { singleProduct, products };
export default productControllers;
