import { useState } from 'react';
import { Link } from 'react-router-dom';
// Global
import InputText from '../../globals/components/dataEntry_v2/InputText';
// Styles
import InputPassword from '../../globals/components/dataEntry_v2/InputPassword';
import Button from '../../globals/components/buttons_v2/Button';

export default function SignInForm({
  isLoading,
  callback,
}) {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  return (
    <form autoComplete="off" onSubmit={e => e.preventDefault()}>
      <div className="flex flex-col items-center h-full justify-center py-4">
        <div className="w-full">
          <InputText
            id="login-username"
            label="Inserisci username o email"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            onBlurCallback={true}
            callback={({ value }) => setUsername(value)}
            value={username}
            showButton={false}
            disabled={isLoading}
          />

          <InputPassword
            id="login-pssw"
            label="Inserisci password"
            className="flex-col w-full mt-2"
            contentClassName="w-full text-lg"
            labelClassName="block"
            onBlurCallback={true}
            value={password}
            callback={({ value }) => setPassword(value)}
            disabled={isLoading}
          />
        </div>

        <div className="relative my-2 text-seconda">
          <Link
            to="/forgot-password"
            className="relative mb-2 text-secondary-100 dark:text-secondary-300 bg-transparent cursor-pointer inline-block opacity-80 hover:opacity-100"
          >
            Ho dimenticato la password
          </Link>
        </div>

        <div className="flex flex-col w-full mt-4">
          <Button
            text="Accedi"
            className="btn--center btn-wide btn-primary"
            loading={isLoading}
            loadingText="Accesso in corso"
            onClick={() => callback(username, password)}
          />
        </div>
      </div>
    </form>
  )
}