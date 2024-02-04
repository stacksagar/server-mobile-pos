"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../models/Product"));
const ProductCategory_1 = __importDefault(require("../models/ProductCategory"));
async function singleProduct(req, res) {
    const product = await Product_1.default.findOne({
        where: { slug: req.params?.slug },
        include: [{ model: ProductCategory_1.default, as: "category" }],
    });
    const categoryId = product?.dataValues?.categoryId;
    const related_products = await (await Product_1.default.findAll({ where: { categoryId }, limit: 4 })).filter((p) => p?.dataValues?.id !== product?.dataValues?.id);
    console.log("related_products ", related_products.length);
    res.render("./pages/items/item", { product, related_products, reviews: [] });
}
async function products(req, res) {
    const products = await Product_1.default.findAndCountAll({});
    res.render("./pages/items/items", {
        products: products.rows,
        category: {},
        totalPages: 1,
        totalItems: products.count,
        currentPage: 1,
        limit: 50,
    });
}
const productControllers = { singleProduct, products };
exports.default = productControllers;
