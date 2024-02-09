import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { UserT } from "../global.types";
import SupplierHistory from "./SupplierHistory";
import CustomerHistory from "./CustomerHistory";
import PaymentHistory from "./PaymentHistory";

class User extends Model<UserT> {}

User.init(
  {
    name: { type: DataTypes.STRING("255"), allowNull: false },
    email: { type: DataTypes.STRING("255"), allowNull: true },
    phone: { type: DataTypes.STRING("255"), allowNull: true },
    password: { type: DataTypes.STRING("255"), allowNull: true },
    picture: { type: DataTypes.STRING("255"), allowNull: true },
    address: { type: DataTypes.STRING("255"), allowNull: true },
    due: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    paid: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    total_puchase_amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    is_customer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },

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
    tableName: "users",
    sequelize,
  }
);

// Supplier History
SupplierHistory.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(SupplierHistory, {
  foreignKey: "userId",
  as: "purchase_histories",
});

// Customer Histor
CustomerHistory.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(CustomerHistory, { foreignKey: "userId", as: "histories" });

// User with Payment History Relation
User.hasMany(PaymentHistory, {
  foreignKey: "userId",
  as: "payment-histories",
});

PaymentHistory.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default User;
