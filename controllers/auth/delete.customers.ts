import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import User from "../../models/User";

export default async function deleteCustomers(req: Request, res: Response) {
  const ids = req.body.ids || [];

  try {
    if (ids?.length < 1) throw new Error("Not found!");

    await User.destroy({
      where: {
        is_customer: true,
        id: ids,
      },
    });

    res.status(204).json({ message: "Customers deleted!" });
  } catch (error) {
    error_res(res, error);
  }
}
