import { useLocation, Navigate, Outlet } from "react-router-dom";
import useCompanyType from "../../globals/hooks/useCompanyType";

const RequireCompanyType = ({ allowedRoles }) => {
  const companyType = useCompanyType();
  const location = useLocation();

  return  (
    allowedRoles.includes(companyType)
      ? <Outlet />
      : <Navigate to="/unauthorized" state={{ from: location }} replace />
  )
}

export default RequireCompanyType;