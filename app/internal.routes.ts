import { Router } from "express";
import viewRoutes from "../routes/views.routes";
const router = Router();

// internal route start with "/__route_name"

router.use(viewRoutes);

const internalRoutes = router;
export default internalRoutes;
