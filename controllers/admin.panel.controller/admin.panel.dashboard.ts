import { Request, Response } from "express";
import error_res from "../../utils/error_res";

export default function adminDashboardController(req: Request, res: Response) {
  try {
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
      total_products_categories: 0,
      total_products: 0,
      total_expenses_categories: 0,
      total_expenses: 0,
      total_suppliers: 0,
      total_brands: 0,
      total_customers: 0,
      total_users: 0,

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
