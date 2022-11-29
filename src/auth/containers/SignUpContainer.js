import { useState, useRef } from 'react';
import { Auth } from 'aws-amplify';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
// Global
import ActionButton from '../../globals/components/buttons/ActionButton';
// Components
import SignUpFromInvite from '../components/SignUpFromInvite';
import SignUpWithoutInvite from '../components/SignUpWithoutInvite';
// Data Entry
import { composePhoneNumber, queryStringEncoder, roleFinder } from '../../globals/libs/helpers';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { validateEmail, validatePassword } from '../libs/helpers';

export default function SignUpContainer({ setFormController }) {
  const [ loading, setLoading ] = useState(false);
  const { search } = useLocation();
  const dataString = queryString.parse(queryStringEncoder(search));
  const username = useRef({ value: dataString?.username } || null );
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const name = useRef({ value: dataString?.name } || null);
  const surname = useRef({ value: dataString?.surname } || null);
  const vatNumber = useRef({ value: dataString?.vatNumber } || null);
  const companyName = useRef({ value: dataString?.companyName } || null);
  const companyType = useRef({ value: dataString?.companyType } || null);
  const phone = useRef({ value: dataString?.phone } || null);
  const prefix = useRef({value: dataString?.prefix } || null);

  async function signUp() {
    setLoading(true);
    if(password.current.value !== confirmPassword.current.value) {
      setLoading(false);
      toast.error('Le due password non coincidono');
      return;
    }

    // Validation 
    const isValidEmail = validateEmail(username.current.value);
    const isValidPassword = (password.current.value === confirmPassword.current.value) && validatePassword(password.current.value);
    if(!isValidEmail) {
      setLoading(false);
      toast.error('Email non valida');
      return null;
    }

    if(!isValidPassword) {
      setLoading(false)
      toast.error('Le password inserite non corrispondono o presentano caratteri non ammessi');
      return null;
    }
    
    if(isValidEmail && isValidPassword) {
      try {
        const companyId = (search && dataString?.companyId) ? dataString.companyId : uuidv4();
        const user = await Auth.signUp({
          'username': username.current.value,
          'password': password.current.value,
          attributes: {
            'name': surname.current.value ? name.current.value + " " + surname.current.value : name.current.value,
            'email': username.current.value,
            'custom:phone': composePhoneNumber(prefix.current.value, phone.current.value),
            'custom:companyId':companyId,
            'custom:vatNumber': vatNumber.current.value,
            'custom:companyName': companyName.current.value.toUpperCase(),
            'custom:role': search ? dataString.role : `${vatNumber.current.value}-${companyId}@ADMIN`,
            'custom:companyType': companyType.current.value.toUpperCase()
          }
        });
  
        setLoading(false);
        toast(`Abbiamo inviato un'email all'indirizzo ${username.current.value} con il codice di conferma`);
        console.log('Utente registrato nel pool', user);
        setFormController({ view: 'authCode', data: { username: username.current.value }});
      }
      catch (error) { 
        setLoading(false);
        if(error.code === "UsernameExistsException") {
          toast.error('Questa email è già stata usata per la registrazione di un account');
          dataString?.username && toast.info('Si prega di richiedere l\'invio dell\'invito su un\'email non utilizzata in precedenza');
        }

        console.log('Errore in Sign Up', error)
      }
    }
  }

  return (
    <form autoComplete="off" onSubmit={e => e.preventDefault()} className="min-h-screen flex px-4 bg-base-100 flex-col justify-center">
      <div className="flex flex-col items-center h-full justify-center py-4">
        <div className="flex flex-col mr-auto">
          <h1 className="font-bold text-2xl text-dark-300 dark:text-light-100">
            Crea un nuovo account { search && <span className="text-secondary-200 dark:text-secondary-300 capitalize">({roleFinder(dataString.role)})</span>}
          </h1>
        </div>

        { search
          ? <SignUpFromInvite 
              username={username}
              password={password}
              companyType={companyType}
              confirmPassword={confirmPassword}
              name={name}
              vatNumber={vatNumber}
              companyName={companyName}
              phone={phone}
              prefix={prefix}
          />
          : <SignUpWithoutInvite 
              username={username}
              password={password}
              companyType={companyType}
              confirmPassword={confirmPassword}
              name={name}
              surname={surname}
              vatNumber={vatNumber}
              companyName={companyName}
              phone={phone}
              prefix={prefix}
          />
        }
        
        <ActionButton
          styles="btn--center btn-wide btn-primary"
          text="Registrati"
          onClick={signUp}
          loading={loading}
        />

        <div className="text-sm" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <p className="text-dark-300 dark:text-light-100">Hai già un account?</p>
          <ActionButton
            styles="btn--center btn-ghost"
            text="Accedi"
            display="inline"
            onClick={() => setFormController({ view: 'signIn' })}
          />
        </div>
      </div>
    </form>
  )
}