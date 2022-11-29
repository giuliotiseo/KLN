import { Auth } from "aws-amplify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { passwordHasErrors } from "../libs/helpers";

// Restore password -----------------------------------------------------------------------------------------------------------=
export default function useRestorePassword()  {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);
  const navigate = useNavigate();

  // Validate input fields and confirm password change
  function submitRestorePassword (username, tempPassword, password, confirmPassword) {
    let error = false;
    let _passwordError = '';
    let _confirmPasswordError = '';

    // Check password errors
    _passwordError = passwordHasErrors(password);
    if (_passwordError) {
      setError(true);
      toast.error(_passwordError);
    }

    // Check confirm password errors
    _confirmPasswordError = passwordHasErrors(confirmPassword);
    if (!_confirmPasswordError && password !== confirmPassword) {
      setError(true);
      toast.error('Le password non coincidono');
    }

    if (_confirmPasswordError) {
      setError(true);
      toast.error(_confirmPasswordError);
    }

    // Confirm password change
    if (!error) changePassword(username, tempPassword, password);
  }

  // Complete new user signin process by changing password
  function changePassword(username, tempPassword, newPassword) {
    setLoading(true);
    Auth.signIn(username, tempPassword)
    .then(user => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          Auth.completeNewPassword(
              user,
              newPassword,
          ).then(user => {
              console.log(user);
              navigate("/", { state: user });
          }).catch(e => {
            toast.error(`Errore ${e}`)
            console.log(e);
          });
        }
      }).catch(e => {
        console.log(e);
    });
    
    setLoading(false);
  }

  return {
    submitRestorePassword,
    isError: error,
    isLoading: loading,
  }
}