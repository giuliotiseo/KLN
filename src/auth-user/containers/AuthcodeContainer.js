import { useState } from "react";
import useResendConfirmationCode from "../hooks/useResendConfirmationCode";
import { Link, useLocation } from "react-router-dom";
import ErrorPage from "../../globals/components/layout/ErrorPage";
import useConfirmSignUp from "../hooks/useConfirmSignUp";
import AuthcodeForm from "../components/AuthcodeForm";

// Main component ----------------------------------------------------------------------------------------------------------------
export default function AuthcodeContainer() {
  const [ code, setCode ] = useState("");
  const { state } = useLocation();
  const { isLoading: isLoadingConfirm, confirmSignUp } = useConfirmSignUp();
  const { isLoading: isLoadingResend, resendConfirmationCode } = useResendConfirmationCode();

  if(!state?.username) return <ErrorPage title="Si è verificato un errore">Utente non trovato</ErrorPage>
  const { username } = state;

  return (
    <div className="flex flex-col items-center h-full justify-center py-4">
      <div className="flex flex-col mr-auto w-full">
        <h1 className="font-bold text-2xl text-dark-300 dark:text-light-100">
          Fantastico!
        </h1>
        <p className="my-2 mb-5 text-dark-300 dark:text-light-100">Abbiamo inviato un'email all'indirizzo <b>{username}</b></p>
        
        <AuthcodeForm
          code={code}
          setCode={setCode}
          resendConfirmationCode={() => resendConfirmationCode(username)}
          confirmSignUp={() => confirmSignUp({ code, username })}
          isLoadingResend={isLoadingResend}
          isLoadingConfirm={isLoadingConfirm}
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