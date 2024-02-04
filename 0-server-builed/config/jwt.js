"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_refresh_token = exports.create_access_token = void 0;
const jwt = require("jsonwebtoken");
const create_access_token = (object) => jwt.sign(object, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "365d",
});
exports.create_access_token = create_access_token;
const create_refresh_token = (object) => jwt.sign(object, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "365d",
});
exports.create_refresh_token = create_refresh_token;
