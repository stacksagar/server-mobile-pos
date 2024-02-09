import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { PaymentHistoryT } from "../global.types";

class PaymentHistory extends Model<PaymentHistoryT> {}

PaymentHistory.init(
  {
    paid_amount: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    due_amount: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    description: { type: DataTypes.STRING("255"), allowNull: true },
  },

  {
    tableName: "paymenthistories",
    sequelize,
  }
);

export default PaymentHistory;
