"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
class Page extends sequelize_1.Model {
}
Page.init({
    name: { type: sequelize_1.DataTypes.STRING("100"), allowNull: false },
    slug: { type: sequelize_1.DataTypes.STRING("150"), allowNull: false, unique: true },
    content: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    thumbnail: { type: sequelize_1.DataTypes.STRING("255"), allowNull: true },
}, {
    tableName: "pages",
    sequelize: connection_1.default,
});
exports.default = Page;
