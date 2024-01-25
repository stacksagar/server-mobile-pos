import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { BrandT } from "../global.types";

class Brand extends Model<BrandT> {}

Brand.init(
  {
    name: {
      type: DataTypes.STRING("40"),
      allowNull: false,
    },
  },
  {
    tableName: "brands",
    sequelize,
  }
);

export default Brand;
