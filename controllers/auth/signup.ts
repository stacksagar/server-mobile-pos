import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import error_res from "../../utils/error_res";

export default async function signupController(req: Request, res: Response) {
  try {
    const user = User.create(req.body);
    res.status(200).json({ user });
  } catch (error) {
    error_res(res, error);
  }
}
