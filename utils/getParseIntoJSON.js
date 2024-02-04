export default function getParseIntoJSON(key = "") {
  return function () {
    const data = this.getDataValue(key);
    if (typeof data === "string") {
      const parsed = JSON.parse(data);
      return typeof parsed === "object" ? parsed : JSON.parse(parsed);
    } else {
      return data;
    }
  };
}

module.exports = getParseIntoJSON;
