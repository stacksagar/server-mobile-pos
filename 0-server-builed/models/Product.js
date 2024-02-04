"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
const Supplier_1 = __importDefault(require("./Supplier"));
const getParseIntoJSON_1 = __importDefault(require("../utils/getParseIntoJSON"));
const setStringifyJSON_1 = __importDefault(require("../utils/setStringifyJSON"));
const SupplierHistory_1 = __importDefault(require("./SupplierHistory"));
const SupplierAndProductRelation_1 = __importDefault(require("./ThroughModels/SupplierAndProductRelation"));
class Product extends sequelize_1.Model {
}
Product.init({
    name: {
        type: sequelize_1.DataTypes.STRING("255"),
        allowNull: true,
    },
    slug: {
        type: sequelize_1.DataTypes.STRING("255"),
        allowNull: true,
    },
    sale_price: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    purchase_price: {
        allowNull: true,
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    total_sale: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    in_stock: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    total_purchase_amount: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    total_sale_amount: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    thumbnail: {
        type: sequelize_1.DataTypes.STRING("255"),
        allowNull: true,
    },
    barcode: {
        type: sequelize_1.DataTypes.STRING("255"),
        allowNull: true,
    },
    model: {
        type: sequelize_1.DataTypes.STRING("50"),
        allowNull: true,
    },
    details: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: true,
    },
    images: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
        defaultValue: "[]",
        get: (0, getParseIntoJSON_1.default)("images"),
        set: (0, setStringifyJSON_1.default)("images"),
    },
    custom: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
        defaultValue: "{}",
        get: (0, getParseIntoJSON_1.default)("custom"),
        set: (0, setStringifyJSON_1.default)("custom"),
    },
    variants: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
        defaultValue: "[]",
        get: (0, getParseIntoJSON_1.default)("variants"),
        set: (0, setStringifyJSON_1.default)("variants"),
    },
    with_variant: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: "products",
    sequelize: connection_1.default,
});
Product.belongsToMany(Supplier_1.default, {
    through: SupplierAndProductRelation_1.default,
});
Supplier_1.default.belongsToMany(Product, {
    through: SupplierAndProductRelation_1.default,
});
Product.hasMany(SupplierHistory_1.default, {
    foreignKey: "productId",
    as: "histories",
});
SupplierHistory_1.default.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});
exports.default = Product;
