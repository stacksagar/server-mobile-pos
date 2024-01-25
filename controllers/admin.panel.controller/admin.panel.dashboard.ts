import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import ProductCategory from "../../models/ProductCategory";
import ExpenseCategory from "../../models/ExpenseCategory";
import Expense from "../../models/Expense";
import Product from "../../models/Product";
import User from "../../models/User";
import Supplier from "../../models/Supplier";
import Brand from "../../models/Brand";

export default async function adminDashboardController(
  req: Request,
  res: Response
) {
  try {
    const p_categories = await ProductCategory.findAndCountAll();
    const e_categories = await ExpenseCategory.findAndCountAll();
    const products = await Product.findAndCountAll();
    const expenses = await Expense.findAndCountAll();
    const suppliers = await Supplier.findAndCountAll();
    const brands = await Brand.findAndCountAll();
    const customers = await User.findAndCountAll({
      where: { is_customer: true },
    });

    const users = await User.findAndCountAll({ where: { is_customer: false } });

    let today_purchased = 0;
    let weekly_purchased = 0;
    let monthly_purchased = 0;
    let prev_monthly_purchased = 0;
    let yearly_purchased = 0;
    let running_purchased = 0;
    let total_purchased = 0;

    let today_sales = 0;
    let weekly_sales = 0;
    let monthly_sales = 0;
    let prev_monthly_sales = 0;
    let yearly_sales = 0;
    let total_sales = 0;

    let today_sales_profit = 0;
    let weekly_sales_profit = 0;
    let monthly_sales_profit = 0;
    let prev_monthly_sales_profit = 0;
    let yearly_sales_profit = 0;
    let total_sales_profit = 0;

    let total_expenses_amount = 0;
    let today_expenses_amount = 0;
    let this_month_expenses_amount = 0;
    let prev_month_expenses_amount = 0;

    let today_due_amount = 0;
    let this_month_due_amount = 0;
    let prev_month_due_amount = 0;
    let total_due_amount = 0;

    let total_supplier_due = 0;
    let total_customer_due = 0;

    let weekly_vat_amount = 0;
    let monthly_vat_amount = 0;
    let yearly_vat_amount = 0;

    res.status(200).json({
      // From MODEL Data
      total_products_categories: p_categories.count,
      total_expenses_categories: e_categories.count,
      total_products: products.count,
      total_expenses: expenses.count,
      total_suppliers: suppliers.count,
      total_brands: brands.count,
      total_customers: customers.count,
      total_users: users.count,

      // EXPENSE
      total_expenses_amount,
      today_expenses_amount,
      this_month_expenses_amount,
      prev_month_expenses_amount,

      // DUE
      today_due_amount,
      this_month_due_amount,
      prev_month_due_amount,
      total_due_amount,

      total_supplier_due,
      total_customer_due,

      // PURCHASED
      today_purchased,
      weekly_purchased,
      monthly_purchased,
      prev_monthly_purchased,
      yearly_purchased,
      total_purchased,
      running_purchased,

      // SALES
      today_sales,
      weekly_sales,
      monthly_sales,
      prev_monthly_sales,
      yearly_sales,
      total_sales,

      today_sales_profit,
      weekly_sales_profit,
      monthly_sales_profit,
      prev_monthly_sales_profit,
      yearly_sales_profit,
      total_sales_profit,

      // Vat Amount
      weekly_vat_amount,
      monthly_vat_amount,
      yearly_vat_amount,
    });
  } catch (error) {
    return error_res(res, error);
  }
}
