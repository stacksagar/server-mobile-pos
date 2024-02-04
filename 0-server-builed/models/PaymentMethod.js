"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
class PaymentMethod extends sequelize_1.Model {
}
PaymentMethod.init({
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    wallet: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    logo: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    description: { type: sequelize_1.DataTypes.TEXT("medium"), allowNull: true },
}, {
    tableName: "paymentmethods",
    sequelize: connection_1.default,
});
exports.default = PaymentMethod;
