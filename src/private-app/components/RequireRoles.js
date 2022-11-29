import { useLocation, Navigate, Outlet } from "react-router-dom";
import useRoles from "../../globals/hooks/useRoles";

const RequireRoles = ({ allowedRoles }) => {
  const roles = useRoles();
  const location = useLocation();

  return  (
    roles.find(role => allowedRoles?.includes(role))
      ? <Outlet />
      : <Navigate to="/unauthorized" state={{ from: location }} replace />
  )
}

export default RequireRoles;