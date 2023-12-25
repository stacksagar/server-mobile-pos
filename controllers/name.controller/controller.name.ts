import { Request, Response } from "express";
import error_res from "../../utils/error_res";

export default function controller(req: Request, res: Response) {
  try {
  } catch (error) {
    return error_res(res, error);
  }
}
