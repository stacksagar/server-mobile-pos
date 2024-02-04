"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uid_1 = require("uid");
// Set the storage engine and file size limit
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const filename = `${(0, uid_1.uid)()}-${file.originalname.split(" ").join("-")}`;
        const filelink = `${process.env.API}/${filename}`;
        // @ts-ignore
        req.filelink = filelink;
        cb(null, filename);
    },
});
const uploadWithMulter = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5000000 }, // max file size allow 5MB
});
exports.default = uploadWithMulter;
