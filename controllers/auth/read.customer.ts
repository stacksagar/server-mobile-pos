import { Request, Response } from "express";
import User from "../../models/User";
import error_res from "../../utils/error_res";

export default async function readCustomer(req: Request, res: Response) {
  const id = req?.params?.id;
  try {
    if (!id) throw Error("Not Found!");

    const data = await User.findOne({
      where: { is_customer: true, id },
    });

    if (!data) throw Error("Not Found!");

    res.status(200).json(data);
  } catch (error) {
    error_res(res, error);
  }
}
