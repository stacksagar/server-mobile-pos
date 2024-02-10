import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { SaleT } from "../global.types";
import getParseIntoJSON from "../utils/getParseIntoJSON";
import setStringifyJSON from "../utils/setStringifyJSON";
import User from "./User";
import Product from "./Product";

class Sale extends Model<SaleT> {}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    due: { type: DataTypes.FLOAT, defaultValue: 0 },
    paid: { type: DataTypes.FLOAT, defaultValue: 0 },
    discount: { type: DataTypes.FLOAT, defaultValue: 0 },
    vat: { type: DataTypes.FLOAT, defaultValue: 0 },
    quantity: { type: DataTypes.FLOAT, defaultValue: 0 },
    total: { type: DataTypes.FLOAT, defaultValue: 0 },
    total_purchase_cost: { type: DataTypes.FLOAT, defaultValue: 0 },
    method: { type: DataTypes.STRING, defaultValue: "cash" },
    with_variant: { type: DataTypes.BOOLEAN, defaultValue: false },
    properties: {
      type: DataTypes.TEXT("long"),
      get: getParseIntoJSON("properties"),
      set: setStringifyJSON("properties"),
    },
  },

  {
    tableName: "sales",
    sequelize,
  }
);

Sale.belongsTo(User, {
  foreignKey: "customerId",
  as: "customer",
});

Sale.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

export default Sale;
