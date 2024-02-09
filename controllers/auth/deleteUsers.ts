import { Request, Response } from "express";
import User from "../../models/User";
import error_res from "../../utils/error_res";

export default async function deleteUsers(req: Request, res: Response) {
  const ids: number[] = req.body?.ids || [];

  try {
    if (!ids || ids?.length < 1) return res.json({ message: "Not Found" });
    await User.destroy({ where: { id: ids } });
    res.status(204).json({ message: "items deleted!" });
  } catch (error) {
    return error_res(res, error);
  }
}
