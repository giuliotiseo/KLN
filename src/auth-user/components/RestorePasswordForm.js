import Button from "../../globals/components/buttons_v2/Button";
import InputPassword from "../../globals/components/dataEntry_v2/InputPassword";

export default function RestorePasswordForm({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  submitRestorePassword,
  isLoading,
  isError,
}) {
  return (
    <form autoComplete="off" className="w-full" onSubmit={e => e.preventDefault()}>
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
      </div>

      <Button
        text="Conferma"
        className="btn--center btn-wide btn-primary"
        loading={isLoading}
        onClick={submitRestorePassword}
      />
    </form>
  )
}