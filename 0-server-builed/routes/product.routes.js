"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_category_1 = __importDefault(require("../controllers/product.categories/create.category"));
const read_category_1 = __importDefault(require("../controllers/product.categories/read.category"));
const read_categories_1 = __importDefault(require("../controllers/product.categories/read.categories"));
const update_category_1 = __importDefault(require("../controllers/product.categories/update.category"));
const delete_categories_1 = __importDefault(require("../controllers/product.categories/delete.categories"));
const delete_category_1 = __importDefault(require("../controllers/product.categories/delete.category"));
const create_product_1 = __importDefault(require("../controllers/product/create.product"));
const delete_product_1 = __importDefault(require("../controllers/product/delete.product"));
const delete_products_1 = __importDefault(require("../controllers/product/delete.products"));
const read_product_1 = __importDefault(require("../controllers/product/read.product"));
const read_stock_products_1 = __importDefault(require("../controllers/product/read.stock.products"));
const read_stockout_products_1 = __importDefault(require("../controllers/product/read.stockout.products"));
const updateProduct_1 = __importDefault(require("../controllers/product/updateProduct"));
const read_stock_all_products_1 = __importDefault(require("../controllers/product/read.stock.all.products"));
const add_quantity_product_1 = __importDefault(require("../controllers/product/add.quantity.product"));
const occurred_sale_product_1 = __importDefault(require("../controllers/product/occurred.sale.product"));
const return_product_1 = __importDefault(require("../controllers/product/return.product"));
const remove_imeis_product_1 = __importDefault(require("../controllers/product/remove.imeis.product"));
const return_imei_product_1 = __importDefault(require("../controllers/product/return.imei.product"));
const productRoutes = express_1.default.Router();
// Category
productRoutes.post("/category", create_category_1.default);
productRoutes.get("/category/all", read_categories_1.default);
productRoutes.get("/category/:id", read_category_1.default);
productRoutes.put("/category/:id", update_category_1.default);
productRoutes.delete("/category/multiple", delete_categories_1.default);
productRoutes.delete("/category/:id", delete_category_1.default);
// Product
productRoutes.post("/", create_product_1.default);
productRoutes.get("/stock-in/all", read_stock_all_products_1.default);
productRoutes.get("/stock-in", read_stock_products_1.default);
productRoutes.get("/stock-out", read_stockout_products_1.default);
productRoutes.get("/:id", read_product_1.default);
productRoutes.put("/add-quantity", add_quantity_product_1.default);
productRoutes.put("/occurred-sale/:id", occurred_sale_product_1.default);
productRoutes.put("/remove-imeis/:id", remove_imeis_product_1.default);
productRoutes.put("/return-imei/:id", return_imei_product_1.default);
productRoutes.put("/return/:id", return_product_1.default);
productRoutes.put("/:id", updateProduct_1.default);
productRoutes.delete("/multiple", delete_products_1.default);
productRoutes.delete("/:id", delete_product_1.default);
exports.default = productRoutes;