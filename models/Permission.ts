import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { PermissionT } from "../global.types";
import getParseIntoJSON from "../utils/getParseIntoJSON";
import setStringifyJSON from "../utils/setStringifyJSON";

import User from "./User";

class Permission extends Model<PermissionT> {}

Permission.init(
  {
    values: {
      type: DataTypes.TEXT("long"),
      get: getParseIntoJSON("values"),
      set: setStringifyJSON("values"),
    },
  },
  {
    tableName: "permissions",
    sequelize,
  }
);

User.belongsTo(Permission, {
  foreignKey: "permissionId",
  as: "permission",
});

export default Permission;
