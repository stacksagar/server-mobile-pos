import express from "express";
import homeController from "../views_controller/home.controller";
const viewRoutes = express.Router();

viewRoutes.get("/", homeController);

export default viewRoutes;
