"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkLastYear(date) {
    if (!date)
        return false;
    // Get the current date
    var currentDate = new Date();
    // Get the previous year's date
    var lastYearDate = new Date(date);
    // Compare the year
    return lastYearDate.getFullYear() === currentDate.getFullYear();
}
exports.default = checkLastYear;
