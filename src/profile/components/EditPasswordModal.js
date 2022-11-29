import { useState } from "react";
import { useNewProfilePassword, useProfileVerify } from "../../auth-profile/hooks";
import InputPassword from "../../globals/components/dataEntry_v2/InputPassword";
import Avatar from "../../globals/components/layout/Avatar";
import Dialog, { DialogActions, DialogContent } from "../../globals/components/layout/Dialog";
import { toast } from "react-toastify";

// Update function --------------------------------------------------------------------------------------------------------------
const handleUpdatePassword = async ({password, newPsw, confirmNewPsw, callback }) => {
  let error = false
  if(password === newPsw) {
    toast.error('Non puoi registrare la stessa password');
    error = true;
    return null;
  } 

  if(newPsw !== confirmNewPsw) {
    toast.error('La password di conferma non coincide con quella fornita');
    error = true;
    return null;
  }

  if(!error) {
    const result = await callback(newPsw);
    console.log("Result new psw", result);
  }
}

// Main component --------------------------------------------------------------------------------------------------------------
function EditPasswordModal ({ modal, close, profile }) {
  const [ newPsw, setNewPsw ] = useState("");
  const [ confirmNewPsw, setConfirmNewPsw ] = useState("");
  const [{ isLoading }, newProfilePassword ] = useNewProfilePassword(profile.id);
  const [ verifyAndMutate, { password, setPassword, loading: isLoadingVerify }] = useProfileVerify({
    inputProfileId: profile.id,
    callback: () => handleUpdatePassword({ password, newPsw, confirmNewPsw, callback: newProfilePassword })
  });

  const loading = isLoading || isLoadingVerify;
  const buttons = [{
    text:"Conferma",
    disabled: false,
    onClick: verifyAndMutate,
    loading
  }]
  
  return (
    <Dialog
      title="Modifica la password di accesso al profilo"
      close={close}
      open={modal}
      loading={loading}
    >
      <Avatar
        name={`${profile.name} ${profile.surname}`}
        size={100}
        stepColor={100}
      />
      
      <DialogContent className="my-4 text-left" title={"Modifica la password di accesso al profilo"}>
        <div className="flex flex-col md:flex-row md:gap-2 text-left">                        
          <InputPassword
            id="password"
            label="Password attuale"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            inputClassName="min-w-[300px]"
            labelClassName="block"
            value={password}
            callback={({ value }) => setPassword(value)}
            isFocus={true}
            disabled={loading}
            loading={loading}
          />
        </div>

        <div className="flex flex-col md:flex-row md:gap-2 text-left mt-2">                        
          <InputPassword
            id="newPsw"
            label="Nuova password"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            inputClassName="min-w-[300px]"
            labelClassName="block"
            value={newPsw}
            callback={({ value }) => setNewPsw(value)}
            isFocus={true}
            disabled={loading}
            loading={loading}
          />

          <InputPassword
            id="confirmNewPsw"
            label="Conferma la nuova password"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            inputClassName="min-w-[300px]"
            labelClassName="block"
            value={confirmNewPsw}
            callback={({ value }) => setConfirmNewPsw(value)}
            isFocus={true}
            disabled={loading}
            loading={loading}
          />
        </div>
      </DialogContent>

      <DialogActions buttons={buttons} />
    </Dialog>
  )
}

export default EditPasswordModal;