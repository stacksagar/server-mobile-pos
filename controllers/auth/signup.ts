import { Request, Response } from "express";

export default function signupController(req: Request, res: Response) {
  res.status(200).json({ user: null });
}
