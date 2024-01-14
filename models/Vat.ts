import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { VatT } from "../global.types";

class Vat extends Model<VatT> {}

Vat.init(
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
    tableName: "vats",
    sequelize,
  }
);

export default Vat;
