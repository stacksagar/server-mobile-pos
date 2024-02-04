"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../models/Page"));
async function get(req, res) {
    const slug = req.params.slug;
    const page = await Page_1.default.findOne({ where: { slug } });
    res.render("../views/pages/dynamic_page/dynamic_page.ejs", { page });
}
const pageControllers = { get };
exports.default = pageControllers;
