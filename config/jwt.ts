const jwt = require("jsonwebtoken");

export const create_access_token = (object: object) =>
  jwt.sign(object, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "365d",
  });

export const create_refresh_token = (object: object) =>
  jwt.sign(object, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "365d",
  });
