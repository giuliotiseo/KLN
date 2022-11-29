import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Button from "../../globals/components/buttons_v2/Button";
import InputEmail from "../../globals/components/dataEntry_v2/InputEmail";
import InputPassword from "../../globals/components/dataEntry_v2/InputPassword";
import InputText from "../../globals/components/dataEntry_v2/InputText";

// Sub components ---------------------------------------------------------------------------------------------------------------------------------------------------
function ForgotPasswordFirst ({
  username,
  setUsername,
  submitUsername,
  isLoading
}) {
  const [ isError, setIsError ] = useState(false);

  // If username change and isError is active, reset isError
  useEffect(() => {
    setIsError(false);
  }, [username])

  // Trigger submit function
  function handleSubmit () {
    if (username !== '') {
      submitUsername();
      toast.info(`Abbiamo inviato un'email contenente il codice di conferma all'indirizzo ${username}`);
    } else {
      setIsError(true);
      toast.error(`Si è verificato un error: nessun valore trovato nel campo username`);
      console.log('Error: empty mandatory fields');
    }
  }

  return (
    <div className="w-full">
      <InputEmail
        label="Inserisci email"
        value={username}
        callback={({ value }) => setUsername(value)}
        placeholder="es. mariorossi@lts.it"
        contentClassName="w-full text-lg"
        labelClassName="block"
        className="mb-4 flex-col w-full"
        isError={isError}
        disabled={isLoading}
      />

      <Button
        text="Recupera la password"
        className="btn--center btn-wide btn-primary"
        loading={isLoading}
        onClick={handleSubmit}
      />
    </div>
  )
}

function ForgotPasswordSecondStep ({
  username,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  confirmCode,
  setConfirmCode,
  submitResetPassword,
  isLoading,
  submitUsername,
}) {
  const [ isError, setIsError ] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [username, password, confirmCode])

  function handleSubmit() {
    // Check for empty fields
    if (username !== '' && password !== '' && confirmPassword !== '' && confirmCode !== '') {

      // Check for password length
      if(password === confirmPassword) {
        if(password.length >= 8 && confirmPassword.length >= 8) {
          // success
          submitResetPassword();
        } else {
          // fail
          toast.error(`Devi inserire una password di almeni 8 caratteri compresi caratteri speciali, numeri, maiuscole e minuscole`);
          setIsError(true);
          console.log('Error: password fields must match');
        }
      } else {
        // fail
        toast.error(`Corrispondenza errata tra le due password inserite`);
        setIsError(true);
        console.log('Error: password fields must match');
      }
    } else {
      setIsError(true);
      username === "" && toast.error("Username non presente");
      password === "" && toast.error("Password non presente");
      confirmPassword === "" && toast.error("Inserisci la password di conferma");
      confirmCode === "" && toast.error("Inserisci il codice di conferma ricevuto per email");
    }
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="col-span-2 md:col-span-1">
          <InputPassword
            id="password"
            label="Inserisci password"
            className="flex-col w-full mt-2"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={password}
            callback={({ value }) => setPassword(value)}
            disabled={isLoading}
            isError={isError}
          />      
        </div>
        <div className="col-span-2 md:col-span-1">
          <InputPassword
            id="confirmPassword"
            label="Conferma password"
            className="flex-col w-full mt-2"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={confirmPassword}
            callback={({ value }) => setConfirmPassword(value)}
            disabled={isLoading}
            isError={isError}
          />
        </div>

        <div className="col-span-2">
          <InputText
            id="confirmCode"
            label="Codice di conferma"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={confirmCode}
            forceUpperCase={false}
            callback={({ value }) => setConfirmCode(value)}
            disabled={isLoading}
            isError={isError}
          />
        </div>
      </div>

      <div className="text-center">
        <Button
          className="relative my-2 mx-auto text-secondary-100 dark:text-secondary-300 bg-transparent cursor-pointer inline-block opacity-80 hover:opacity-100"
          text="Invia di nuovo il codice"
          onClick={submitUsername}
        />
      </div>

      <Button
        text="Recupera la password"
        className="btn--center btn-wide btn-primary"
        loading={isLoading}
        onClick={handleSubmit}
      />
    </div>
  )
}

// Main component ---------------------------------------------------------------------------------------------------------------------------------------------------
export default function ForgotPasswordForm({
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  confirmCode,
  setConfirmCode,
  isLoading,
  submitUsername,
  submitResetPassword,
  step,
}) {
  return (
    <form autoComplete="off" onSubmit={e => e.preventDefault()} className="mt-8">
      <div className="flex flex-col items-center h-full justify-center">
        { step === 1 && (
          <ForgotPasswordFirst
            username={username}
            setUsername={setUsername}
            submitUsername={submitUsername}
            isLoading={isLoading}
          />
        )}

        { step === 2 && (
          <ForgotPasswordSecondStep
            username={username}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            confirmCode={confirmCode}
            submitUsername={submitUsername}
            setConfirmCode={setConfirmCode}
            submitResetPassword={submitResetPassword}
            isLoading={isLoading}
          />
        )}

        { step !== 1 && step !== 2 && (
          <Link to="/login">Torna indietro</Link>
        )}

      </div>
    </form>
  )
}