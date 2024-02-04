"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
const Product_1 = __importDefault(require("./Product"));
const ProductCategory_1 = __importDefault(require("./ProductCategory"));
const User_1 = __importDefault(require("./User"));
const Brand_1 = __importDefault(require("./Brand"));
const getParseIntoJSON_1 = __importDefault(require("../utils/getParseIntoJSON"));
const setStringifyJSON_1 = __importDefault(require("../utils/setStringifyJSON"));
class Warranty extends sequelize_1.Model {
}
Warranty.init({
    receive_date: {
        type: sequelize_1.DataTypes.STRING("255"),
        allowNull: true,
        defaultValue: "01-01-2024",
    },
    delivery_date: {
        type: sequelize_1.DataTypes.STRING("255"),
        allowNull: true,
        defaultValue: "12-12-2024",
    },
    delivery_fee: { type: sequelize_1.DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    warranty_fee: { type: sequelize_1.DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    advance_amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    due_amount: { type: sequelize_1.DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    description: { type: sequelize_1.DataTypes.STRING("255"), allowNull: true },
    variant: {
        type: sequelize_1.DataTypes.TEXT("long"),
        get: (0, getParseIntoJSON_1.default)("variant"),
        set: (0, setStringifyJSON_1.default)("variant"),
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("courier", "received", "delivery", "success"),
        defaultValue: "received",
    },
}, {
    tableName: "warranties",
    sequelize: connection_1.default,
});
Warranty.belongsTo(Product_1.default, { foreignKey: "productId", as: "product" });
Warranty.belongsTo(ProductCategory_1.default, {
    foreignKey: "categoryId",
    as: "category",
});
Warranty.belongsTo(User_1.default, { foreignKey: "customerId", as: "customer" });
Warranty.belongsTo(Brand_1.default, { foreignKey: "brandId", as: "brand" });
exports.default = Warranty;
