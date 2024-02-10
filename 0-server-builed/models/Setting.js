"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
const setStringifyJSON_1 = __importDefault(require("../utils/setStringifyJSON"));
const getParseIntoJSON_1 = __importDefault(require("../utils/getParseIntoJSON"));
class Setting extends sequelize_1.Model {
}
Setting.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    client: {
        type: sequelize_1.DataTypes.TEXT("long"),
        get: (0, getParseIntoJSON_1.default)("client"),
        set: (0, setStringifyJSON_1.default)("client"),
    },
    admin: {
        type: sequelize_1.DataTypes.TEXT("long"),
        get: (0, getParseIntoJSON_1.default)("admin"),
        set: (0, setStringifyJSON_1.default)("admin"),
    },
}, {
    tableName: "settings",
    sequelize: connection_1.default,
});
exports.default = Setting;
