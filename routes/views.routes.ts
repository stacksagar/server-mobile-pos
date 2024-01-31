import express from "express";
import homeController from "../views_controller/home.controller";
import registerController from "../views_controller/register.controller";
import loginController from "../views_controller/login.controller";
import pageControllers from "../views_controller/page.controllers";
import productControllers from "../views_controller/product.controllers";
const viewRoutes = express.Router();

viewRoutes.get("/", homeController);

viewRoutes.get("/register", registerController.get);
viewRoutes.post("/register", registerController.post);

viewRoutes.get("/login", loginController.get);
viewRoutes.post("/login", loginController.post);

viewRoutes.get(`/pages/:slug`, pageControllers.get);

// product
viewRoutes.get(`/items`, productControllers.products);
viewRoutes.get(`/item/:slug`, productControllers.singleProduct);

export default viewRoutes;
