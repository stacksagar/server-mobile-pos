import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { BrandT } from "../global.types";
import Product from "./Product";

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

// Product with Category Relation
Product.belongsTo(Brand, {
  foreignKey: "brandId",
  as: "brand",
});

export default Brand;
