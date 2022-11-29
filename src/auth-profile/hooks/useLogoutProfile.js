import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutProfileMutation } from "../api/auth-profile-api-slice";
import { profileLogOut, selectCurrentProfile } from "../slices/authProfileSlice";

export default function useLogoutProfile() {
  const profileId = useSelector(selectCurrentProfile);
  const [ logout, { isLoading }] = useLogoutProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutProfile = async () => {
    console.log("Lancio il logout", profileId);
    try {
      await logout({ profileId }).unwrap();
      dispatch(profileLogOut());
      navigate("/");
    } catch(err) {
      console.error("Error", err);
      if(!err?.originalStatus) {
        console.log("No server response");
      } else if(err?.response?.status === 400) {
        console.log("Missing username or password");
      } else if(err.response?.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login failed");
      }
    }
  }

  return [{ loading: isLoading }, handleLogoutProfile]
}
