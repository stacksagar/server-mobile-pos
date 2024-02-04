"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const views_routes_1 = __importDefault(require("../routes/views.routes"));
const extract_client_default_data_1 = __importDefault(require("../middlewares/extract_client_default_data"));
const router = (0, express_1.Router)();
// internal route start with "/__route_name"
router.use(extract_client_default_data_1.default);
router.use(views_routes_1.default);
const internalRoutes = router;
exports.default = internalRoutes;
