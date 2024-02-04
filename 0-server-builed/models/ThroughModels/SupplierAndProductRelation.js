"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
class SupplierAndProductRelation extends sequelize_1.Model {
}
SupplierAndProductRelation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, {
    tableName: "supplierandproductrelation",
    sequelize: connection_1.default,
    timestamps: false,
});
exports.default = SupplierAndProductRelation;
