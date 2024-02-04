"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPreviousMonth(date) {
    if (!date)
        return;
    const providedDate = new Date(date);
    const currentDate = new Date();
    const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
    return (providedDate.getFullYear() === previousMonthDate.getFullYear() &&
        providedDate.getMonth() === previousMonthDate.getMonth());
}
exports.default = isPreviousMonth;
module.exports = isPreviousMonth;
