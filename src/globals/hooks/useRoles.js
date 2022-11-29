import { useSelector } from "react-redux";
import { selectCurrentRoles } from "../../auth-profile/slices/authProfileSlice";

export default function useRoles() {
  const roleIds = useSelector(selectCurrentRoles);
  return roleIds;
}