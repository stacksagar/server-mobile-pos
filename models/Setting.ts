import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { SettingT } from "../global.types";
import setStringifyJSON from "../utils/setStringifyJSON";
import getParseIntoJSON from "../utils/getParseIntoJSON";

class Setting extends Model<SettingT> {}

Setting.init(
  {
    client: {
      type: DataTypes.JSON,
      get: getParseIntoJSON("client"),
      set: setStringifyJSON("client"),
    },

    admin: {
      type: DataTypes.JSON,
      get: getParseIntoJSON("admin"),
      set: setStringifyJSON("admin"),
    },
  },
  {
    tableName: "settings",
    sequelize,
  }
);

export default Setting;
