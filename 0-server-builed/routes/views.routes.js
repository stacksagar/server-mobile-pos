"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const home_controller_1 = __importDefault(require("../views_controller/home.controller"));
const register_controller_1 = __importDefault(require("../views_controller/register.controller"));
const login_controller_1 = __importDefault(require("../views_controller/login.controller"));
const page_controllers_1 = __importDefault(require("../views_controller/page.controllers"));
const product_controllers_1 = __importDefault(require("../views_controller/product.controllers"));
const viewRoutes = express_1.default.Router();
viewRoutes.get("/", home_controller_1.default);
viewRoutes.get("/register", register_controller_1.default.get);
viewRoutes.post("/register", register_controller_1.default.post);
viewRoutes.get("/login", login_controller_1.default.get);
viewRoutes.post("/login", login_controller_1.default.post);
viewRoutes.get(`/pages/:slug`, page_controllers_1.default.get);
// product
viewRoutes.get(`/items`, product_controllers_1.default.products);
viewRoutes.get(`/item/:slug`, product_controllers_1.default.singleProduct);
exports.default = viewRoutes;
