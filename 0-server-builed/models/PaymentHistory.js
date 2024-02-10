"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
class PaymentHistory extends sequelize_1.Model {
}
PaymentHistory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    paid_amount: { type: sequelize_1.DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    due_amount: { type: sequelize_1.DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    description: { type: sequelize_1.DataTypes.STRING("255"), allowNull: true },
}, {
    tableName: "paymenthistories",
    sequelize: connection_1.default,
});
exports.default = PaymentHistory;
