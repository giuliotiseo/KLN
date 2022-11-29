import { useState } from "react";
import { Link } from "react-router-dom";
import useForgotPassword from "../hooks/useForgotPassword";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPasswordContainer() {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ confirmCode, setConfirmCode ] = useState("");
  const { step, submitUsername, submitResetPassword, isLoading } = useForgotPassword();

  return (
    <div className="px-4 items-center bg-base-100 flex-col justify-center">
      <div>
        <h1 className="font-bold text-2xl text-dark-300 dark:text-light-100">
          Niente panico
        </h1>
        { step === 1 && <p className="mt-2 text-dark-300 dark:text-light-100">Per recuperare la password basterà inviare la tua email compilando il modulo in basso</p> }
        { step === 2 && <p className="mt-2 text-dark-300 dark:text-light-100">Abbiamo inviato un'email all'indirizzo <b>{username}</b> contenente il codice necessario a confermare la nuova password.</p> }
        
        <ForgotPasswordForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          confirmCode={confirmCode}
          setConfirmCode={setConfirmCode}
          isLoading={isLoading}
          submitUsername={() => submitUsername(username)}
          submitResetPassword={() => submitResetPassword(username, confirmCode, password)}
          step={step}
        />

        <div className="flex items-center justify-center text-sm mt-4">
          <p>Ricordi la tua password?</p>
          <Link
            to="/login"
            className="relative ml-1 text-secondary-100 dark:text-secondary-300 bg-transparent cursor-pointer inline-block opacity-80 hover:opacity-100"
          >
            Accedi
          </Link>
        </div>
      </div>
    </div>
  )
}