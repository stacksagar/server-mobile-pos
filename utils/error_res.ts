import { Response } from "express";

export default function error_res(res: Response, error: any) {
  res
    .status(400)
    .json({ message: typeof error === "string" ? error : error?.message });
}