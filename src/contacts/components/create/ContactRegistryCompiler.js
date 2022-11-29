import InputText from "../../../globals/components/dataEntry_v2/InputText";

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ContactRegistryCompiler({ contact, updateForm, validationError }) {
  return (
    <div className="mt-4">
      <InputText
        id="name"
        label="Nome *"
        className="flex-col w-full mb-2"
        contentClassName="w-full text-lg"
        inputClassName='bg-light-300 dark:bg-dark-300'
        labelClassName="block"
        value={contact.name}
        forceUpperCase={false}
        callback={updateForm}
        disabled={false}
        isError={validationError.includes("name")}
      />

      <InputText
        id="surname"
        label="Cognome *"
        className="flex-col w-full mb-2"
        contentClassName="w-full text-lg"
        inputClassName='bg-light-300 dark:bg-dark-300'
        labelClassName="block"
        value={contact.surname}
        forceUpperCase={false}
        callback={updateForm}
        disabled={false}
        isError={validationError.includes("surname")}
      />

      <InputText
        id="fiscalCode"
        label="Codice fiscale"
        className="flex-col w-full mb-2"
        contentClassName="w-full text-lg"
        inputClassName='bg-light-300 dark:bg-dark-300'
        labelClassName="block"
        value={contact.fiscalCode}
        forceUpperCase={true}
        callback={updateForm}
        disabled={false}
      />
    </div>
  )
}