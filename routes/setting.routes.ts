import express from "express";
import readSetting from "../controllers/setting.controller/read.setting";
import updateSetting from "../controllers/setting.controller/update.setting";
import createSetting from "../controllers/setting.controller/create.setting";
const settingRoutes = express.Router();

settingRoutes.post("/", createSetting);
settingRoutes.get("/", readSetting);
settingRoutes.put("/", updateSetting);

export default settingRoutes;
