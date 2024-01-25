export default function checkLastYear(date?: string) {
  if (!date) return false;
  // Get the current date
  var currentDate = new Date();

  // Get the previous year's date
  var lastYearDate = new Date(date);

  // Compare the year
  return lastYearDate.getFullYear() === currentDate.getFullYear();
}
