import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { SupplierHistoryT } from "../global.types";

class SupplierHistory extends Model<SupplierHistoryT> {}

SupplierHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    paid_amount: { type: DataTypes.FLOAT, allowNull: true },
    due_amount: { type: DataTypes.FLOAT, allowNull: true },
    total_purchase_amount: { type: DataTypes.FLOAT, allowNull: true },
    quantity: { type: DataTypes.FLOAT, allowNull: true },
  },
  {
    tableName: "supplierhistories",
    sequelize,
  }
);

export default SupplierHistory;
