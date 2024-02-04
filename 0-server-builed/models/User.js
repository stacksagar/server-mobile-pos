"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
const SupplierHistory_1 = __importDefault(require("./SupplierHistory"));
const CustomerHistory_1 = __importDefault(require("./CustomerHistory"));
class User extends sequelize_1.Model {
}
User.init({
    name: { type: sequelize_1.DataTypes.STRING("255"), allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING("255"), allowNull: true, unique: true },
    phone: { type: sequelize_1.DataTypes.STRING("255"), allowNull: true },
    password: { type: sequelize_1.DataTypes.STRING("255"), allowNull: true },
    picture: { type: sequelize_1.DataTypes.STRING("255"), allowNull: true },
    address: { type: sequelize_1.DataTypes.STRING("255"), allowNull: true },
    due: { type: sequelize_1.DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    paid: { type: sequelize_1.DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    total_puchase_amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    is_customer: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM("user", "custom", "moderator", "admin"),
        defaultValue: "user",
    },
    refresh_token: {
        type: sequelize_1.DataTypes.STRING("255"),
        allowNull: true,
    },
}, {
    tableName: "users",
    sequelize: connection_1.default,
});
SupplierHistory_1.default.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});
User.hasMany(SupplierHistory_1.default, {
    foreignKey: "userId",
    as: "purchase_histories",
});
CustomerHistory_1.default.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});
User.hasMany(CustomerHistory_1.default, { foreignKey: "userId", as: "histories" });
exports.default = User;
