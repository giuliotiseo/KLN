import SignUpCompanyForm from './signup/SignUpCompanyForm';
import SignUpAccountForm from './signup/SignUpAccountForm';
import SignUpProfileForm from './signup/SignUpProfileForm';
import Button from '../../globals/components/buttons_v2/Button';
import { useState } from 'react';
import SignUpPagination from './signup/SignUpPagination';

export default function SignUpForm({
  isLoading,
  validationError,
  user,
  updateForm,
  signUp = () => console.log("Default signUo in <SignUpForm />")
}) {
  const [ step, setStep ] = useState(1);

  return (
    <form autoComplete="off" onSubmit={e => e.preventDefault()}>
      <div className="flex flex-col items-center h-full justify-center py-4">
        {/* Azienda */}
        { step === 1 && (
          <SignUpCompanyForm
            user={user}
            updateForm={updateForm}
            isLoading={isLoading}
            validationError={validationError}
          />
        )}

        {/* Account */}
        { step === 3 && (
          <SignUpAccountForm
            user={user}
            updateForm={updateForm}
            isLoading={isLoading}
            validationError={validationError}
          />
        )}
        
        {/* Profile */}
        { step === 2 && (
          <SignUpProfileForm
            user={user}
            updateForm={updateForm}
            isLoading={isLoading}
            validationError={validationError}
          />
        )}

        <SignUpPagination
          step={step}
          setStep={setStep}
        />

        {/* Register button */}
        { step === 3 && <Button
          className="btn--center btn-wide btn-primary mt-8"
          text="Registrati"
          onClick={signUp}
          loading={isLoading}
        /> }
      </div>
    </form>
  )
}