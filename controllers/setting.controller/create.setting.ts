import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import Setting from "../../models/Setting";

export default async function createSetting(req: Request, res: Response) {
  try {
    const setting = await Setting.create(req.body);
    res.status(201).json({ setting });
  } catch (error) {
    return error_res(res, error);
  }
}
