import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { PaymentT } from "../global.types";

class PaymentMethod extends Model<PaymentT> {}

PaymentMethod.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    wallet: { type: DataTypes.STRING, allowNull: true },
    logo: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT("medium"), allowNull: true },
  },
  {
    tableName: "paymentmethods",
    sequelize,
  }
);

export default PaymentMethod;
