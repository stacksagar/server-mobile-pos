"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const allowedOrigins_1 = __importDefault(require("../config/allowedOrigins"));
const corsOptions = (0, cors_1.default)({
    origin(requestOrigin, callback) {
        if (!requestOrigin || allowedOrigins_1.default.includes(requestOrigin)) {
            callback(null, requestOrigin);
        }
        else {
            callback(new Error("Access Denied by CORS!"));
        }
    },
    optionsSuccessStatus: 200,
});
exports.default = corsOptions;
