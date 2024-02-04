"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../config/jwt");
function get(_req, res) {
    try {
        res.render("../views/pages/auth/login.ejs");
    }
    catch (error) {
        res.render("../views/pages/auth/login.ejs", { error: error?.message });
    }
}
async function post(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ where: { email } });
        const matched = await bcrypt_1.default.compare(password, user?.dataValues.password || "empty");
        if (!user || !matched)
            throw new Error("Invalid Credentials!");
        const refresh_token = (0, jwt_1.create_refresh_token)({
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
    }
    catch (error) {
        res.render("../views/pages/auth/login.ejs", {
            error: error?.message || "Something wrong!",
        });
    }
}
const loginController = { get, post };
exports.default = loginController;
