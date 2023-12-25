import express from "express";
import signupController from "../controllers/auth/signup";
import signinController from "../controllers/auth/signin";
import readUsers from "../controllers/auth/read.users";
import refreshController from "../controllers/auth/refresh";
const authRoutes = express.Router();

authRoutes.post("/signup", signupController);

authRoutes.post("/signin", signinController);
authRoutes.get("/refresh", refreshController);

authRoutes.get("/users", readUsers);

export default authRoutes;
