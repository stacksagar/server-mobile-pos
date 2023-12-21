import { DataTypes, Model } from "sequelize";
import sequelize from ".";

class ProductCategory extends Model<CategoryT> {}

ProductCategory.init(
  {
    name: {
      type: DataTypes.STRING("40"),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING("60"),
      allowNull: false,
      unique: true,
    },
    icon: {
      type: DataTypes.STRING("255"),
      allowNull: true,
    },
  },
  {
    tableName: "ProductCategories",
    sequelize,
  }
);

export default ProductCategory;
