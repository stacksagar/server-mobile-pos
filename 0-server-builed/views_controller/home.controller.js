"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductCategory_1 = __importDefault(require("../models/ProductCategory"));
const Product_1 = __importDefault(require("../models/Product"));
const sequelize_1 = require("sequelize");
async function homeController(_req, res) {
    const latest_products = await Product_1.default.findAll({
        where: {
            in_stock: {
                [sequelize_1.Op.gt]: 0,
            },
        },
        order: [["createdAt", "DESC"]],
        limit: 8,
        include: [{ model: ProductCategory_1.default, as: "category" }],
    });
    const popular_products = await Product_1.default.findAll({
        where: {
            in_stock: {
                [sequelize_1.Op.gt]: 0,
            },
        },
        order: [["total_sale", "DESC"]],
        limit: 8,
        include: [{ model: ProductCategory_1.default, as: "category" }],
    });
    const offer_category = (await ProductCategory_1.default.findAll()).filter((c) => c?.dataValues?.name?.toLowerCase()?.includes("offer"))[0];
    let offer_products = [];
    if (offer_category?.dataValues?.id) {
        offer_products = await Product_1.default.findAll({
            where: {
                in_stock: {
                    [sequelize_1.Op.gt]: 0,
                },
                categoryId: offer_category?.dataValues?.id,
            },
            order: [["total_sale", "DESC"]],
            limit: 8,
            include: [{ model: ProductCategory_1.default, as: "category" }],
        });
    }
    res.render("../views/pages/landing/landing.ejs", {
        latest_products,
        popular_products,
        offer_products,
    });
}
exports.default = homeController;
