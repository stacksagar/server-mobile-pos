import express from "express";
import adminDashboardController from "../controllers/admin.panel.controller/admin.panel.dashboard";
const adminPanelRoutes = express.Router();

adminPanelRoutes.get("/dashboard", adminDashboardController);

export default adminPanelRoutes;
