"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
class SupplierHistory extends sequelize_1.Model {
}
SupplierHistory.init({
    paid_amount: { type: sequelize_1.DataTypes.FLOAT, allowNull: true },
    due_amount: { type: sequelize_1.DataTypes.FLOAT, allowNull: true },
    total_purchase_amount: { type: sequelize_1.DataTypes.FLOAT, allowNull: true },
    quantity: { type: sequelize_1.DataTypes.FLOAT, allowNull: true },
}, {
    tableName: "supplierhistories",
    sequelize: connection_1.default,
});
exports.default = SupplierHistory;
