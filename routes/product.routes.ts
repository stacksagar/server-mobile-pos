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
import returnProductIMEI from "../controllers/product/return.imei.product";
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
productRoutes.put("/return-imei/:id", returnProductIMEI);
productRoutes.put("/return/:id", returnProduct);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/multiple", deleteProducts);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;

[
  {
    variants: [
      {
        uid: "25.513060240909656",
        processor: "Bionic 14",
        ram: "6",
        rom: "256",
        purchase_price: 50000,
        sale_price: 60000,
        imeis: {
          blue: ["89893", "43434", "343434"],
          white: ["33434"],
        },
      },
      {
        uid: "330.9018027103867",
        processor: "Bionic 14",
        ram: "4",
        rom: "128",
        purchase_price: 45000,
        sale_price: 50000,
        imeis: {
          white: ["123", "234"],
          black: ["4233"],
        },
      },
    ],
    id: 4,
    name: "iPhone 12",
    slug: "iphone-12",
    total_sale: 0,
    in_stock: 5,
  },

  {
    variants: [
      {
        uid: "25.513060240909656",
        processor: "Bionic 14",
        ram: "6",
        rom: "256",
        purchase_price: 50000,
        sale_price: 60000,
        imeis: {
          blue: ["54343", "578654", "43345344"],
          white: ["464564"],
        },
      },
      {
        uid: "330.9018027103867",
        processor: "Bionic 14",
        ram: "4",
        rom: "128",
        purchase_price: 45000,
        sale_price: 50000,
        imeis: {
          white: ["46456", "453456"],
          black: ["45456"],
        },
      },
    ],
    id: 4,
    name: "iPhone 13",
    slug: "iphone-13",
    total_sale: 0,
    in_stock: 5,
  },
];
