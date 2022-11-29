import { useState } from "react";
import SignUpCompanyMap from "../../../auth-user/components/signup/SignUpCompanyMap";
import Button from "../../../globals/components/buttons_v2/Button";
import InputText from "../../../globals/components/dataEntry_v2/InputText";
import SearchPlaces from "../../../globals/components/dataEntry_v2/SearchPlaces";
import LocationItem from "../../../globals/components/layout/LocationItem";

export default function CustomerRegistryInputs({
  customer,
  updateForm,
  validationError,
}) {
  const [ mapVisibility, setMapVisibility ] = useState(false);
  const { name, vatNumber, fiscalCode, location } = customer;
  const address = customer?.address || customer?.location?.address;
  return (
    <div>
      <InputText
        id="name"
        label="Ragione sociale"
        className="flex-col w-full mb-2"
        contentClassName="w-full text-lg"
        inputClassName='bg-light-100 dark:bg-dark-100'
        labelClassName="block"
        value={name}
        forceUpperCase={true}
        callback={updateForm}
        disabled={false}
        isError={validationError.includes("name")}
      />

      <InputText
        id="vatNumber"
        label="Partita IVA"
        className="flex-col w-full mb-2"
        contentClassName="w-full text-lg"
        inputClassName='bg-light-100 dark:bg-dark-100'
        labelClassName="block"
        value={vatNumber}
        forceUpperCase={true}
        callback={updateForm}
        disabled={false}
        isError={validationError.includes("vatNumber")}
      />

      <InputText
        id="fiscalCode"
        label="Codice fiscale azienda"
        className="flex-col w-full mb-2"
        contentClassName="w-full text-lg"
        inputClassName='bg-light-100 dark:bg-dark-100'
        labelClassName="block"
        value={fiscalCode || ""}
        forceUpperCase={true}
        callback={updateForm}
        disabled={false}
        isError={validationError.includes("fiscalCode")}
      />

      <div className="my-4">
        { address
          ? <div className="input bg-base-100 p-2 rounded-md">
              <p className="text-base">Indirizzo selezionato: </p>
              <LocationItem
                location={location}
                clearLocation={() => updateForm({ type: "custom", name: "location", value: null })}
              />
            </div>
          : <SearchPlaces
              label={"Cerca il nome della tua attività o l'indirizzo"}
              showIcon={true}
              onClick={value => updateForm({ type: "custom", name: "location", value })}
              className="w-full text-base"
              inputClassName="bg-light-100 dark:bg-dark-100"
            />
        }
        
        <Button
          icon={null}
          text={mapVisibility ? 'Nascondi mappa' : 'Mostra mappa'}
          className="btn-ghost mt-2 pt-0"
          onClick={() => setMapVisibility(prev => !prev)}
        />

        { mapVisibility &&
          <SignUpCompanyMap
            lat={location?.coordinate?.lat}
            lng={location?.coordinate?.lng}
            className="mt-0"
            onClick={(value) => updateForm({ type: "custom", name: "location", value })}
          />
        }

      </div>
    </div>
  )
}