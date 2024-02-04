// for set json data as a string in mysql table field
export default function setStringifyJSON(key = "") {
  return function (value) {

    this.setDataValue(key, value);

    // if (typeof value === 'string') {
    //   this.setDataValue(key, value);
    // } else {
    //   this.setDataValue(key, JSON.stringify(value));
    // }
  };
}

