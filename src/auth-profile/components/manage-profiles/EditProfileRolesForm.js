import Avatar from 'react-avatar';
import Button from '../../../globals/components/buttons_v2/Button';
import InputText from '../../../globals/components/dataEntry_v2/InputText';
import { FiSave } from "react-icons/fi";
import InputCheckbox from '../../../globals/components/dataEntry_v2/InputCheckbox';
import InputEmail from '../../../globals/components/dataEntry_v2/InputEmail';
import InputPhone from '../../../globals/components/dataEntry_v2/InputPhone';
import { capitalize, ROLES, ROLES_DESCRIPTORS } from '../../../globals/libs/helpers';

export default function EditProfileRolesForm({
  profile,
  updateForm,
  isLoading = false,
  lockFields = true,
  updateProfileInCompany = () => console.log("Default updateProfileInCompany callback in <EditProfileRolesForm />")
}) {
  const disabled = isLoading || lockFields;
  const fullName = profile?.name 
    ? profile?.surname
      ? `${profile.name} ${profile.surname}`
      : profile.name
    : "";
  
  return (
    <div className="relative flex flex-col items-center md:flex-row md:items-start max-w-[720px] w-5/6 mx-auto bg-base-100 px-4 pt-4 pb-16 rounded-lg shadow-sm">
      <div className="mx-1">
        <Avatar
          name={fullName}
          // facebookId="10218977872669139"
          size="150"
          round={true}
          color="#0277BD"
        />
      </div>
      <div className="w-full flex-1 mx-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <InputText
              id="name"
              label="Nome"
              className="flex-col w-full"
              contentClassName="w-full text-lg"
              labelClassName="block"
              value={profile.name}
              forceUpperCase={true}
              callback={updateForm}
              disabled={disabled}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <InputText
              id="surname"
              label="Cognome"
              className="flex-col w-full"
              contentClassName="w-full text-lg"
              labelClassName="block"
              value={profile.surname}
              forceUpperCase={true}
              callback={updateForm}
              disabled={disabled}
              // isError={validationError?.includes("profileName")}
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <InputEmail
              id="email"
              label="Inserisci email"
              value={profile.email}
              callback={updateForm}
              placeholder="es. mariorossi@lts.it"
              contentClassName="w-full text-lg"
              labelClassName="block"
              className="flex-col w-full"
              disabled={disabled}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <InputPhone
              id="phone"
              label="Telefono"
              className="flex-col w-full"
              contentClassName="w-full text-lg"
              labelClassName="block"
              value={profile.phone}
              callback={updateForm}
              disabled={disabled}
            />
          </div>

          {/* <div className="col-span-2">
            <InputText
              id="fiscalCode"
              label="Codice fiscale"
              className="flex-col w-full"
              contentClassName="w-full text-lg"
              labelClassName="block"
              value={profile.fiscalCode}
              forceUpperCase={true}
              callback={updateForm}
              disabled={disabled}
            />
          </div> */}
        </div>

        <div>
          <p className="label block mt-4">Scegli ruolo</p>
          { Object.values(ROLES).map(role => (
            <InputCheckbox
              key={role}
              value={role}
              label={capitalize(ROLES_DESCRIPTORS[role]) || 'Ruolo sconosciuto'}
              id={role}
              initialValues={profile.roleIds}
              name="roleIds"
              className='ml-1'
              callback={updateForm}
            />
          ))}
        </div>
      </div>

      <Button
        icon={<FiSave />}
        className="flex justify-center opacity-80 absolute -bottom-4 -right-4 w-[50px] h-[50px] bg-primary-200 m-0 text-center text-white rounded-full shadow-lg hover:opacity-100 hover:shadow-sm transition-all"
        onClick={updateProfileInCompany}
      />
    </div>
  )
}