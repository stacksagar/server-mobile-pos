import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/User";
import { create_refresh_token } from "../config/jwt";

function get(_req: Request, res: Response) {
  try {
    res.render("../views/pages/auth/login.ejs");
  } catch (error: any) {
    res.render("../views/pages/auth/login.ejs", { error: error?.message });
  }
}

async function post(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const matched = await bcrypt.compare(
      password,
      user?.dataValues.password || "empty"
    );
    if (!user || !matched) throw new Error("Invalid Credentials!");

    const refresh_token = create_refresh_token({
      id: user.dataValues.id,
      role: user.dataValues?.role,
    });

    // @ts-ignore
    user.refresh_token = refresh_token;
    await user.save();

    res.cookie("jwt", refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 90,
    });

    console.log("user ", user);
    res.redirect("/");
  } catch (error: any) {
    res.render("../views/pages/auth/login.ejs", {
      error: error?.message || "Something wrong!",
    });
  }
}

const loginController = { get, post };
export default loginController;
