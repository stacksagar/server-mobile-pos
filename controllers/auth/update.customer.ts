import { Request, Response } from "express";
import User from "../../models/User";
import error_res from "../../utils/error_res";

export default async function updateCustomer(req: Request, res: Response) {
  const id = req?.params?.id;
  try {
    if (!id) throw Error("Not Found!");

    await User.update(req.body, {
      where: { is_customer: true, id },
    });

    const user = await User.findOne({ where: { id } });

    res.status(200).json(user);
  } catch (error) {
    error_res(res, error);
  }
}
