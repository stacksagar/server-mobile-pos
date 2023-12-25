import { NextFunction, Request, Response } from "express";
import Setting from "../models/Setting";
import ProductCategory from "../models/ProductCategory";
import Page from "../models/Page";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { UserT } from "../global.types";

export default async function extract_client_default_data(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.data = null;
  res.locals.user = null;
  res.locals.cart = null;
  res.locals.error = null;
  res.locals.pages = null;
  res.locals.setting = null;
  res.locals.message = null;
  res.locals.success = null;
  res.locals.totalCarts = 0;
  res.locals.categories = [];
  res.locals.login_error = null;
  res.locals.register_error = null;
  res.locals.title = "Explore Our Products";
  res.locals.totalFavorites = JSON.parse(req.cookies?.favorites || "[]").length;

  // remove instant from cookies
  res.locals.error = req?.cookies?.error;
  res?.clearCookie("error");
  res.locals.message = req?.cookies?.message;
  res?.clearCookie("message");

  try {
    // @ts-ignore
    res.locals.setting = (await Setting.findOne())?.client;

    const categories = await ProductCategory.findAll({});
    res.locals.categories = categories;
    const pages = await Page.findAll({});
    res.locals.pages = pages;

    // User session
    const token = req.cookies.jwt;
    if (token) {
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_REFRESH_TOKEN as string
      );

      const user = await User.findOne({ where: { id: decoded?.id } });
      // @ts-ignore
      req.user = user?.dataValues;
      res.locals.user = user?.dataValues;
    }
  } catch (error) {
  } finally {
    next();
  }
}
