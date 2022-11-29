import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';
import { useLoadScript } from '@react-google-maps/api';
// Components
import AppRouter from './AppRouter';
import PageSpinner from './globals/components/layout/PageSpinner';
import ConnectionLost from './globals/components/layout/ConnectionLost';
import useSignOut from './auth-user/hooks/useSignOut';
import { CognitoContext } from './globals/libs/context';

// Settings
const GOOGLE_API = process.env.REACT_APP_GOOGLE_API_KEY;
const libraries = ["places"];

// Main component
export default function AppContainer() {
  const [ loading, setLoading ] = useState(true);
  const [ userFromCognito, setUserFromCognito ] = useState(null);
  const { signOut } = useSignOut();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API,
    libraries
  });

  // useEffect(() => {
  //   signOut();
  // }, [])

  // Get logged user info async wrapper
  const getAuthenticatedUser = useCallback(() => {
    Auth.currentAuthenticatedUser().then(async (authUser) => {
      if (authUser?.username) {
        setLoading(true);
        setUserFromCognito(authUser);
        setLoading(false);
      } else {
        setLoading(false);
        setUserFromCognito(null);
        console.log('Exit protocol - user initialization failed');
        signOut();
      }
    }).catch(error => {
      // Auth treats 'not authenticated' as an error
      if (error !== 'not authenticated') {
        console.log('getAuthenticatedUser error:', error);
        setLoading(false);
        signOut();
      }
    });
  }, [signOut]);

  // Amplify auth events listener
  const authListener = useCallback(async (data) => {
    console.log('authListener: event:', data.payload.event);
    switch (data.payload.event) {
      case 'signIn':
        setLoading(true);
        getAuthenticatedUser();
        break;
      case 'signUp':
        console.log('User signed up');
        break;
      case 'signOut':
        // Reset cognito data
        setLoading(false);
        setUserFromCognito(null);
        localStorage.removeItem("username");
        console.log('User signed out');
        break;
      default:
        return null
    }
  }, [getAuthenticatedUser]);


  useEffect(() => {
    if(!userFromCognito) {
      // Capisco se sono loggato o no
      getAuthenticatedUser();
    }
    // Set Amplify auth events listener
    const authListenerHub = Hub.listen('auth', authListener);    
    return () => authListenerHub();
  }, [userFromCognito, authListener, getAuthenticatedUser]);

  if(loadError) return <ConnectionLost />;
  if(loading || !isLoaded) return <PageSpinner />;

  return (
    <BrowserRouter>
      <CognitoContext.Provider value={userFromCognito}>
        <AppRouter />
      </CognitoContext.Provider>
    </BrowserRouter>
  );
}