"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isTodayDate(date) {
    if (!date)
        return false;
    return new Date().toDateString() === new Date(date).toDateString();
}
exports.default = isTodayDate;
