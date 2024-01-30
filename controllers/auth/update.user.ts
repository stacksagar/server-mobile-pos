import { Request, Response } from "express";
import User from "../../models/User";
import error_res from "../../utils/error_res";
import bcrypt from "bcrypt";
import { PermissionT } from "../../global.types";
import Permission from "../../models/Permission";

export default async function updateUser(req: Request, res: Response) {
  const id = req?.params?.id;
  const { password } = req.body;
  const req_permission = req.body?.permission as PermissionT;

  try {
    if (!id) throw Error("Not Found!");

    const newData = {
      ...req.body,
    };

    console.log("req_permission ", req_permission);

    let permission = await Permission.findOne({
      where: { id: req_permission?.id || 99999999 },
    });

    if (req_permission?.id && permission) {
      await Permission.update(
        { ...req_permission },
        { where: { id: req_permission?.id } }
      );
    } else if (req_permission?.values?.length > 0) {
      permission = await Permission.create({ values: req_permission.values });
    }

    if (password) {
      newData.password = await bcrypt.hash(password, 9);
    } else {
      delete newData.password;
    }

    newData.permissionId = permission?.dataValues.id;

    await User.update(newData, {
      where: { id },
    });

    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Permission,
          as: "permission",
        },
      ],
    });

    res.status(200).json(user);
  } catch (error) {
    error_res(res, error);
  }
}
