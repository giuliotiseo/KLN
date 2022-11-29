import { useState, useRef } from 'react';
import { Auth } from 'aws-amplify';
// Global
import { FormTextRef, FormPasswordRef } from '../../globals/components/dataEntry';
import ActionButton from '../../globals/components/buttons/ActionButton';
// Styles
import { ReactComponent as LogoImg } from '../../globals/assets/logo.svg';
import { toast } from 'react-toastify';

export default function SignIn({ setFormController }) {
  const [ loading, setLoading ] = useState(false);
  const username = useRef(null);
  const password = useRef(null);

  async function signIn() {
    setLoading(true);
    if(username.current.value) {
      console.log(username.current.value);
      try {
        console.log('Sign In');
        // Amplify Hub will intercept the 'signin' event and log the user in
        await Auth
          .signIn(username.current.value, password.current.value)
          .then(user => {
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
              toast.info('È richiesta una nuova password');
              setLoading(false);
              setFormController({ view: 'restorePassword', data: { username: username.current.value, password: password.current.value }});
            }
            // RIMOSSO PER RISOLVERE PROBLEMA CLEANUP
            // else {
            //   setLoading(false);
            //   setFormController({ view: 'signedIn', data: { username: username.current.value, password: password.current.value }});
            // }
          });
      }
      catch(error) { 
        setLoading(false);
        if (error.code === 'UserNotConfirmedException') {
          setFormController({ view: 'authCode', data: { username: username.current.value }});
        } else if (error.code === 'NotAuthorizedException') {
          toast.error('Errore, ricontrolla i dati inseriti')
        } else {
          toast.error(`Errore: ${error.message}`);
        }
      }
    } else {
      setLoading(false);
      // To do: Toast che informa l'entità dell'errore: Impossibile raggiungere l'utente
      setFormController({ view: 'signIn', data: { username: username.current.value, password: password.current.value }});
    }
  }


  return (
    <form autoComplete="off" onSubmit={e => e.preventDefault()} className="h-screen flex px-4 bg-base-100 shadow-2xl flex-col justify-center">
      <div className="flex flex-col items-center h-full justify-center py-4">
        <div className="flex flex-col mb-8">
          <div className="flex items-center mb-4">
            <LogoImg className="w-10 h-auto mr-4" />
            <h3 className="text-4xl font-bold text-dark-300 dark:text-light-100">LTS</h3>
          </div>

          <h1 className="font-bold text-2xl text-dark-300 dark:text-light-100">Ti diamo il benvenuto su LTS Manager</h1>
          <p className="mt-2 text-dark-300 dark:text-light-100">
            Ricevi ordini dai tuoi clienti, programma la tua logistica e monitora i progressi della tua azienda di trasporti. Ottieni il massimo dai servizi LTS e fai crescere il tuo business.
          </p>
        </div>

        <div className="w-full">
          <FormTextRef
            name="username"
            label="Inserisci email"
            type="email"
            textRef={username}
            placeholder="es: mario.rossi@lts.it"
          />

          <FormPasswordRef 
            name="password"
            label="Inserisci password"
            passwordRef={password}
            placeholder="es: ******"
          />
        </div>

        <div 
          onClick={() => setFormController({ view: 'forgotPassword', data: { username: username.current.value }})} 
          className="relative mb-2 text-secondary-100 dark:text-secondary-300 bg-transparent cursor-pointer inline-block opacity-80 hover:opacity-100"
        >
          Ho dimenticato la password
        </div>
        
        <div className="flex flex-col w-full">
          <ActionButton
            text="Accedi"
            styles="btn--center btn-wide btn-primary"
            onClick={signIn}
            loading={loading}
          />

          <div className="flex items-center justify-center text-sm">
            <p className="text-dark-300 dark:text-light-100">Non hai ancora un account?</p>
            <ActionButton
              text="Registrati"
              styles="btn--center btn-ghost"
              onClick={() => setFormController({ view: 'signUp'}) }
            />
          </div>
        </div>
      </div>
    </form>
  )
}