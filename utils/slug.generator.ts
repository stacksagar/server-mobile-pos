import { uid } from "uid";

export default function slugGenerator(text: string) {
  if (!text) return uid(12).toString();

  return text
    .replaceAll(" ", "-")
    .replaceAll("/", "-")
    .replaceAll("|", "-")
    .replaceAll("&", "and")
    .replaceAll("%", "-")
    .toLowerCase();
}
