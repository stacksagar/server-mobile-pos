import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { DiscountT } from "../global.types";

class Discount extends Model<DiscountT> {}

Discount.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.FLOAT, allowNull: false },
    type: {
      type: DataTypes.ENUM("amount", "percentage"),
      defaultValue: "amount",
      allowNull: false,
    },
  },
  {
    tableName: "discounts",
    sequelize,
  }
);

export default Discount;
