"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
sequelize
    .authenticate()
    .then(() => console.log(`DB Connected`))
    .catch((error) => console.log(`DB Connection ERROR: ${error?.message}`));
sequelize.sync();
exports.default = sequelize;
