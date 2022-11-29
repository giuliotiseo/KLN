import useSignIn from "../hooks/useSignIn";
import PageSpinner from "../../globals/components/layout/PageSpinner";
import SignInForm from "../components/SignInForm";
import { ReactComponent as LogoImg } from '../../globals/assets/kln-logo.svg';
import { Link } from "react-router-dom";

export default function LoginContainer() {
  const [{ isLoading }, signIn ] = useSignIn();

  return (
    <div className="w-full">
      { isLoading && <PageSpinner message="Accesso in corso" className="z-50 opacity-95" /> }
      <div className="flex flex-col mb-8">
        <div className="flex items-center mb-4">
          <LogoImg className="w-28 h-auto mr-4" />
        </div>

        <h1 className="font-bold text-2xl text-dark-300 dark:text-light-100">Ti diamo il benvenuto su KLN Manager</h1>
        <p className="mt-2 text-dark-300 dark:text-light-100">
          Ricevi ordini dai tuoi clienti, programma la tua logistica e monitora i progressi della tua azienda di trasporti. Ottieni il massimo dai servizi KLN e fai crescere il tuo business.
        </p>
      </div>

      <SignInForm
        isLoading={isLoading}
        callback={signIn}
      />
      
      {/* Branch: Prod: */}
      <div className="flex items-center justify-center text-sm mt-2">
        <Link
          to="/subscribe"
          className="relative ml-1 text-secondary-100 dark:text-secondary-300 bg-transparent cursor-pointer inline-block opacity-80 hover:opacity-100"
        >
          Torna alla home
        </Link>
      </div>

      {/* Prod--test: */}
      {/* <div className="flex items-center justify-center text-sm mt-2">
        <p className="text-dark-300 dark:text-light-100">Non hai ancora un account?</p>
        <Link
          to="/signup"
          className="relative ml-1 text-secondary-100 dark:text-secondary-300 bg-transparent cursor-pointer inline-block opacity-80 hover:opacity-100"
        >
          Registrati
        </Link>
      </div> */}
    </div>
  )
}