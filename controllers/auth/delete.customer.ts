import { Request, Response } from "express";
import User from "../../models/User";
import error_res from "../../utils/error_res";

export default async function deleteCustomer(req: Request, res: Response) {
  const id = req?.params?.id;
  try {
    if (!id) throw Error("Not Found!");

    await User.destroy({ where: { is_customer: true, id } });

    res.status(204).json({ message: "Customer deleted!" });
  } catch (error) {
    error_res(res, error);
  }
}
