import { Request, Response } from "express";
import User from "../../models/User";
import error_res from "../../utils/error_res";
import CustomerHistory from "../../models/CustomerHistory";

export default async function readCustomers(req: Request, res: Response) {
  try {
    const data = await User.findAll({
      where: { is_customer: true },

      include: [
        {
          model: CustomerHistory,
          as: "histories",
        },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    error_res(res, error);
  }
}
