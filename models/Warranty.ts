import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { WarrantyT } from "../global.types";
import Product from "./Product";
import ProductCategory from "./ProductCategory";
import User from "./User";
import Brand from "./Brand";
import getParseIntoJSON from "../utils/getParseIntoJSON";
import setStringifyJSON from "../utils/setStringifyJSON";

class Warranty extends Model<WarrantyT> {}

Warranty.init(
  {
    receive_date: {
      type: DataTypes.STRING("255"),
      allowNull: true,
      defaultValue: "01-01-2024",
    },
    delivery_date: {
      type: DataTypes.STRING("255"),
      allowNull: true,
      defaultValue: "12-12-2024",
    },
    delivery_fee: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    warranty_fee: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    advance_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    due_amount: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    description: { type: DataTypes.STRING("255"), allowNull: true },

    variant: {
      type: DataTypes.TEXT("long"),
      get: getParseIntoJSON("variant"),
      set: setStringifyJSON("variant"),
    },

    status: {
      type: DataTypes.ENUM("courier", "received", "delivery", "success"),
      defaultValue: "received",
    },
  },
  {
    tableName: "warranties",
    sequelize,
  }
);

Warranty.belongsTo(Product, { foreignKey: "productId", as: "product" });
Warranty.belongsTo(ProductCategory, {
  foreignKey: "categoryId",
  as: "category",
});
Warranty.belongsTo(User, { foreignKey: "customerId", as: "customer" });
Warranty.belongsTo(Brand, { foreignKey: "brandId", as: "brand" });

export default Warranty;
