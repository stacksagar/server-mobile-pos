"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_response = exports.not_found = void 0;
function not_found(_req, res) {
    res.render(`../views/pages/not-found.ejs`);
}
exports.not_found = not_found;
function error_response(error, _req, res) {
    if (error?.status)
        return res.status(error.status).json({
            message: error?.message,
        });
    if (error)
        return res.status(403).json({ message: error?.message || error });
    return res
        .status(500)
        .json({ message: `Error From Server, Please Contact with Developer!` });
}
exports.error_response = error_response;
