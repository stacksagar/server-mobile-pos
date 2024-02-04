"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductCategory_1 = __importDefault(require("../../models/ProductCategory"));
const error_res_1 = __importDefault(require("../../utils/error_res"));
const slug_generator_1 = __importDefault(require("../../utils/slug.generator"));
async function createCategory(req, res) {
    try {
        const exist = await ProductCategory_1.default.findOne({
            where: { name: req?.body?.name },
        });
        if (exist)
            throw new Error("Category already exist!");
        const newCategory = await ProductCategory_1.default.create({
            ...req.body,
            slug: (0, slug_generator_1.default)(req?.body?.name),
        });
        res.status(201).json(newCategory);
    }
    catch (error) {
        return (0, error_res_1.default)(res, error);
    }
}
exports.default = createCategory;
