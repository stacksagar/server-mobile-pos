"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./connection"));
const getParseIntoJSON_1 = __importDefault(require("../utils/getParseIntoJSON"));
const setStringifyJSON_1 = __importDefault(require("../utils/setStringifyJSON"));
const User_1 = __importDefault(require("./User"));
class Permission extends sequelize_1.Model {
}
Permission.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    values: {
        type: sequelize_1.DataTypes.TEXT("long"),
        get: (0, getParseIntoJSON_1.default)("values"),
        set: (0, setStringifyJSON_1.default)("values"),
    },
}, {
    tableName: "permissions",
    sequelize: connection_1.default,
});
User_1.default.belongsTo(Permission, {
    foreignKey: "permissionId",
    as: "permission",
});
exports.default = Permission;
