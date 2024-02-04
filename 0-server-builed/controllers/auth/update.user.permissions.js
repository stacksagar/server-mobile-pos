"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_res_1 = __importDefault(require("../../utils/error_res"));
const Permission_1 = __importDefault(require("../../models/Permission"));
const User_1 = __importDefault(require("../../models/User"));
async function updateUserPermissions(req, res) {
    const id = req.params?.id;
    const req_permission = req.body?.permission;
    const p_id = req_permission?.id;
    try {
        const user = await User_1.default.findOne({
            where: { id },
        });
        if (p_id) {
            const permission = await Permission_1.default.findOne({
                where: { id: p_id },
            });
            // @ts-ignore
            permission.values = req_permission.values;
            await permission?.save();
        }
        else {
            const permission = await Permission_1.default.create({
                values: req_permission.values,
            });
            // @ts-ignore
            user.permissionId = permission.dataValues.id;
        }
        // @ts-ignore
        user.role = "custom";
        await user?.save();
        const updatedUser = await User_1.default.findOne({
            where: { id },
            include: [
                {
                    model: Permission_1.default,
                    as: "permission",
                },
            ],
        });
        res.json(updatedUser);
    }
    catch (error) {
        (0, error_res_1.default)(res, error);
    }
}
exports.default = updateUserPermissions;
