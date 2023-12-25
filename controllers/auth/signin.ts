import { NextFunction, Request, Response } from "express";
import { create_access_token, create_refresh_token } from "../../config/jwt";
import bcrypt from "bcrypt";
import User from "../../models/User";
import error_res from "../../utils/error_res";

export default async function signinController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const matched = await bcrypt.compare(
      password,
      user?.dataValues?.password || "empty"
    );

    if (!user || !matched) throw new Error("Invalid Credentials!");

    const access_token = create_access_token({
      id: user?.dataValues.id,
      role: user?.dataValues.role,
    });

    const refresh_token = create_refresh_token({
      id: user.dataValues?.id,
      role: user.dataValues?.role,
    });

    // @ts-ignore
    user.refresh_token = refresh_token;
    await user.save();

    res.cookie("jwt", refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 90,
    });

    res.status(200).json({ access_token, user });
  } catch (error: any) {
    error_res(res, error);
  }
}
