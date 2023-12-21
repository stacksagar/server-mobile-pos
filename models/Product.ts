import { DataTypes, Model } from "sequelize";
import sequelize from ".";

class Product extends Model<ProductT> {}

Product.init(
  {
    name: {
      type: DataTypes.STRING("255"),
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING("255"),
      allowNull: true,
    },
    sale_price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    purchase_price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    total_sale: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    in_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    thumbnail: {
      type: DataTypes.STRING("255"),
      allowNull: true,
    },

    barcode: {
      type: DataTypes.STRING("255"),
      allowNull: true,
    },

    brand: {
      type: DataTypes.STRING("50"),
      allowNull: true,
    },

    model: {
      type: DataTypes.STRING("50"),
      allowNull: true,
    },

    custom: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: "{}",
    },

    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: "[]",
    },
  },
  {
    tableName: "Products",
    sequelize,
  }
);

export default Product;
