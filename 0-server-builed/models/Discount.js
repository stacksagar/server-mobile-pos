"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
class Discount extends sequelize_1.Model {
}
Discount.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    value: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    type: {
        type: sequelize_1.DataTypes.ENUM("amount", "percentage"),
        defaultValue: "amount",
        allowNull: false,
    },
}, {
    tableName: "discounts",
    sequelize: connection_1.default,
});
exports.default = Discount;
