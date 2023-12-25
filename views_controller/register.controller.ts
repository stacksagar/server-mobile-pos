import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { create_refresh_token } from "../config/jwt";
import { roles } from "../config/roles";

function get(_req: Request, res: Response) {
  try {
    res.render("../views/pages/auth/register.ejs");
  } catch (error: any) {
    res.render("../views/pages/auth/register.ejs", { error: error?.message });
  }
}

async function post(req: Request, res: Response) {
  console.log("req.bod ", req.body);

  try {
    const { email, password } = req.body;
    const exist = await User.findOne({ where: { email } });
    if (exist) throw new Error("User already exist!");

    const hash = await bcrypt.hash(password, 9);

    const user = await User.create({
      ...req?.body,
      password: hash,
      role: roles.user,
    });

    const refresh_token = create_refresh_token({
      id: user.dataValues.id,
      role: user?.dataValues.role,
    });

    // @ts-ignore
    user.refresh_token = refresh_token;
    await user.save();

    res.cookie("jwt", refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 90,
    });

    res.redirect("/");
  } catch (error: any) {
    res.render("../views/pages/auth/register.ejs", {
      error: error?.message || "Something wrong!",
    });
  }
}

const registerController = { get, post };
export default registerController;
