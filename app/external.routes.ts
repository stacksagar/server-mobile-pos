import { Router } from "express";
import authRoutes from "../routes/auth.routes";
const router = Router();

// external route start with "/api/__route_name"

router.get(`/health`, (_, res) => res.status(200).json({ message: "ok" }));
router.use("/auth", authRoutes);

const externalRoutes = router;
export default externalRoutes;
