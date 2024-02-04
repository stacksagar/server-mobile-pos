"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadWithMulter_1 = __importDefault(require("../middlewares/uploadWithMulter"));
const error_res_1 = __importDefault(require("../utils/error_res"));
const uploadRoutes = express_1.default.Router();
uploadRoutes.post("/single", uploadWithMulter_1.default.single("file"), (req, res) => {
    try {
        // @ts-ignore
        const filelink = req.filelink;
        res.status(200).json({ secure_url: filelink, url: filelink });
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
});
exports.default = uploadRoutes;
