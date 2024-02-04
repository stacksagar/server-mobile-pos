"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function modelFilter(req, res) {
    const page = Number(req?.query?.page || "1");
    const limit = Number(req?.query?.limit || "10");
    const offset = limit * (page - 1);
    const conditions = {};
    return { page, limit, offset, conditions };
}
exports.default = modelFilter;
