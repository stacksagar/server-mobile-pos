"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const ProductCategory_1 = __importDefault(require("../../models/ProductCategory"));
const ExpenseCategory_1 = __importDefault(require("../../models/ExpenseCategory"));
const Expense_1 = __importDefault(require("../../models/Expense"));
const Product_1 = __importDefault(require("../../models/Product"));
const User_1 = __importDefault(require("../../models/User"));
const Supplier_1 = __importDefault(require("../../models/Supplier"));
const Brand_1 = __importDefault(require("../../models/Brand"));
const isTodayDate_1 = __importDefault(require("../../utils/isTodayDate"));
const SupplierHistory_1 = __importDefault(require("../../models/SupplierHistory"));
const checkWeekEqual_1 = __importDefault(require("../../utils/checkWeekEqual"));
const checkMonthYearEqual_1 = __importDefault(require("../../utils/checkMonthYearEqual"));
const isPreviousMonth_1 = __importDefault(require("../../utils/isPreviousMonth"));
const checkLastYear_1 = __importDefault(require("../../utils/checkLastYear"));
const Sale_1 = __importDefault(require("../../models/Sale"));
async function adminDashboardController(req, res) {
    try {
        const p_categories = await ProductCategory_1.default.findAndCountAll();
        const e_categories = await ExpenseCategory_1.default.findAndCountAll();
        const products = await Product_1.default.findAndCountAll();
        const expenses = await Expense_1.default.findAndCountAll();
        const suppliers = await Supplier_1.default.findAndCountAll();
        const suppliers_h = await SupplierHistory_1.default.findAndCountAll();
        const sales = await Sale_1.default.findAndCountAll();
        const brands = await Brand_1.default.findAndCountAll();
        const customers = await User_1.default.findAndCountAll({
            where: { is_customer: true },
        });
        const users = await User_1.default.findAndCountAll({ where: { is_customer: false } });
        // supplier/purchase histories calculation
        let today_purchased = 0;
        let weekly_purchased = 0;
        let monthly_purchased = 0;
        let prev_monthly_purchased = 0;
        let yearly_purchased = 0;
        let running_purchased = 0;
        let total_purchased = 0;
        suppliers_h.rows.forEach((row) => {
            (0, isTodayDate_1.default)(row.dataValues.createdAt) &&
                (today_purchased += row.dataValues.total_purchase_amount);
            (0, checkWeekEqual_1.default)(row.dataValues.createdAt) &&
                (weekly_purchased += row.dataValues.total_purchase_amount);
            (0, checkMonthYearEqual_1.default)(row.dataValues.createdAt) &&
                (monthly_purchased += row.dataValues.total_purchase_amount);
            (0, isPreviousMonth_1.default)(row.dataValues.createdAt) &&
                (prev_monthly_purchased += row.dataValues.total_purchase_amount);
            (0, checkLastYear_1.default)(row.dataValues.createdAt) &&
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
            (0, isTodayDate_1.default)(row.dataValues.createdAt) &&
                (today_sales += row.dataValues.total);
            (0, isTodayDate_1.default)(row.dataValues.createdAt) &&
                (today_sales_profit +=
                    row.dataValues.total - row?.dataValues.total_purchase_cost);
            (0, checkWeekEqual_1.default)(row.dataValues.createdAt) &&
                (weekly_vat_amount += row.dataValues.vat);
            (0, checkWeekEqual_1.default)(row.dataValues.createdAt) &&
                (weekly_sales += row.dataValues.total);
            (0, checkWeekEqual_1.default)(row.dataValues.createdAt) &&
                (weekly_sales_profit +=
                    row.dataValues.total - row?.dataValues.total_purchase_cost);
            (0, checkMonthYearEqual_1.default)(row.dataValues.createdAt) &&
                (monthly_vat_amount += row.dataValues.vat);
            (0, checkMonthYearEqual_1.default)(row.dataValues.createdAt) &&
                (monthly_sales += row.dataValues.total);
            (0, checkMonthYearEqual_1.default)(row.dataValues.createdAt) &&
                (monthly_sales_profit +=
                    row.dataValues.total - row?.dataValues.total_purchase_cost);
            (0, isPreviousMonth_1.default)(row.dataValues.createdAt) &&
                (prev_monthly_sales += row.dataValues.total);
            (0, isPreviousMonth_1.default)(row.dataValues.createdAt) &&
                (prev_monthly_sales_profit +=
                    row.dataValues.total - row?.dataValues.total_purchase_cost);
            (0, checkLastYear_1.default)(row.dataValues.createdAt) &&
                (yearly_vat_amount += row.dataValues.vat);
            (0, checkLastYear_1.default)(row.dataValues.createdAt) &&
                (yearly_sales += row.dataValues.total);
            (0, checkLastYear_1.default)(row.dataValues.createdAt) &&
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
            (0, isTodayDate_1.default)(row.dataValues.createdAt) &&
                (today_expenses_amount += row.dataValues.cost);
            (0, checkWeekEqual_1.default)(row.dataValues.createdAt) &&
                (weekly_expenses_amount += row.dataValues.cost);
            (0, checkMonthYearEqual_1.default)(row.dataValues.createdAt) &&
                (this_month_expenses_amount += row.dataValues.cost);
            (0, isPreviousMonth_1.default)(row.dataValues.createdAt) &&
                (prev_month_expenses_amount += row.dataValues.cost);
            (0, checkLastYear_1.default)(row.dataValues.createdAt) &&
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
    }
    catch (error) {
        return (0, error_res_1.default)(res, error);
    }
}
exports.default = adminDashboardController;
