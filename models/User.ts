import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { UserT } from "../global.types";

class User extends Model<UserT> {}

User.init(
  {
    name: { type: DataTypes.STRING("20"), allowNull: false },
    email: { type: DataTypes.STRING("40"), allowNull: false, unique: true },
    password: { type: DataTypes.STRING("100"), allowNull: false },
    phone: { type: DataTypes.STRING("16"), allowNull: true },
    picture: { type: DataTypes.STRING("255"), allowNull: true },
    address: { type: DataTypes.STRING("255"), allowNull: true },
    due: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    permissions: { type: DataTypes.JSON, allowNull: true },

    role: {
      type: DataTypes.ENUM("user", "custom", "moderator", "admin"),
      defaultValue: "user",
    },

    refresh_token: {
      type: DataTypes.STRING("255"),
      allowNull: true,
    },
  },
  {
    tableName: "Users",
    sequelize,
  }
);

export default User;
