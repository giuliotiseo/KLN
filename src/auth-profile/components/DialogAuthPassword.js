import Button from "../../globals/components/buttons_v2/Button";
import InputPassword from "../../globals/components/dataEntry_v2/InputPassword"
import Spinner from "../../globals/components/layout/Spinner";
import { capitalizeFullName } from "../../globals/libs/helpers"

const DialogAuthPassword = ({
  myProfile,
  clear,
  password,
  setPassword,
  callback,
  loading
}) => {
  return (
    <div>
      <div className="uppercase my-4 text-center">
        <b>{capitalizeFullName(myProfile.searchable)}</b>
        <Button text="cambia" className="text-sm btn-ghost mx-auto p-0" onClick={clear} />
      </div>
      <div className="items-center">
        <InputPassword
          id={`password-${myProfile.id}`}
          label="Inserisci la password"
          className="flex-col my-4 flex-1"
          contentClassName="text-lg"
          inputClassName="text-center"
          labelClassName="block"
          value={password}
          placeholder="*******************"
          callback={({ value }) => setPassword(value)}
          onPressEnter={callback}
          disabled={loading}
        />
        { loading && (
          <Spinner className="absolute top-4 right-4 w-[20px] h-[20px] text-primary-200 dark:text-primary-300" />
        )}
      </div>
    </div>
  )
}

export default DialogAuthPassword;