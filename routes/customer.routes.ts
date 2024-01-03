import express from "express";
import readCustomers from "../controllers/auth/read.customers";
import createCustomer from "../controllers/auth/create.customer";
import readCustomer from "../controllers/auth/read.customer";
import deleteCustomer from "../controllers/auth/delete.customer";
import deleteCustomers from "../controllers/auth/delete.customers";
import updateCustomer from "../controllers/auth/update.customer";
const customerRoutes = express.Router();

customerRoutes.post("/", createCustomer);
customerRoutes.get("/all", readCustomers);
customerRoutes.get("/:id", readCustomer);
customerRoutes.put("/:id", updateCustomer);
customerRoutes.delete("/multiple", deleteCustomers);
customerRoutes.delete("/:id", deleteCustomer);

export default customerRoutes;
