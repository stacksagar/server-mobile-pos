"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
class CustomerHistory extends sequelize_1.Model {
}
CustomerHistory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    paid: { type: sequelize_1.DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    due: { type: sequelize_1.DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    total: { type: sequelize_1.DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    quantity: { type: sequelize_1.DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
}, {
    tableName: "customerhistories",
    sequelize: connection_1.default,
});
exports.default = CustomerHistory;
