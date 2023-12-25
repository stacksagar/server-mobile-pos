import { Request, Response } from "express";
import ProductCategory from "../models/ProductCategory";
import Product from "../models/Product";
import { Op } from "sequelize";

export default async function homeController(_req: Request, res: Response) {
  const latest_products = await Product.findAll({
    where: {
      in_stock: {
        [Op.gt]: 0,
      },
    },

    order: [["createdAt", "DESC"]],
    limit: 8,

    include: [{ model: ProductCategory, as: "category" }],
  });

  const popular_products = await Product.findAll({
    where: {
      in_stock: {
        [Op.gt]: 0,
      },
    },

    order: [["total_sale", "DESC"]],
    limit: 8,
    include: [{ model: ProductCategory, as: "category" }],
  });

  const offer_category = (await ProductCategory.findAll()).filter((c) =>
    c?.dataValues?.name?.toLowerCase()?.includes("offer")
  )[0];

  let offer_products: any[] = [];

  if (offer_category?.dataValues?.id) {
    offer_products = await Product.findAll({
      where: {
        in_stock: {
          [Op.gt]: 0,
        },
        categoryId: offer_category?.dataValues?.id,
      },

      order: [["total_sale", "DESC"]],
      limit: 8,
      include: [{ model: ProductCategory, as: "category" }],
    });
  }

  res.render("../views/pages/landing/landing.ejs", {
    latest_products,
    popular_products,
    offer_products,
  });
}
