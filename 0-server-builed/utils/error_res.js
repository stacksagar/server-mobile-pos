"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function error_res(res, error) {
    res
        .status(400)
        .json({ message: typeof error === "string" ? error : error?.message });
}
exports.default = error_res;
