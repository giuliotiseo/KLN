import { useState } from "react";
import InputText from "../../globals/components/dataEntry_v2/InputText";

export default function CompanyRegistryBasicInputs({
  company,
  updateForm,
  // validationError,
}) {
  const [ mapVisibility, setMapVisibility ] = useState(false);
  const { name, vatNumber, fiscalCode, address, location } = company;
  return (
    <div>
      <InputText
        id="name"
        label="Ragione sociale *"
        className="flex-col w-full mb-2"
        contentClassName="w-full text-lg"
        inputClassName='input'
        labelClassName="block"
        value={name}
        forceUpperCase={true}
        callback={updateForm}
        disabled={false}
        // isError={validationError.includes("name")}
      />

      <InputText
        id="vatNumber"
        label="Partita IVA *"
        className="flex-col w-full mb-2"
        contentClassName="w-full text-lg"
        inputClassName='input'
        labelClassName="block"
        value={vatNumber}
        forceUpperCase={true}
        callback={updateForm}
        disabled={false}
        // isError={validationError.includes("vatNumber")}
      />

      <InputText
        id="fiscalCode"
        label="Codice fiscale azienda *"
        className="flex-col w-full mb-2"
        contentClassName="w-full text-lg"
        inputClassName='input'
        labelClassName="block"
        value={fiscalCode || ""}
        forceUpperCase={true}
        callback={updateForm}
        disabled={false}
        // isError={validationError.includes("fiscalCode")}
      />


    </div>
  )
}