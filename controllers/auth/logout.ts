import { Request, Response } from "express";
import { create_access_token } from "../../config/jwt";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import error_res from "../../utils/error_res";

export default async function logoutController(req: Request, res: Response) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refresh_token = cookies?.jwt;

    const user = await User.findOne({ where: { refresh_token } });

    if (user) {
      // @ts-ignore
      user.refresh_token = "";
      await user.save();
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 90,
    });
    return res.sendStatus(204);
  } catch (error) {
    return error_res(res, error);
  }
}
