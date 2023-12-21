import { DataTypes, Model } from "sequelize";
import sequelize from ".";

class User extends Model<UserT> {}

User.init(
  {
    name: { type: DataTypes.STRING("20"), allowNull: false },
    email: { type: DataTypes.STRING("40"), allowNull: false, unique: true },
    password: { type: DataTypes.STRING("40"), allowNull: false },
    phone: { type: DataTypes.STRING("16"), allowNull: true },
    picture: { type: DataTypes.STRING("255"), allowNull: true },
    address: { type: DataTypes.STRING("255"), allowNull: true },
    permissions: { type: DataTypes.JSON, allowNull: true },

    role: {
      type: DataTypes.ENUM("user", "custom", "moderator", "admin"),
      defaultValue: "user",
    },
  },
  {
    tableName: "Users",
    sequelize,
  }
);

export default User;
