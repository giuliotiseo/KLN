import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectCurrentToken } from "../../auth-profile/slices/authProfileSlice";
import PrivateAppLayout from "../layout/PrivateAppLayout";

const RequireProfile = () => {
  const location = useLocation();
  const token = useSelector(selectCurrentToken);


  return  (
    token
      ? <PrivateAppLayout>
          <Outlet />
        </PrivateAppLayout>
      : <Navigate to="/browse" state={{ from: location }} replace />
  )
}

export default RequireProfile;