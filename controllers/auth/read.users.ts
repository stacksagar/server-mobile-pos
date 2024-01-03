import { Request, Response } from "express";
import User from "../../models/User";
import error_res from "../../utils/error_res";

export default async function readUsers(_req: Request, res: Response) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    error_res(res, error);
  }
}
