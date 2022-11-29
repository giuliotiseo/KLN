import InputEmail from "../../../globals/components/dataEntry_v2/InputEmail";
import InputPassword from "../../../globals/components/dataEntry_v2/InputPassword";

export default function SignUpAccountForm({
  user,
  updateForm,
  isLoading,
  validationError
}) {
  return (
    <section className="w-full">
      <h4 className="uppercase text-secondary-200 dark:text-secondary-300 font-bold mb-2">Account</h4>
      <div className="grid grid-cols-2 gap-4">
        {/* Username */}
        <div className="col-span-2">
          <InputEmail
            id="username"
            label="Email accesso"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={user.username}
            callback={updateForm}
            disabled={isLoading}
            isError={validationError?.includes("username")}
          />
        </div>

        {/* Password */}
        <div className="col-span-2 md:col-span-1">
          <InputPassword
            id="password"
            label="Inserisci password"
            className="flex-col w-full mt-2"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={user.password}
            callback={updateForm}
            disabled={isLoading}
            isError={validationError?.includes("password")}
          />
        </div>

        {/* Confirm Password */}
        <div className="col-span-2 md:col-span-1">
          <InputPassword
            id="confirmPassword"
            label="Conferma password"
            className="flex-col w-full mt-2"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={user.confirmPassword}
            callback={updateForm}
            disabled={isLoading}
            isError={validationError?.includes("confirmPassword")}
          />
        </div>
      </div>
    </section>
  )
}