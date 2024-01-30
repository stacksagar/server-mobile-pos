import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import ProductCategory from "../../models/ProductCategory";
import ExpenseCategory from "../../models/ExpenseCategory";
import Expense from "../../models/Expense";
import Product from "../../models/Product";
import User from "../../models/User";
import Supplier from "../../models/Supplier";
import Brand from "../../models/Brand";
import isTodayDate from "../../utils/isTodayDate";
import SupplierHistory from "../../models/SupplierHistory";
import checkWeekEqual from "../../utils/checkWeekEqual";
import checkMonthYearEqual from "../../utils/checkMonthYearEqual";
import isPreviousMonth from "../../utils/isPreviousMonth";
import checkLastYear from "../../utils/checkLastYear";
import Sale from "../../models/Sale";

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
    const suppliers_h = await SupplierHistory.findAndCountAll();
    const sales = await Sale.findAndCountAll();
    const brands = await Brand.findAndCountAll();
    const customers = await User.findAndCountAll({
      where: { is_customer: true },
    });

    const users = await User.findAndCountAll({ where: { is_customer: false } });

    // supplier/purchase histories calculation
    let today_purchased = 0;
    let weekly_purchased = 0;
    let monthly_purchased = 0;
    let prev_monthly_purchased = 0;
    let yearly_purchased = 0;
    let running_purchased = 0;
    let total_purchased = 0;

    suppliers_h.rows.forEach((row) => {
      isTodayDate(row.dataValues.createdAt) &&
        (today_purchased += row.dataValues.total_purchase_amount);

      checkWeekEqual(row.dataValues.createdAt) &&
        (weekly_purchased += row.dataValues.total_purchase_amount);

      checkMonthYearEqual(row.dataValues.createdAt) &&
        (monthly_purchased += row.dataValues.total_purchase_amount);

      isPreviousMonth(row.dataValues.createdAt) &&
        (prev_monthly_purchased += row.dataValues.total_purchase_amount);

      checkLastYear(row.dataValues.createdAt) &&
        (yearly_purchased += row.dataValues.total_purchase_amount);

      total_purchased += row.dataValues.total_purchase_amount;
    });

    // sales calculation
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

    let weekly_vat_amount = 0;
    let monthly_vat_amount = 0;
    let yearly_vat_amount = 0;

    sales.rows.forEach((row) => {
      isTodayDate(row.dataValues.createdAt) &&
        (today_sales += row.dataValues.total);
      isTodayDate(row.dataValues.createdAt) &&
        (today_sales_profit +=
          row.dataValues.total - row?.dataValues.total_purchase_cost);

      checkWeekEqual(row.dataValues.createdAt) &&
        (weekly_vat_amount += row.dataValues.vat);
      checkWeekEqual(row.dataValues.createdAt) &&
        (weekly_sales += row.dataValues.total);
      checkWeekEqual(row.dataValues.createdAt) &&
        (weekly_sales_profit +=
          row.dataValues.total - row?.dataValues.total_purchase_cost);

      checkMonthYearEqual(row.dataValues.createdAt) &&
        (monthly_vat_amount += row.dataValues.vat);
      checkMonthYearEqual(row.dataValues.createdAt) &&
        (monthly_sales += row.dataValues.total);
      checkMonthYearEqual(row.dataValues.createdAt) &&
        (monthly_sales_profit +=
          row.dataValues.total - row?.dataValues.total_purchase_cost);

      isPreviousMonth(row.dataValues.createdAt) &&
        (prev_monthly_sales += row.dataValues.total);
      isPreviousMonth(row.dataValues.createdAt) &&
        (prev_monthly_sales_profit +=
          row.dataValues.total - row?.dataValues.total_purchase_cost);

      checkLastYear(row.dataValues.createdAt) &&
        (yearly_vat_amount += row.dataValues.vat);
      checkLastYear(row.dataValues.createdAt) &&
        (yearly_sales += row.dataValues.total);
      checkLastYear(row.dataValues.createdAt) &&
        (yearly_sales_profit +=
          row.dataValues.total - row?.dataValues.total_purchase_cost);

      total_sales += row.dataValues.total;
      total_sales_profit +=
        row.dataValues.total - row?.dataValues.total_purchase_cost;
    });

    // expenses calculation
    let today_expenses_amount = 0;
    let weekly_expenses_amount = 0;
    let this_month_expenses_amount = 0;
    let prev_month_expenses_amount = 0;
    let yearly_expenses_amount = 0;
    let total_expenses_amount = 0;
    expenses.rows.forEach((row) => {
      isTodayDate(row.dataValues.createdAt) &&
        (today_expenses_amount += row.dataValues.cost);

      checkWeekEqual(row.dataValues.createdAt) &&
        (weekly_expenses_amount += row.dataValues.cost);

      checkMonthYearEqual(row.dataValues.createdAt) &&
        (this_month_expenses_amount += row.dataValues.cost);

      isPreviousMonth(row.dataValues.createdAt) &&
        (prev_month_expenses_amount += row.dataValues.cost);

      checkLastYear(row.dataValues.createdAt) &&
        (yearly_expenses_amount += row.dataValues.cost);

      total_expenses_amount += row.dataValues.cost;
    });

    let total_customer_due = 0;
    let total_supplier_due = 0;
    customers.rows.forEach((customer) => {
      total_customer_due += customer.dataValues.due || 0;
    });
    suppliers.rows.forEach((supplier) => {
      total_supplier_due += Number(supplier.dataValues.total_due || "0");
    });

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
