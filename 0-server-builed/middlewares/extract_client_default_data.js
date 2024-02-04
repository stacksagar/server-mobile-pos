"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Setting_1 = __importDefault(require("../models/Setting"));
const ProductCategory_1 = __importDefault(require("../models/ProductCategory"));
const Page_1 = __importDefault(require("../models/Page"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function extract_client_default_data(req, res, next) {
    res.locals.data = null;
    res.locals.user = null;
    res.locals.cart = null;
    res.locals.error = null;
    res.locals.pages = null;
    res.locals.setting = null;
    res.locals.message = null;
    res.locals.success = null;
    res.locals.totalCarts = 0;
    res.locals.categories = [];
    res.locals.login_error = null;
    res.locals.register_error = null;
    res.locals.title = "Explore Our Products";
    res.locals.totalFavorites = JSON.parse(req.cookies?.favorites || "[]").length;
    // remove instant from cookies
    res.locals.error = req?.cookies?.error;
    res?.clearCookie("error");
    res.locals.message = req?.cookies?.message;
    res?.clearCookie("message");
    try {
        // @ts-ignore
        res.locals.setting = (await Setting_1.default.findOne())?.client;
        const categories = await ProductCategory_1.default.findAll({});
        res.locals.categories = categories;
        const pages = await Page_1.default.findAll({});
        res.locals.pages = pages;
        // User session
        const token = req.cookies.jwt;
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_TOKEN);
            const user = await User_1.default.findOne({ where: { id: decoded?.id } });
            // @ts-ignore
            req.user = user?.dataValues;
            res.locals.user = user?.dataValues;
        }
    }
    catch (error) {
    }
    finally {
        next();
    }
}
exports.default = extract_client_default_data;
