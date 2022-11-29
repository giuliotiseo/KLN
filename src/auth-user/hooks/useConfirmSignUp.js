import { Auth } from "aws-amplify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Confirm sign up -----------------------------------------------------------------------------------------------------------
export default function useConfirmSignUp() {
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  async function handleConfirmSignUp({ username, code }) {
    if(loading) return null;
    
    try {
      setLoading(true);
      Auth.confirmSignUp(username, code).then(() => {
        setLoading(false);
        navigate("/login", {
          state: { username }
        });
      });
    }
  
    catch(error) { 
      toast.error('Errore nella conferma account');
      console.log('Errore in Confirm Sign Up', error);
    }
  }

  return ({
    isLoading: loading,
    confirmSignUp: (data) => handleConfirmSignUp(data)
  })
}