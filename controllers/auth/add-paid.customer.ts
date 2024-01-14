import { Request, Response } from "express";
import User from "../../models/User";
import error_res from "../../utils/error_res";

export default async function addPaidCustomer(req: Request, res: Response) {
  const { paid } = req.body;
  const id = req?.params?.id;
  try {
    if (!id) throw Error("Not Found!");

    const user = await User.findOne({ where: { id } });
    if (!user?.dataValues?.id) throw Error("Not Found!");

    const new_paid = Number(paid) || 0;
    const due_amount = user.dataValues?.due || 0;

    // @ts-ignore
    user.paid = (user.paid || 0) + new_paid;

    // @ts-ignore
    user.due = new_paid > due_amount ? 0 : due_amount - new_paid;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    error_res(res, error);
  }
}
