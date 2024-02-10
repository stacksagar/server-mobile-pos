import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { SupplierT } from "../global.types";
import SupplierHistory from "./SupplierHistory";
import PaymentHistory from "./PaymentHistory";

class Supplier extends Model<SupplierT> {}

Supplier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    supplier_name: { type: DataTypes.STRING("255"), allowNull: false },
    company_name: { type: DataTypes.STRING("255"), allowNull: true },
    address: { type: DataTypes.STRING("255"), allowNull: true },
    phone: { type: DataTypes.STRING("255"), allowNull: true },
    nid: { type: DataTypes.STRING("255"), allowNull: true },
    email: { type: DataTypes.STRING("255"), allowNull: true },
    total_puchase_amount: { type: DataTypes.FLOAT, allowNull: true },
    total_paid: { type: DataTypes.FLOAT, allowNull: true },
    total_due: { type: DataTypes.FLOAT, allowNull: true },
  },
  {
    tableName: "suppliers",
    sequelize,
  }
);

// Supplier with History Relation
Supplier.hasMany(SupplierHistory, {
  foreignKey: "supplierId",
  as: "histories",
});

SupplierHistory.belongsTo(Supplier, {
  foreignKey: "supplierId",
  as: "supplier",
});

// Supplier with Payment History Relation
Supplier.hasMany(PaymentHistory, {
  foreignKey: "supplierId",
  as: "payment-histories",
});

PaymentHistory.belongsTo(Supplier, {
  foreignKey: "supplierId",
  as: "supplier",
});

export default Supplier;
