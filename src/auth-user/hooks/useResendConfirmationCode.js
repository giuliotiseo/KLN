import { Auth } from "aws-amplify";
import { useState } from "react";
import { toast } from "react-toastify";

// Resend confirmation code -----------------------------------------------------------------------------------------------------------
export default function useResendConfirmationCode() {
  const [ loading, setLoading ] = useState(false);

  async function handleResendConfirmationCode(username) {
    setLoading(true);
    try {
      await Auth.resendSignUp(username);
      toast.info(`Abbiamo inviato un nuovo codice di conferma all'indirizzo ${username}`);
      console.log('code resent successfully');
      setLoading(false);
    } catch (err) {
      console.log('error resending code: ', err);
      setLoading(false);
    }
  }

  return ({
    isLoading: loading,
    resendConfirmationCode: (username) => handleResendConfirmationCode(username)
  })
}