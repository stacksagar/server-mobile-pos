"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("../controllers/auth/signup"));
const signin_1 = __importDefault(require("../controllers/auth/signin"));
const read_users_1 = __importDefault(require("../controllers/auth/read.users"));
const refresh_1 = __importDefault(require("../controllers/auth/refresh"));
const create_user_1 = __importDefault(require("../controllers/auth/create.user"));
const update_user_1 = __importDefault(require("../controllers/auth/update.user"));
const logout_1 = __importDefault(require("../controllers/auth/logout"));
const read_moderators_1 = __importDefault(require("../controllers/auth/read.moderators"));
const read_user_1 = __importDefault(require("../controllers/auth/read.user"));
const update_user_permissions_1 = __importDefault(require("../controllers/auth/update.user.permissions"));
const authRoutes = express_1.default.Router();
authRoutes.post("/signup", signup_1.default);
authRoutes.post("/signin", signin_1.default);
authRoutes.get("/refresh", refresh_1.default);
authRoutes.get("/logout", logout_1.default);
// users
authRoutes.post("/user", create_user_1.default);
authRoutes.get("/user/all", read_users_1.default);
authRoutes.get("/user/:id", read_user_1.default);
authRoutes.get("/moderators/all", read_moderators_1.default);
authRoutes.put("/user/:id", update_user_1.default);
authRoutes.put("/user/permissions/:id", update_user_permissions_1.default);
exports.default = authRoutes;