"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const credentials_1 = __importDefault(require("./credentials"));
const corsOptions_1 = __importDefault(require("./corsOptions."));
const middlewares = [
    (0, morgan_1.default)("dev"),
    express_1.default.static("public"),
    express_1.default.static("uploads"),
    credentials_1.default,
    corsOptions_1.default,
    express_1.default.urlencoded({ extended: false }),
    express_1.default.json(),
    (0, cookie_parser_1.default)(),
];
exports.default = middlewares;
