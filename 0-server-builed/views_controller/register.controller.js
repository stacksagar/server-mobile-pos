"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../config/jwt");
const roles_1 = require("../config/roles");
function get(_req, res) {
    try {
        res.render("../views/pages/auth/register.ejs");
    }
    catch (error) {
        res.render("../views/pages/auth/register.ejs", { error: error?.message });
    }
}
async function post(req, res) {
    console.log("req.bod ", req.body);
    try {
        const { email, password } = req.body;
        const exist = await User_1.default.findOne({ where: { email } });
        if (exist)
            throw new Error("User already exist!");
        const hash = await bcrypt_1.default.hash(password, 9);
        const user = await User_1.default.create({
            ...req?.body,
            password: hash,
            role: roles_1.roles.user,
        });
        const refresh_token = (0, jwt_1.create_refresh_token)({
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
    }
    catch (error) {
        res.render("../views/pages/auth/register.ejs", {
            error: error?.message || "Something wrong!",
        });
    }
}
const registerController = { get, post };
exports.default = registerController;
