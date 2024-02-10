"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
const Product_1 = __importDefault(require("./Product"));
class Brand extends sequelize_1.Model {
}
Brand.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING("40"),
        allowNull: false,
    },
}, {
    tableName: "brands",
    sequelize: connection_1.default,
});
// Product with Category Relation
Product_1.default.belongsTo(Brand, {
    foreignKey: "brandId",
    as: "brand",
});
exports.default = Brand;
