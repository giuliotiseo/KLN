import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../globals/hooks/useAuth";

const RequireOwner = ({ allowedOwners = [] }) => {
  const { auth } = useAuth();
  const location = useLocation();
  if(!auth?.attributes?.sub) return null;
  return  (
    allowedOwners.includes(`${auth.attributes.sub}::${auth.username}`,)
      ? <Outlet />
      : <Navigate to="/unauthorized" state={{ from: location }} replace />
  )
}

export default RequireOwner;