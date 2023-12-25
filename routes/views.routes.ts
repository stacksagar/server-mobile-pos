import express from "express";
import homeController from "../views_controller/home.controller";
import registerController from "../views_controller/register.controller";
import loginController from "../views_controller/login.controller";
const viewRoutes = express.Router();

viewRoutes.get("/", homeController);

viewRoutes.get("/register", registerController.get);
viewRoutes.post("/register", registerController.post);

viewRoutes.get("/login", loginController.get);
viewRoutes.post("/login", loginController.post);

export default viewRoutes;
