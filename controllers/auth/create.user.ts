import { Request, Response } from "express";
import User from "../../models/User";
import error_res from "../../utils/error_res";
import bcrypt from "bcrypt";

export default async function createUser(req: Request, res: Response) {
  const { password } = req.body;

  try {
    const hashed_password = await bcrypt.hash(password, 9);
    const data = await User.create({
      ...req.body,
      password: hashed_password,
      is_customer: false,
    });
    res.status(200).json(data);
  } catch (error) {
    error_res(res, error);
  }
}
