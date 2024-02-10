"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
const Product_1 = __importDefault(require("./Product"));
const getParseIntoJSON_1 = __importDefault(require("../utils/getParseIntoJSON"));
const setStringifyJSON_1 = __importDefault(require("../utils/setStringifyJSON"));
class Barcode extends sequelize_1.Model {
}
Barcode.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    barcode: {
        type: sequelize_1.DataTypes.STRING("250"),
        allowNull: true,
    },
    barcodes: {
        type: sequelize_1.DataTypes.TEXT("long"),
        get: (0, getParseIntoJSON_1.default)("barcodes"),
        set: (0, setStringifyJSON_1.default)("barcodes"),
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
    },
    with_multi: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: false,
    },
}, {
    tableName: "barcodes",
    sequelize: connection_1.default,
});
// Product with Category Relation
Barcode.belongsTo(Product_1.default, {
    foreignKey: "productId",
    as: "product",
});
exports.default = Barcode;
