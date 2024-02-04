import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { ProductT } from "../global.types";
import Supplier from "./Supplier";
import getParseIntoJSON from "../utils/getParseIntoJSON";
import setStringifyJSON from "../utils/setStringifyJSON";
import SupplierHistory from "./SupplierHistory";
import SupplierAndProductRelation from "./ThroughModels/SupplierAndProductRelation";

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
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    purchase_price: {
      allowNull: true,
      type: DataTypes.FLOAT,
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

    total_purchase_amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    total_sale_amount: {
      type: DataTypes.FLOAT,
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
      type: DataTypes.TEXT("long"),
      allowNull: true,
      defaultValue: "[]",
      get: getParseIntoJSON("images"),
      set: setStringifyJSON("images"),
    },

    custom: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
      defaultValue: "{}",
      get: getParseIntoJSON("custom"),
      set: setStringifyJSON("custom"),
    },

    variants: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
      defaultValue: "[]",
      get: getParseIntoJSON("variants"),
      set: setStringifyJSON("variants"),
    },

    with_variant: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "products",
    sequelize,
  }
);

Product.belongsToMany(Supplier, {
  through: SupplierAndProductRelation,
});

Supplier.belongsToMany(Product, {
  through: SupplierAndProductRelation,
});

Product.hasMany(SupplierHistory, {
  foreignKey: "productId",
  as: "histories",
});

SupplierHistory.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

export default Product;
