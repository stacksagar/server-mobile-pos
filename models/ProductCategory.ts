import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { CategoryT } from "../global.types";
import Product from "./Product";

class ProductCategory extends Model<CategoryT> {}

ProductCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING("40"),
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    tableName: "productcategories",
    sequelize,
  }
);

// Product with Category Relation
Product.belongsTo(ProductCategory, {
  foreignKey: "categoryId",
  as: "category",
});

export default ProductCategory;
