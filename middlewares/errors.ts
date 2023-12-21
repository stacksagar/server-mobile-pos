import { Request, Response } from "express";

export function not_found(_req: Request, res: Response) {
  res.render(`../views/pages/not-found.ejs`);
}

export function error_response(error: any, _req: Request, res: Response) {
  if (error?.status)
    return res.status(error.status).json({
      message: error?.message,
    });

  if (error) return res.status(403).json({ message: error?.message || error });

  return res
    .status(500)
    .json({ message: `Error From Server, Please Contact with Developer!` });
}
