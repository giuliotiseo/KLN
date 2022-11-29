// Dependencies
import { Hub } from "aws-amplify";
// Hooks
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAuthProfilesQuery } from "../../auth-profile/api/auth-profile-api-slice";
import { useGetCompany } from "../../company/hooks/useGetCompany";
// Components
import PageSpinner from "../../globals/components/layout/PageSpinner";
import LogoutOverlay from "../../auth-profile/components/LogoutOverlay";
import SignOutOverlay from "../components/SignOutOverlay";
import PrivateAppRouter from "../router/PrivateAppRouter";
// Helpers
import { selectLogoutScreenMode } from "../slices/appSlice";
import { profileLogOut } from "../../auth-profile/slices/authProfileSlice";

// Main component
export default function PrivateAppContainer() {
  const [ loading, setLoading ] = useState(true);
  const [ signOutLoading, setSignOutLoading ] = useState(false);
  const { company, isLoading: isLoadingCompany } = useGetCompany();
  const { data: profiles, isLoading: isLoadingProfiles } = useGetAuthProfilesQuery();
  const isLoggingOut = useSelector(selectLogoutScreenMode);
  const dispatch = useDispatch();
  
  // Restart from root on first load
  useEffect(() => {
    if(company && profiles) {
      setLoading(false);
    };
  }, [company, profiles]);

  // Amplify auth events listener for cleanup store in case of logout
  const authListener = useCallback(async (data) => {
    console.log('APP authListener:', data.payload.event);
    switch (data.payload.event) {
    case 'signOut':
      setSignOutLoading(true);
      // Clear store
      dispatch(profileLogOut());
      dispatch({ type: 'USER_LOGOUT' });
      break;
      default:
        return null
      }
    }, [dispatch]);
      
  // Listener for logout action
  useEffect(() => {
    // Set Amplify auth events listener
    const logoutListenerHub = Hub.listen('auth', authListener);    
    // Clean up subscriptions and store on dispose
    return () => logoutListenerHub();
  }, [dispatch, authListener]);

  // Waiting render
  if(loading || !company || !profiles || isLoadingCompany || isLoadingProfiles) {
    return <PageSpinner />
  }

  return (
    <main id="PrivateAppContainer">
      { signOutLoading && <SignOutOverlay />}
      { isLoggingOut && <LogoutOverlay />}

      <PrivateAppRouter
        company={company}
        profiles={profiles.ids.map(id => profiles.entities[id])}
      />
    </main>
  )
}