"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkWeekYearEqual(date) {
    if (!date)
        return false;
    // Get the current date
    var firstDate = new Date();
    // Get the previous date
    var secondDate = new Date(date);
    secondDate.setDate(secondDate.getDate() - 1);
    // Compare the month and year
    if (secondDate.getMonth() === firstDate.getMonth() &&
        secondDate.getFullYear() === firstDate.getFullYear()) {
        return true;
    }
    else {
        return;
    }
}
exports.default = checkWeekYearEqual;
