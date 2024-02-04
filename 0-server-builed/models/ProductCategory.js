"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
const Product_1 = __importDefault(require("./Product"));
class ProductCategory extends sequelize_1.Model {
}
ProductCategory.init({
    name: {
        type: sequelize_1.DataTypes.STRING("40"),
        allowNull: false,
    },
    parentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    slug: {
        type: sequelize_1.DataTypes.STRING("60"),
        allowNull: false,
        unique: true,
    },
    icon: {
        type: sequelize_1.DataTypes.STRING("255"),
        allowNull: true,
    },
}, {
    tableName: "productcategories",
    sequelize: connection_1.default,
});
// Product with Category Relation
Product_1.default.belongsTo(ProductCategory, {
    foreignKey: "categoryId",
    as: "category",
});
exports.default = ProductCategory;
