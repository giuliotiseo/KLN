import { useRef, useState } from 'react';
import { Auth } from 'aws-amplify';
// Global
import ActionButton from '../../globals/components/buttons/ActionButton';
// Data Entry
import { FormTextRef, FormPasswordRef } from '../../globals/components/dataEntry';

export default function ResetPassword({ setFormController }) {
  const [ loading, setLoading ] = useState(false);
  const [step, setStep] = useState(1);
  const username = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const confirmCode = useRef(null);

  // Reset password and go back to login screen
  async function resetPassword(username, new_password, confirmCode) {
    setLoading(true);
    try {
      await Auth.forgotPasswordSubmit(username, confirmCode, new_password);
      setFormController({ view: "signIn"});
    } catch (error) {
      console.log('login.js: reset_password: error:', error);
    }
    setLoading(false);
  }
  
  // Check if user exists and send confirmation code
  async function checkUsername(username) {
    setLoading(true);
    try {
      await Auth.forgotPassword(username);
      setStep(2);
    } catch (error) {
      console.log('login.js: checkUsername: error:', error);
    }
    setLoading(false);
  }

  return (
    <form autoComplete="off" onSubmit={e => e.preventDefault()} className="flex px-4 bg-base-100 flex-col justify-center h-screen">
      <div className="flex flex-col items-center h-full justify-center">
        <div className="flex flex-col mr-auto mb-4">
          <h1 className="font-bold text-2xl text-dark-300 dark:text-light-100">
            Niente panico
          </h1>
          <p className="mt-2 text-dark-300 dark:text-light-100">Per recuperare la password basterà inviare la tua email compilando il modulo in basso</p>
        </div>
        
        <section style={{ visibility: `${step !== 1 ? 'hidden' : 'visible'}`, height: `${step !== 1 ? 0 : 'auto'}`, overflow: `hidden`}} className="w-full">        
          <FormTextRef 
            name="username"
            textRef={username}
            label="Inserisci email"
            type="email"
            placeholder="es: mario.rossi@lts.it"
          />

          <div className="mt-4">
            <ActionButton 
              text="Recupera la password"
              styles="btn--center btn-wide btn-primary"
              loading={loading}
              onClick={() => {
                if (username.current.value !== '') {
                  checkUsername(username.current.value);
                } else {
                  console.log('Error: empty mandatory fields');
                }
              }}
            />

            <div className="flex items-center justify-center text-sm">
              <p className="text-dark-300 dark:text-light-100">Ricordi la tua password?</p>
              <ActionButton 
                text="Accedi"
                styles="btn--center btn-ghost"
                onClick={() => setFormController({ view: 'signIn' })}
              />
            </div>
          </div>
        </section>

      { step === 2 && (
        <section className="w-full">        
          <FormPasswordRef 
            name="password"
            label="Inserisci la nuova password"
            passwordRef={password}
            placeholder="es: ********"
          />

          <FormPasswordRef
            name="confirmPassword"
            label="Conferma la nuova password"
            passwordRef={confirmPassword}
            placeholder="es: ********"
          />

          <FormTextRef 
            name="confirmCode"
            label="Inserisci codice di conferma"
            type="text"
            textRef={confirmCode}
            placeholder="es: 123456"
          />

          <div className="mt-4">
            <ActionButton 
              text="Conferma"
              styles="btn--center btn-wide btn-primary"
              loading={loading}
              onClick={() => {
                // Check for empty fields
                if (username.current.value !== '' && password.current.value !== '' && confirmPassword.current.value !== '' && confirmCode.current.value !== '') {
                
                  // Check for password length
                  if (password.current.value.length >= 8 && confirmPassword.current.value.length >= 8 && password.current.value === confirmPassword.current.value) {
                    resetPassword(username.current.value, password.current.value, confirmCode.current.value);
                  } else {
                    // TODO show warning inside UI
                    console.log('Error: password fields must match');
                  }
                } else {
                  // TODO show warning inside UI
                  console.log('Error: empty mandatory fields');
                }
              }}
            />

            <div className="flex items-center justify-center text-sm">
              <p>Ricordi la tua password?</p>
              <ActionButton 
                text="Accedi"
                styles="btn--center btn-ghost"
                onClick={() => setFormController({ view: 'signIn' })}
              />
            </div>
          </div>
        </section>
      )}
      </div>
    </form>
  )
}