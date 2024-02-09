import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { TaxT } from "../global.types";

class Tax extends Model<TaxT> {}

Tax.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
  },

  {
    tableName: "taxes",
    sequelize,
  }
);

export default Tax;
