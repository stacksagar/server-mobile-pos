import express from "express";
import signupController from "../controllers/auth/signup";
import signinController from "../controllers/auth/signin";
import readUsers from "../controllers/auth/read.users";
import refreshController from "../controllers/auth/refresh";
import createUser from "../controllers/auth/create.user";
import updateUser from "../controllers/auth/update.user";
import logoutController from "../controllers/auth/logout";
import readModerators from "../controllers/auth/read.moderators";
import readUser from "../controllers/auth/read.user";
import updateUserPermissions from "../controllers/auth/update.user.permissions";
import deleteUsers from "../controllers/auth/deleteUsers";
const authRoutes = express.Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/signin", signinController);
authRoutes.get("/refresh", refreshController);
authRoutes.get("/logout", logoutController);

// users
authRoutes.post("/user", createUser);
authRoutes.get("/user/all", readUsers);
authRoutes.get("/user/:id", readUser);
authRoutes.get("/moderators/all", readModerators);
authRoutes.put("/user/:id", updateUser);
authRoutes.put("/user/permissions/:id", updateUserPermissions);
authRoutes.delete("/user", deleteUsers);
authRoutes.delete("/customer", deleteUsers);

export default authRoutes;
