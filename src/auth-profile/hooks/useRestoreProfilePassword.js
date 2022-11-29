import { API } from "aws-amplify";
import { useState } from "react";
import { toast } from "react-toastify";
import useCurrentUser from "../../globals/hooks/useCurrentUser";

export default function useRestoreProfilePassword(inputProfile) {
  const [ loading, setLoading ] = useState(false);
  const user = useCurrentUser();

  async function restorePassword() {
    if(!inputProfile?.id || !inputProfile?.email) {
      toast.error("Impossibile effettuare l'operazione di ripristino password. Contattare l'assistenza tecnica");
      return null;
    }
    
    try {
      setLoading(true);
      const token = user.signInUserSession.idToken.jwtToken;
      const requestInfo = {
        headers: { Authorization: token },
        body: {
          profileId: inputProfile.id,
          email: inputProfile.email
        }
      }

      const result = await API.post("AuthProfileREST", "/restore", requestInfo);
      console.log("Result /restore", result);
      if(result?.success) {
        toast.success(`Abbiamo inviato la nuova password all'indirizzo ${inputProfile.email}`);
      }
      
      setLoading(false);
    } catch(err) {
      console.error('Err', err);
    }
  }

  return [{
    isLoading: loading,
  }, restorePassword]
}