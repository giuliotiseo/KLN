import { ROLES_DESCRIPTORS, ROLES_LIST } from "../../globals/libs/helpers";

// Get role from profile id
export const useRole = (roleIds) => {
  const roles = roleIds.map(roleCode => ROLES_LIST[roleCode]);
  const descriptions_array = roleIds.map(roleCode => ROLES_DESCRIPTORS?.[roleCode] || "ruolo sconosciuto");

  return {
    roles,
    roleText: descriptions_array.join(", ")
  }
}

export default useRole;