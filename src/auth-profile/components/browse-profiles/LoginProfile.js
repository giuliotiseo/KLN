
import { useState } from "react";
import { useLoginProfile, useNewProfilePassword, useRestoreProfilePassword } from "../../hooks";
import Button from "../../../globals/components/buttons_v2/Button";
import InputPassword from "../../../globals/components/dataEntry_v2/InputPassword";
import Avatar from "../../../globals/components/layout/Avatar";
import ComponentOverlaySpinner from "../../../globals/components/layout/ComponentOverlaySpinner";

// Main component ------------------------------------------------------------------------------------------------------------------------
export default function LoginProfile ({
  profile,
  companyId,
  isProfileSelected,
  isActive,
  clear
}) {
  const [ message, setMessage ] = useState("");
  const [{ isLoading: isNewPasswordLoading }, newProfilePassword ] = useNewProfilePassword(profile.id);
  const [{ isLoading: isLoadingRestore }, restorePassword ] = useRestoreProfilePassword(profile);
  const [{
    password,
    setPassword,
    // loadingMessage,
    // setLoadingMessage,
    // setProfileId,
    loading: loginLoading
  }, handleLoginProfile] = useLoginProfile(profile.id, companyId);

  const isLoading = isNewPasswordLoading || loginLoading || isLoadingRestore;
  
  const handleNewPassword = async (password) => {
    setMessage("Accesso in corso");
    await newProfilePassword(password);
    setPassword("");
    setMessage("");
  }

  const handleRestorePassword = async () => {
    setMessage(`Reimpostazione in corso - invio nuova password all'indirizzo ${profile.email}`);
    await restorePassword(profile);
    setPassword("");
    setMessage("");
  }

  return (
    <div
      id={`item-password-${profile.id}`}
      className={`absolute transition-all flex flex-col items-center justify-center ${isProfileSelected && isActive ? 'w-1/2 h-1/2 top-1/2 left-1/2 z-50 -translate-y-2/3 -translate-x-1/2 opacity-100' : '-z-10 translate-x-0 translate-y-0 opacity-0'}`}
    >

      <Avatar
        name={profile.searchable}
        size={150}
        src={profile?.avatar}
      />

      <div className="mt-6 text-center">
        { isLoading
          ? <ComponentOverlaySpinner message={message} className="-top-[1px] z-10 bg-light-200 dark:bg-dark-200" />
          : null
        }

        {!isLoading && (
          <h4 className="title-3 py-2 text-primary-200 dark:text-primary-300 whitespace-nowrap">
            {profile.searchable.toUpperCase()}
          </h4>
        )}

        { !profile?.psw
          ? !isLoading && (
            <InputPassword
                id={`new-password-${profile.id}`}
                placeholder="Imposta password"
                className="flex-col w-full mt-2"
                contentClassName="w-full text-lg"
                inputClassName="text-center min-w-[300px]"
                labelClassName="block"
                value={password}
                callback={({ value }) => setPassword(value)}
                onPressEnter={() => handleNewPassword(password)}
                loading={isNewPasswordLoading}
                disabled={false}
                isError={false}
                isFocus={true}
              />
            )
          : !isLoading && (
            <div>
              <InputPassword
                id={`password-${profile.id}`}
                placeholder="Inserisci password"
                className="flex-col w-full mt-2"
                contentClassName="w-full text-lg"
                inputClassName="text-center min-w-[300px]"
                labelClassName="block"
                value={password}
                callback={({ value }) => setPassword(value)}
                onPressEnter={() => handleLoginProfile(password)}
                loading={loginLoading}
                disabled={false}
                isError={false}
                isFocus={true}
              />

              <Button
                text="Ho dimenticato la password"
                className="mt-2 pb-0 text-sm opacity-50 hover:opacity-100 hover:text-secondary-100 hover:dark:text-secondary-100 mx-auto hover:underline underline-offset-2 inline-block"
                onClick={() => handleRestorePassword(profile)}
              />
            </div>
          )
        }

        {!isLoading && (
          <Button
            text="Annulla"
            className="text-sm opacity-50 hover:opacity-100 hover:text-secondary-100 hover:dark:text-secondary-100 mx-auto hover:underline underline-offset-2 inline-block"
            onClick={() => clear()}
          />
        )}
      </div>
    </div>
  )
}