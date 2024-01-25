import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { ExpenseT } from "../global.types";

class Expense extends Model<ExpenseT> {}

Expense.init(
  {
    name: {
      type: DataTypes.STRING("40"),
      allowNull: false,
    },
    date: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cost: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    tableName: "expenses",
    sequelize,
  }
);

export default Expense;
