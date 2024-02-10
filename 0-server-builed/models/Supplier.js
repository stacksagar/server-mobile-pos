"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
const SupplierHistory_1 = __importDefault(require("./SupplierHistory"));
const PaymentHistory_1 = __importDefault(require("./PaymentHistory"));
class Supplier extends sequelize_1.Model {
}
Supplier.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    supplier_name: { type: sequelize_1.DataTypes.STRING("255"), allowNull: false },
    company_name: { type: sequelize_1.DataTypes.STRING("255"), allowNull: true },
    address: { type: sequelize_1.DataTypes.STRING("255"), allowNull: true },
    phone: { type: sequelize_1.DataTypes.STRING("255"), allowNull: true },
    nid: { type: sequelize_1.DataTypes.STRING("255"), allowNull: true },
    email: { type: sequelize_1.DataTypes.STRING("255"), allowNull: true },
    total_puchase_amount: { type: sequelize_1.DataTypes.FLOAT, allowNull: true },
    total_paid: { type: sequelize_1.DataTypes.FLOAT, allowNull: true },
    total_due: { type: sequelize_1.DataTypes.FLOAT, allowNull: true },
}, {
    tableName: "suppliers",
    sequelize: connection_1.default,
});
// Supplier with History Relation
Supplier.hasMany(SupplierHistory_1.default, {
    foreignKey: "supplierId",
    as: "histories",
});
SupplierHistory_1.default.belongsTo(Supplier, {
    foreignKey: "supplierId",
    as: "supplier",
});
// Supplier with Payment History Relation
Supplier.hasMany(PaymentHistory_1.default, {
    foreignKey: "supplierId",
    as: "payment-histories",
});
PaymentHistory_1.default.belongsTo(Supplier, {
    foreignKey: "supplierId",
    as: "supplier",
});
exports.default = Supplier;
