import { useState, useRef, useReducer, useCallback } from "react";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";
import SignUpForm from "../components/SignUpForm";
import { FiAlertTriangle } from "react-icons/fi";
import { enhancedUserReducer, initialState, updateUserSignUpFormLogic } from "../libs/reducers";

export default function SignUpContainer() {
  const [ companyFound, setCompanyFound ] = useState(null);
  const [{ isLoading, validationError }, signUp ] = useSignUp();
  const [ user, updateUserState ] = useReducer(enhancedUserReducer, initialState);
  const isSearchRunned = useRef(false);

  //  Global form update
  const updateForm = useCallback(({ value, name, type }) => {
    updateUserSignUpFormLogic({ name, type, value, updateUserState });
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col mr-auto">
        <h1 className="font-bold text-2xl text-dark-300 dark:text-light-100">
          Crea un nuovo account
        </h1>
        <p className="text-sm mt-2 flex items-center"><FiAlertTriangle className="mr-1 text-amber-500" /> Tutti i campi sono obbligatori</p>
      </div>
      
      {/* 
        Flusso di iscrizione con pannello admin:
      { isSearchRunned 
      ? <SignUpForm
          isLoading={isLoading}
          validationError={validationError}
          user={user}
          updateForm={updateForm}
          signUp={() => signUp(user)}
        />
      : <ExternalSearchCompany
          companyFound={companyFound}
          setCompanyFound={setCompanyFound}
        />} */}

      <SignUpForm
        isLoading={isLoading}
        validationError={validationError}
        user={user}
        updateForm={updateForm}
        signUp={() => signUp(user)}
      />

      <div className="flex items-center justify-center text-sm mt-2">
        <p className="text-dark-300 dark:text-light-100">Hai già un account?</p>
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