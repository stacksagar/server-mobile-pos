import express from "express";
import signupController from "../controllers/auth/signup";
const authRoutes = express.Router();

authRoutes.get("/test", (_req, res) => res.end("test"));
authRoutes.post("/signup", signupController);

export default authRoutes;
