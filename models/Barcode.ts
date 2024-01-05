import { DataTypes, Model } from "sequelize";
import sequelize from "./connection";
import { BarcodeT } from "../global.types";
import Product from "./Product";
import getParseIntoJSON from "../utils/getParseIntoJSON";
import setStringifyJSON from "../utils/setStringifyJSON";

class Barcode extends Model<BarcodeT> {}

Barcode.init(
  {
    barcode: {
      type: DataTypes.STRING("250"),
      allowNull: true,
    },

    barcodes: {
      type: DataTypes.JSON,
      get: getParseIntoJSON("barcodes"),
      set: setStringifyJSON("barcodes"),
    },

    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },

    with_multi: {
      type: DataTypes.INTEGER,
      defaultValue: false,
    },
  },
  {
    tableName: "barcodes",
    sequelize,
  }
);

// Product with Category Relation
Barcode.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

export default Barcode;
