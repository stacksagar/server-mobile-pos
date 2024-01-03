import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

class SupplierAndProductRelation extends Model {}

SupplierAndProductRelation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },

  {
    tableName: "supplierandproductrelation",
    sequelize,
    timestamps: false,
  }
);

export default SupplierAndProductRelation;
