import { NextFunction, Request, Response } from "express";
import User from "../../models/User";

export default async function signupController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = User.create(req.body);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
}
