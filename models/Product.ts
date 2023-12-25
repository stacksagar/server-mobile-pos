import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { ProductT } from "../global.types";
import ProductCategory from "./ProductCategory";
import Supplier from "./Supplier";
import getParseIntoJSON from "../utils/getParseIntoJSON";
import setStringifyJSON from "../utils/setStringifyJSON";
import SupplierHistory from "./SupplierHistory";

class Product extends Model<ProductT> {}

Product.init(
  {
    name: {
      type: DataTypes.STRING("255"),
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING("255"),
      allowNull: true,
    },

    sale_price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    purchase_price: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    total_sale: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    in_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    thumbnail: {
      type: DataTypes.STRING("255"),
      allowNull: true,
    },

    barcode: {
      type: DataTypes.STRING("255"),
      allowNull: true,
    },

    brand: {
      type: DataTypes.STRING("50"),
      allowNull: true,
    },

    model: {
      type: DataTypes.STRING("50"),
      allowNull: true,
    },

    details: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: "[]",
      get: getParseIntoJSON("images"),
      set: setStringifyJSON("images"),
    },

    custom: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: "{}",
      get: getParseIntoJSON("custom"),
      set: setStringifyJSON("custom"),
    },

    variants: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: "[]",
      get: getParseIntoJSON("variants"),
      set: setStringifyJSON("variants"),
    },
  },
  {
    tableName: "Products",
    sequelize,
  }
);

Product.hasOne(SupplierHistory, {
  foreignKey: "productId",
  as: "history",
});
SupplierHistory.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

export default Product;
