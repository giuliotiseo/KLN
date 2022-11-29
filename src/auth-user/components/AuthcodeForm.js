import Button from "../../globals/components/buttons_v2/Button";
import InputNumber from "../../globals/components/dataEntry_v2/InputNumber";

export default function AuthcodeForm({
  code,
  setCode,
  confirmSignUp,
  resendConfirmationCode,
  isLoadingResend,
  isLoadingConfirm,
}) {
  return (
    <form autoComplete="off" onSubmit={e => e.preventDefault()}>
      <div className="w-full">
        <InputNumber
          id="authcode"
          label="Inserisci il codice"
          className="flex-col w-full"
          contentClassName="w-full text-lg"
          labelClassName="block"
          value={code}
          callback={({ value }) => setCode(value)}
          disabled={false}
          isError={false}
        />

        <div className="block items-center justify-center mt-4">
          <p className="mr-2 text-center text-dark-300 dark:text-light-100">Non hai ricevuto il codice di conferma?</p>
          <div className="text-center">
            <Button 
              text="Reinvia il codice"
              className="btn--center btn-ghost mx-auto"
              onClick={resendConfirmationCode} 
              loading={isLoadingResend}
              disabled={isLoadingConfirm}
            />
          </div>

          <Button
            text="Conferma"
            className="btn--center btn-wide btn-primary"
            loading={isLoadingConfirm}
            disabled={isLoadingResend}
            onClick={confirmSignUp}
          />
        </div>
      </div>
    </form>
  )
}