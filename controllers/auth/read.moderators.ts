import { Request, Response } from "express";
import User from "../../models/User";
import error_res from "../../utils/error_res";
import Permission from "../../models/Permission";

export default async function readModerators(_req: Request, res: Response) {
  try {
    const users = await (
      await User.findAll({
        include: [
          {
            model: Permission,
            as: "permission",
          },
        ],
      })
    ).filter((user) => user.dataValues.role !== "user");

    res.status(200).json(users);
  } catch (error) {
    error_res(res, error);
  }
}
