import { Router } from "express";
import viewRoutes from "../routes/views.routes";
import extract_client_default_data from "../middlewares/extract_client_default_data";
const router = Router();

// internal route start with "/__route_name"
router.use(extract_client_default_data);
router.use(viewRoutes);

const internalRoutes = router;
export default internalRoutes;
