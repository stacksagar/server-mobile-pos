export default function isTodayDate(date?: string) {
  if (!date) return false;
  return new Date().toDateString() === new Date(date).toDateString();
}
