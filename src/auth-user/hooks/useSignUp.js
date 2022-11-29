import { Auth } from "aws-amplify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatUserToAccount, validateSignUpAccount } from "../libs/helpers";
import { removeSpacesFromString } from "../../globals/libs/helpers";
import { digestMessage } from "../../globals/libs/sha256";

// Sign up -----------------------------------------------------------------------------------------------------------
export default function useSignUp() {
  const [ loading, setLoading ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);
  const navigate = useNavigate();

  const handleSignUp = async (user) => {
    setLoading(true);

    // Run fields validation
    const validation_results = validateSignUpAccount(user);
    if(validation_results?.length > 0) {
      setValidationError(validation_results);
      setLoading(false);

      console.groupCollapsed("Validation fails");
      for(const error of validation_results) console.error(error, user?.[error]);
      console.groupEnd();

      throw Error("Validation failure");
    } else {
      setValidationError([]);
    }

    // Try tu push data to AWS Cognito
    try {
      // const raw_tenant = `${removeSpacesFromString(user.vatNumber.toUpperCase())}-${user.location.place_id}`
      // const tenant = await digestMessage(raw_tenant);
      const account = formatUserToAccount(user);
      console.log("Account:", account);
      const cognitoUser = await Auth.signUp(account);
      setLoading(false);
      toast.info(`Abbiamo inviato un'email all'indirizzo ${user.username} con il codice di conferma`);
      console.log('Utente registrato nel pool', cognitoUser);
      // Redirect after success
      navigate("/authcode", {
        search: `?query=${user.username}`,
        state: user
      });

    } catch(error) {
      console.error(error);
      setLoading(false);
      if(error.code === "UsernameExistsException") {
        toast.error('Questa email è già stata usata per la registrazione di un account');
        user?.username && toast.info('Si prega di richiedere l\'invio dell\'invito su un\'email non utilizzata in precedenza');
      }

      throw Error("Error during sign up operation", error);
    }
  }

  return [
    { isLoading: loading, validationError },
    handleSignUp
  ]
}