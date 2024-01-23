import express from "express";
import createCategory from "../controllers/product.categories/create.category";
import readProductCategory from "../controllers/product.categories/read.category";
import readProductCategories from "../controllers/product.categories/read.categories";
import updateProductCategory from "../controllers/product.categories/update.category";
import deleteProductCategories from "../controllers/product.categories/delete.categories";
import deleteProductCategory from "../controllers/product.categories/delete.category";
import createProduct from "../controllers/product/create.product";
import deleteProduct from "../controllers/product/delete.product";
import deleteProducts from "../controllers/product/delete.products";
import readProduct from "../controllers/product/read.product";
import readStockInProducts from "../controllers/product/read.stock.products";
import readStockOutProducts from "../controllers/product/read.stockout.products";
import updateProduct from "../controllers/product/updateProduct";
import readStockInAllProducts from "../controllers/product/read.stock.all.products";
import addQuantityProduct from "../controllers/product/add.quantity.product";
import occurredSaleProduct from "../controllers/product/occurred.sale.product";
import returnProduct from "../controllers/product/return.product";
import removeProductIMEIs from "../controllers/product/remove.imeis.product";
import returnProductIMEIs from "../controllers/product/return.imeis.product";
const productRoutes = express.Router();

// Category
productRoutes.post("/category", createCategory);
productRoutes.get("/category/all", readProductCategories);
productRoutes.get("/category/:id", readProductCategory);
productRoutes.put("/category/:id", updateProductCategory);
productRoutes.delete("/category/multiple", deleteProductCategories);
productRoutes.delete("/category/:id", deleteProductCategory);

// Product
productRoutes.post("/", createProduct);
productRoutes.get("/stock-in/all", readStockInAllProducts);
productRoutes.get("/stock-in", readStockInProducts);
productRoutes.get("/stock-out", readStockOutProducts);
productRoutes.get("/:id", readProduct);
productRoutes.put("/add-quantity", addQuantityProduct);
productRoutes.put("/occurred-sale/:id", occurredSaleProduct);
productRoutes.put("/remove-imeis/:id", removeProductIMEIs);
productRoutes.put("/return-imeis/:id", returnProductIMEIs);
productRoutes.put("/return/:id", returnProduct);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/multiple", deleteProducts);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
