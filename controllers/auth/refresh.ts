import { Request, Response } from "express";
import { create_access_token } from "../../config/jwt";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import error_res from "../../utils/error_res";

export default async function refreshController(req: Request, res: Response) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);

    const refresh_token = cookies.jwt;
    const user = await User.findOne({ where: { refresh_token } });

    if (!user) return res.sendStatus(403);

    jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_TOKEN as string,
      (error: any, decoded: any) => {
        if (error || user?.dataValues.id !== decoded?.id)
          return res.sendStatus(403);

        const access_token = create_access_token({
          id: user?.dataValues?.id,
          role: user?.dataValues?.role,
        });

        res.json({ user, access_token });
      }
    );
  } catch (error) {
    return error_res(res, error);
  }
}
