import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { PageT } from "../global.types";

class Page extends Model<PageT> {}

Page.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING("100"), allowNull: false },
    slug: { type: DataTypes.STRING("150"), allowNull: false, unique: true },
    content: { type: DataTypes.TEXT, allowNull: true },
    thumbnail: { type: DataTypes.STRING("255"), allowNull: true },
  },
  {
    tableName: "pages",
    sequelize,
  }
);

export default Page;
