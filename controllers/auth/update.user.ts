import { Request, Response } from "express";
import User from "../../models/User";
import error_res from "../../utils/error_res";
import bcrypt from "bcrypt";

export default async function updateUser(req: Request, res: Response) {
  const id = req?.params?.id;
  const { password } = req.body;

  try {
    if (!id) throw Error("Not Found!");

    const newData = {
      ...req.body,
    };

    if (password) {
      newData.password = await bcrypt.hash(password, 9);
    } else {
      delete newData.password;
    }

    await User.update(newData, {
      where: { id },
    });

    const user = await User.findOne({ where: { id } });

    res.status(200).json(user);
  } catch (error) {
    error_res(res, error);
  }
}
