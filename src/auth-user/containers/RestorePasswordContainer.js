import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useRestorePassword from "../hooks/useRestorePassword";
import RestorePasswordForm from "../components/RestorePasswordForm";
import ErrorPage from "../../globals/components/layout/ErrorPage";

export default function RestorePasswordContainer() {
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const { state } = useLocation();
  const { isLoading, isError, submitRestorePassword } = useRestorePassword();

  if(!state?.user?.username || !state?.user?.tempPassword) return <ErrorPage title="Si è verificato un errore">Utente non trovato</ErrorPage>
  const { user: { username, tempPassword }} = state;

  return (
    <div className="flex flex-col items-center h-full justify-center py-4">
      <div className="flex flex-col mr-auto w-full">
        <h1 className="font-bold text-2xl text-dark-300 dark:text-light-100">
          Inserisci la tua password
        </h1>
        <p className="mt-2 mb-5 text-dark-300 dark:text-light-100">Per la tua sicurezza, inserisci una nuova password</p>

        <RestorePasswordForm
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          submitRestorePassword={() => submitRestorePassword(username, tempPassword, password, confirmPassword)}
          isLoading={isLoading}
          isError={isError}
        />        
      </div>


      <div className="flex items-center justify-center text-sm mt-2">
        <p className="text-dark-300 dark:text-light-100">Hai già confermato il tuo account?</p>
        <Link
          to="/login"
          className="relative ml-1 text-secondary-100 dark:text-secondary-300 bg-transparent cursor-pointer inline-block opacity-80 hover:opacity-100"
        >
          Accedi
        </Link>
      </div>
    </div>
  )
}