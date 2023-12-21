import { Request, Response } from "express";

export default function homeController(_req: Request, res: Response) {
  res.render("./views/pages/not-found.ejs");
}
