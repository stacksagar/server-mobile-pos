import { NextFunction, Request, Response } from "express";
import User from "../../models/User";

export default async function readUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}
