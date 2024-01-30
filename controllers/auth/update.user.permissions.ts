import { Request, Response } from "express";
import error_res from "../../utils/error_res";
import { PermissionT } from "../../global.types";
import Permission from "../../models/Permission";
import User from "../../models/User";

export default async function updateUserPermissions(
  req: Request,
  res: Response
) {
  const id = req.params?.id;
  const req_permission = req.body?.permission as PermissionT;
  const p_id = req_permission?.id;

  try {
    const user = await User.findOne({
      where: { id },
    });

    if (p_id) {
      const permission = await Permission.findOne({
        where: { id: p_id },
      });

      // @ts-ignore
      permission.values = req_permission.values;
      await permission?.save();
    } else {
      const permission = await Permission.create({
        values: req_permission.values,
      });

      // @ts-ignore
      user.permissionId = permission.dataValues.id;
    }

    // @ts-ignore
    user.role = "custom";
    await user?.save();

    const updatedUser = await User.findOne({
      where: { id },
      include: [
        {
          model: Permission,
          as: "permission",
        },
      ],
    });

    res.json(updatedUser);
  } catch (error) {
    error_res(res, error);
  }
}
