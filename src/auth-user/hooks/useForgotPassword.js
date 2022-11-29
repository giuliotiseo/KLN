import { Auth } from "aws-amplify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Forgot password -----------------------------------------------------------------------------------------------------------=
export default function useForgotPassword() {
  const [ loading, setLoading ] = useState(false);
  const [ step, setStep ] = useState(1);
  const navigate = useNavigate();

  // Reset password and go back to login screen
  async function submitResetPassword(username, confirmCode, new_password) {
    setLoading(true);
    try {
      await Auth.forgotPasswordSubmit(username, confirmCode, new_password);
      setLoading(false);
      navigate("/login", {
        state: { username }
      });
    } catch (error) {
      toast.error("Si è verificato un errore: impossibile richiedere il reset della password. Controlla il codice di conferma o contatta il supporto per ricevere assistenza");
      console.log('login.js: reset_password: error:', error);
    }
    setLoading(false);
  }

  // Check if user exists and send confirmation code
  async function submitUsername(username) {
    console.log('username', username)
    setLoading(true);
    try {
      await Auth.forgotPassword(username);
      setLoading(false);
      setStep(2);
    } catch (error) {
      toast.error("Si è verificato un errore: username non valido. Contattare il supporto per ricevere assistenza");
      console.log('login.js: checkUsername: error:', error);
    }
    setLoading(false);
  }

  return {
    step,
    submitUsername,
    submitResetPassword,
    isLoading: loading,
  }
}