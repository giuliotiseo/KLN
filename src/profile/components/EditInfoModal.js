import { useState } from "react";
import useUpdateProfileData from "../hooks/useUpdateProfileData";
import InputEmail from "../../globals/components/dataEntry_v2/InputEmail";
import InputPhone from "../../globals/components/dataEntry_v2/InputPhone";
import InputText from "../../globals/components/dataEntry_v2/InputText";
import Avatar from "../../globals/components/layout/Avatar";
import Dialog, { DialogActions, DialogContent } from "../../globals/components/layout/Dialog";

function EditInfoModal ({ modal, close, profile }) {
  const [ name, setName ] = useState(profile.name);
  const [ surname, setSurname ] = useState(profile.surname);
  const [ email, setEmail ] = useState(profile?.email || "");
  const [ phone, setPhone ] = useState(profile?.phone || "");
  const [ handleUpdate, { isLoading }] = useUpdateProfileData();

  const buttons = [{
    text:"Conferma",
    disabled: false,
    onClick: () => handleUpdate({ name, surname, email, phone })
  }]
  
  return (
    <Dialog
      title="Modifica le informazioni"
      close={close}
      open={modal}
    >
      <Avatar
        name={`${profile.name} ${profile.surname}`}
        size={100}
        stepColor={100}
      />
      
      <DialogContent className="mt-4 text-left" title={"Modifica le informazioni del profilo"}>
        <div className="flex flex-col md:flex-row md:gap-2">                        
          <InputText
            id="name"
            label="Nome"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={name}
            forceUpperCase={false}
            callback={({ value }) => setName(value)}
            disabled={isLoading}
          />

          <InputText
            id="surname"
            label="Cognome"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={surname}
            forceUpperCase={false}
            callback={({ value }) => setSurname(value)}
            disabled={isLoading}
          />

        </div>

        <div className="flex flex-col md:flex-row md:gap-2 mt-4">                        
          <InputEmail
            id="email"
            label="Inserisci email"
            value={email}
            placeholder="es. mariorossi@lts.it"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            callback={({ value }) => setEmail(value)}
            disabled={isLoading}
          />

          <InputPhone
            id="phone"
            label="Telefono"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={phone}
            callback={({ value }) => setPhone(value)}
            disabled={isLoading}
          />
        </div>
      </DialogContent>

      <DialogActions buttons={buttons} />
    </Dialog>
  )
}

export default EditInfoModal;