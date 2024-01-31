import { Request, Response } from "express";
import Page from "../models/Page";

async function get(req: Request, res: Response) {
  const slug = req.params.slug;
  const page = await Page.findOne({ where: { slug } });
  res.render("../views/pages/dynamic_page/dynamic_page.ejs", { page });
}

const pageControllers = { get };
export default pageControllers;
