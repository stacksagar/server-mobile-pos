import { Request, Response } from "express";
import User from "../../models/User";
import error_res from "../../utils/error_res";

export default async function addAmountCustomer(req: Request, res: Response) {
  const { due, paid } = req.body;
  const id = req?.params?.id;
  try {
    if (!id) throw Error("Not Found!");

    const user = await User.findOne({ where: { id } });
    if (!user?.dataValues?.id) throw Error("Not Found!");

    // @ts-ignore
    user.paid = (user.paid || 0) + (Number(paid) || 0);
    // @ts-ignore
    user.due = (user.due || 0) + (Number(due) || 0);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    error_res(res, error);
  }
}
