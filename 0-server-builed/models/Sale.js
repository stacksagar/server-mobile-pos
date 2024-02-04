"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
const getParseIntoJSON_1 = __importDefault(require("../utils/getParseIntoJSON"));
const setStringifyJSON_1 = __importDefault(require("../utils/setStringifyJSON"));
const User_1 = __importDefault(require("./User"));
const Product_1 = __importDefault(require("./Product"));
class Sale extends sequelize_1.Model {
}
Sale.init({
    due: { type: sequelize_1.DataTypes.FLOAT, defaultValue: 0 },
    paid: { type: sequelize_1.DataTypes.FLOAT, defaultValue: 0 },
    discount: { type: sequelize_1.DataTypes.FLOAT, defaultValue: 0 },
    vat: { type: sequelize_1.DataTypes.FLOAT, defaultValue: 0 },
    quantity: { type: sequelize_1.DataTypes.FLOAT, defaultValue: 0 },
    total: { type: sequelize_1.DataTypes.FLOAT, defaultValue: 0 },
    total_purchase_cost: { type: sequelize_1.DataTypes.FLOAT, defaultValue: 0 },
    method: { type: sequelize_1.DataTypes.STRING, defaultValue: "cash" },
    with_variant: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    properties: {
        type: sequelize_1.DataTypes.TEXT("long"),
        get: (0, getParseIntoJSON_1.default)("properties"),
        set: (0, setStringifyJSON_1.default)("properties"),
    },
}, {
    tableName: "sales",
    sequelize: connection_1.default,
});
Sale.belongsTo(User_1.default, {
    foreignKey: "customerId",
    as: "customer",
});
Sale.belongsTo(Product_1.default, {
    foreignKey: "productId",
    as: "product",
});
exports.default = Sale;
