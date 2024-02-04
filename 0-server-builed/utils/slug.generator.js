"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uid_1 = require("uid");
function slugGenerator(text) {
    if (!text)
        return (0, uid_1.uid)(12).toString();
    return text
        .replaceAll(" ", "-")
        .replaceAll("/", "-")
        .replaceAll("|", "-")
        .replaceAll("&", "and")
        .replaceAll("%", "-")
        .toLowerCase();
}
exports.default = slugGenerator;
