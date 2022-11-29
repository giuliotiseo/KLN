import InputText from "../../../globals/components/dataEntry_v2/InputText";
import Select from "../../../globals/components/dataEntry_v2/Select";
import { capitalize, ROLES, ROLES_DESCRIPTORS } from "../../../globals/libs/helpers";

export default function SignUpProfileForm({
  user,
  updateForm,
  isLoading,
  validationError,
}) {
  return (
    <section className="w-full">
      <h4 className="uppercase text-secondary-200 dark:text-secondary-300 font-bold mb-2">Profilo</h4>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <InputText
            id="profileName"
            label="Nome"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={user.profileName}
            forceUpperCase={true}
            callback={updateForm}
            disabled={isLoading}
            isError={validationError?.includes("profileName")}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <InputText
            id="profileSurname"
            label="Cognome"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={user.profileSurname}
            forceUpperCase={true}
            callback={updateForm}
            disabled={isLoading}
            isError={validationError?.includes("profileSurname")}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Select
            id="profileRole"
            label="Ruolo"
            value={user.profileRole}
            selectClassName="block w-full"
            callback={updateForm}
          >
            { Object.keys(ROLES).map(role => (
              <option key={role} value={ROLES[role]}>
                { capitalize(ROLES_DESCRIPTORS[ROLES[role]]) || 'Ruolo sconosciuto'}
              </option>
            )) }
          </Select>
        </div>

        <div className="col-span-2 md:col-span-1">
          <InputText
            id="profileFiscalCode"
            label="Codice fiscale"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={user.profileFiscalCode}
            forceUpperCase={true}
            callback={updateForm}
            disabled={isLoading}
            isError={validationError?.includes("profileFiscalCode")}
          />
        </div>

      </div>
    </section>
  )
}