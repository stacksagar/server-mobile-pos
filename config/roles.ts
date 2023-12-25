import { Roles } from "../global.types";

const roles_volume: any = {
  user: 1,
  moderator: 2,
  admin: 3,
};

export const roles = {
  user: "user",
  moderator: "moderator",
  admin: "admin",
};

/**
 *
 * @param {'user' | 'moderator' | 'admin'} min_required_role
 * @param {'user' | 'moderator' | 'admin'} user_role
 */

function roles_checker(user_role: Roles, min_required_role: Roles) {
  if (roles_volume[user_role] >= roles_volume[min_required_role]) return true;
  else return false;
}

module.exports = {
  roles,
  roles_checker,
};
