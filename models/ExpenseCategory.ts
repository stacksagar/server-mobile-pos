import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { CategoryT } from "../global.types";
import Expense from "./Expense";

class ExpenseCategory extends Model<CategoryT> {}

ExpenseCategory.init(
  {
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
    tableName: "expensecategories",
    sequelize,
  }
);

export default ExpenseCategory;
