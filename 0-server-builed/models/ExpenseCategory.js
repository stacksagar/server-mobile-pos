"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
class ExpenseCategory extends sequelize_1.Model {
}
ExpenseCategory.init({
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
    tableName: "expensecategories",
    sequelize: connection_1.default,
});
exports.default = ExpenseCategory;
