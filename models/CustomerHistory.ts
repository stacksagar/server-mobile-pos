import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { SellHistoryT } from "../global.types";

class CustomerHistory extends Model<SellHistoryT> {}

CustomerHistory.init(
  {
    paid: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    due: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    total: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    quantity: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
  },
  {
    tableName: "customerhistories",
    sequelize,
  }
);

export default CustomerHistory;
