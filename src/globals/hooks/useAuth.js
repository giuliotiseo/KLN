import { useContext } from "react";
import { useSelector } from "react-redux";
import { selectCurrentProfile } from "../../auth-profile/slices/authProfileSlice";
import { CognitoContext } from "../libs/context";

// Get cognito user
export function useAuth() {
  const profile = useSelector(selectCurrentProfile);
  return {
    auth: useContext(CognitoContext),
    profile
  };
}