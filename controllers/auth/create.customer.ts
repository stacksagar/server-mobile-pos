import { Request, Response } from "express";
import User from "../../models/User";
import error_res from "../../utils/error_res";

export default async function createCustomer(req: Request, res: Response) {
  try {
    const data = await User.create({ ...req.body, is_customer: true });
    res.status(200).json(data);
  } catch (error) {
    console.log("ERROR ", error);
    error_res(res, error);
  }
}
