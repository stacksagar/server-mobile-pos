import { Router } from "express";
import authRoutes from "../routes/auth.routes";
import productRoutes from "../routes/product.routes";
import uploadRoutes from "../routes/upload.routes";
import settingRoutes from "../routes/setting.routes";
import supplierRoutes from "../routes/supplier.routes";
import adminPanelRoutes from "../routes/admin.panel.routes";
import supplierHistoryRoutes from "../routes/supplier.history.routes";
import customerRoutes from "../routes/customer.routes";
import barcodeRoutes from "../routes/barcode.routes";
const router = Router();

// external route start with "/api/__route_name"
router.get(`/health`, (_, res) => res.status(200).json({ message: "ok" }));
router.use("/auth", authRoutes);
router.use("/setting", settingRoutes);
router.use("/upload", uploadRoutes);
router.use("/product", productRoutes);
router.use("/admin", adminPanelRoutes);
router.use("/supplier", supplierRoutes);
router.use("/supplier-history", supplierHistoryRoutes);
router.use("/customer", customerRoutes);
router.use("/barcode", barcodeRoutes);

const externalRoutes = router;
export default externalRoutes;
