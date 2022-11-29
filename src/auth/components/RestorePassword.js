import React, { useRef, useState } from 'react'
// Amplify Cognito authentication
import { Auth } from 'aws-amplify';
// Components
import ActionButton from '../../globals/components/buttons/ActionButton';
import FormPasswordRef from '../../globals/components/dataEntry/FormPasswordRef';
// Utils
import { passwordHasErrors } from '../libs/helpers';
import { toast } from 'react-toastify';

/* - Main -------------------------------------------------------------------------------------- */

export default function RestorePassword({ formController, setFormController }) {
  const [ loading, setLoading ] = useState();
  const username = formController.data.username;
  const tempPassword = formController.data.password;
  const password = useRef(null);
  const confirmPassword = useRef(null);

  // Validate input fields and confirm password change
  function validateAndSubmit () {
    let error = false;
    let _passwordError = '';
    let _confirmPasswordError = '';

    // Check password errors
    _passwordError = passwordHasErrors(password.current.value);
    if (_passwordError) {
      error = true;
      toast.error(_passwordError);
    }
    // Check confirm password errors
    _confirmPasswordError = passwordHasErrors(confirmPassword.current.value);
    if (!_confirmPasswordError && password.current.value !== confirmPassword.current.value) {
      error = true;
      toast.error('Le password non coincidono');
    }
    if (_confirmPasswordError) {
      error = true;
      toast.error(_confirmPasswordError);
    }

    // Confirm password change
    if (!error) changePassword(password.current.value);
  }

  // Complete new user signin process by changing password
  function changePassword(newPassword) {
    setLoading(true);
    Auth.signIn(username, tempPassword)
    .then(user => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          Auth.completeNewPassword(
              user,
              newPassword,
          ).then(user => {
              console.log(user);
              setFormController({ view: 'signedIn', data: { username: username, password: newPassword }});
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

  return (
    <form autoComplete="off" onSubmit={e => e.preventDefault()} className="flex px-4 bg-base-100 flex-col justify-center h-screen">
      <div className="flex flex-col items-center h-full justify-center py-4">
        <div className="flex flex-col mr-auto">
          <h1 className="font-bold text-2xl text-dark-300 dark:text-light-100">
            Inserisci la tua password
          </h1>
          <p className="mt-2 mb-5 text-dark-300 dark:text-light-100">Per la tua sicurezza, inserisci una nuova password</p>
        </div>

        <div className="w-full">
          <FormPasswordRef 
            name="password"
            label="Inserisci una nuova password"
            passwordRef={password}
            placeholder="es: ******"
            mb={3}
          />

          {/* Confirm Password */}
          <FormPasswordRef 
            name="password"
            label="Conferma la password"
            passwordRef={confirmPassword}
            placeholder="es: ******"
            mb={3}
          />
        </div>
      
        <div className="w-full mt-4">
          <ActionButton 
            text="Conferma"
            styles="btn--center btn-wide btn-primary"
            onClick={validateAndSubmit} 
            loading={loading}
          />
        </div>
      </div>
    </form>
  )
}