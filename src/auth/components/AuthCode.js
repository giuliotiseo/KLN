import React, { useRef, useState } from 'react';
import { Auth } from 'aws-amplify';
// Global
import ActionButton from '../../globals/components/buttons/ActionButton';
// Data Entry
import FormTextRef from '../../globals/components/dataEntry/FormTextRef';
import { toast } from 'react-toastify';

export default function AuthCode({ formController, setFormController }) {
  const [ loading, setLoading ] = useState(false);
  const username = formController?.data?.username || 'unknown :(' ;
  const authCode = useRef(null);

  async function confirmSignUp() {
    if(loading) return null;
    
    try {
      setLoading(true);
      Auth.confirmSignUp(username, authCode.current.value).then(() => {
        setLoading(false);
        setFormController({ view: 'signIn' })
      });
    }

    catch(error) { 
      toast.error('Errore nella conferma account');
      console.log('Errore in Confirm Sign Up', error);
    }
  }
  
  async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
    }
  }

  return (
    <form autoComplete="off" onSubmit={e => e.preventDefault()} className="flex px-4 bg-base-100 flex-col justify-center h-screen">
      <div className="flex flex-col items-center h-full justify-center py-4">
        <div className="flex flex-col mr-auto">
          <h1 className="font-bold text-2xl text-dark-300 dark:text-light-100">
            Fantastico!
          </h1>
          <p className="mt-2 mb-5 text-dark-300 dark:text-light-100">Abbiamo inviato un'email all'indirizzo <b>{username}</b></p>
        </div>

        <div className="w-full">
          <FormTextRef
            name="authCode"
            label="Inserisci codice di conferma"
            type="text"
            textRef={authCode}
            placeholder="es: 123456"
          />

          <div className="block items-center justify-center">
            <p className="mr-2 text-center text-dark-300 dark:text-light-100">Non hai ricevuto il codice di conferma?</p>
            <div className="text-center">
              <ActionButton 
                text="Reinvia il codice"
                styles="btn--center btn-ghost mx-auto"
                onClick={() => resendConfirmationCode()} 
              />
            </div>

            <ActionButton
              onClick={confirmSignUp}
              styles="btn--center btn-wide btn-primary"
              loading={loading}
              text="Conferma"
            />
          </div>

          <div className="flex items-center justify-center text-sm">
            <p className="text-dark-300 dark:text-light-100">Hai già confermato il tuo account?</p>
            <ActionButton
              text="Accedi"
              styles="btn--center btn-ghost"
              onClick={() => setFormController({ view: 'signIn' })}
            />
          </div>
        </div>
      </div>
    </form>
  )
}