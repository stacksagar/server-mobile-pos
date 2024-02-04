"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const ProductCategory_1 = __importDefault(require("../../models/ProductCategory"));
function readProductCategory(req, res) {
    const id = req.body;
    try {
        const category = ProductCategory_1.default.findOne({ where: { id } });
        res.status(200).json(category);
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = readProductCategory;
