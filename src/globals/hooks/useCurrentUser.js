import { Auth } from "aws-amplify";
import { useCallback, useEffect, useState } from "react";

export default function useCurrentUser() {
  const [ currentAuthUser, setCurrentAuthUser ] = useState(false);

  const getCurrentAuthenticatedUser = useCallback(async () => {
    const user = await Auth.currentAuthenticatedUser();
    setCurrentAuthUser(user);
  }, []);

  useEffect(() => {
    getCurrentAuthenticatedUser();
  }, [getCurrentAuthenticatedUser]);

  return currentAuthUser;
}