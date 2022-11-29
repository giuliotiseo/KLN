import { useState } from "react";
import Button from "../../../globals/components/buttons_v2/Button";
import InputEmail from "../../../globals/components/dataEntry_v2/InputEmail";
import InputPhone from "../../../globals/components/dataEntry_v2/InputPhone";
import InputText from "../../../globals/components/dataEntry_v2/InputText";
import SearchPlaces from "../../../globals/components/dataEntry_v2/SearchPlaces";
import Select from "../../../globals/components/dataEntry_v2/Select";
import LocationItem from "../../../globals/components/layout/LocationItem";
import SignUpCompanyMap from "./SignUpCompanyMap";
import { COMPANY_TYPES, COMPANY_TYPES_DESC } from "../../libs/helpers";

export default function SignUpCompanyForm({
  user,
  updateForm,
  isLoading,
  validationError
}) {
  const [ mapVisibility, setMapVisibility ] = useState(false);

  return (
    <section className="w-full">
      <h4 className="uppercase text-secondary-200 dark:text-secondary-300 font-bold mb-2">Azienda</h4>
      <div className="grid grid-cols-2 gap-4">
        {/* Città */}
        <div className="col-span-2">
          { user?.address 
            ? <LocationItem
                location={user.location}
                clearLocation={() => updateForm({ type: "location", name: "location", value: null })}
                styles="mt-2"
              />
            : <SearchPlaces
                label={"Inserisci il Place ID"}
                showIcon={true}
                onClick={value => updateForm({ type: "location", name: "location", value })}
                placeholder="es. ChIJvSM2jlDFOhMRCKItTWMqYq8"
                className="mt-2 w-full text-base"
                disabledPlaceIdSearch={false}
              />
          }

          <Button
            icon={null}
            text={mapVisibility ? 'Nascondi mappa' : 'Mostra mappa'}
            className="btn-ghost ml-6 pt-0"
            onClick={() => setMapVisibility(prev => !prev)}
          />

          { mapVisibility &&
            <SignUpCompanyMap
              lat={user?.location?.coordinate?.lat}
              lng={user?.location?.coordinate?.lng}
              onClick={(value) => updateForm({ type: "location", name: "location", value })}
            />
          }
        </div>

        {/* Email */}
        <div className="col-span-2 md:col-span-1">
          <InputEmail
            id="email"
            label="Email aziendale"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={user.email}
            callback={updateForm}
            disabled={isLoading}
            isError={validationError?.includes("email")}
          />
        </div>

        {/* Phone */}
        <div className="col-span-2 md:col-span-1">
          <InputPhone
            id="phone"
            label="Telefono"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={user.phone}
            callback={updateForm}
            disabled={isLoading}
            isError={validationError?.includes("phone")}
          />
        </div>

        {/* Nome azienda */}
        <div className="col-span-2 md:col-span-1">
          <InputText
            id="companyName"
            label="Ragione sociale"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={user.companyName}
            forceUpperCase={true}
            callback={updateForm}
            disabled={isLoading}
            isError={validationError?.includes("companyName")}
          />
        </div>

        {/* Tipo azienda */}
        <div className="col-span-2 md:col-span-1">
          <Select
            id="companyType"
            label="Tipo azienda"
            value={user.companyType}
            selectClassName="block w-full"
            callback={updateForm}
          >
            { COMPANY_TYPES.map(type => ( 
              <option key={type} value={type}>
                { COMPANY_TYPES_DESC[type] || 'Tipo azienda sconosciuto'}
              </option>
            ))}
          </Select>
        </div>

        {/* Partita IVA */}
        <div className="col-span-2 md:col-span-1">
          <InputText
            id="vatNumber"
            label="Partita IVA"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={user.vatNumber}
            forceUpperCase={true}
            callback={updateForm}
            disabled={isLoading}
            isError={validationError?.includes("vatNumber")}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <InputText
            id="companyFiscalCode"
            label="Codice fiscale"
            className="flex-col w-full"
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={user.companyFiscalCode}
            forceUpperCase={true}
            callback={updateForm}
            disabled={isLoading}
            isError={validationError?.includes("companyFiscalCode")}
          />
        </div>
      </div>
    </section>
  )
}