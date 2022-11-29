import { useState } from "react"
import LocationItem from "../layout/LocationItem";
import Dropdown from "../navigation/Dropdown";
import ComboBox from "./ComboBox";
import SearchPlaces from "./SearchPlaces";
import { TinyParagraph } from "../typography/paragraphs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { v4 } from "uuid";

const METHOD_DESCRIPTION = {
  "ADDRESS": "Indirizzo",
  "WAREHOUSES": "Magazzini registrati"
}

export default function PositionLocalizer({
  location = null,
  setLocation,
  setCheckpoint,
  clearLocation = true,
  label,
  styles,
  withPortal = false,
  inputWarehouses,
  isLoading,
  pagination
}) {
  const [method, setMethod] = useState("WAREHOUSES");

  const handleChangeByWarehouse = (warehouse) => {
    setCheckpoint
      ? setCheckpoint(warehouse.value)
      : setLocation({
        ...warehouse.value, 
        coordinate: { 
          lat: warehouse.location.coordinate[0], 
          lng: warehouse.location.coordinate[1]
        }
      })
  };

  const handleChangeByAddress = (data) => {
    setCheckpoint 
      ? setCheckpoint({ 
        warehouseId: v4(),
        extId: v4(),
        name: "Destinazione personalizzata",
        contacts: [],
        note: null,
        location: data
      })
      : setLocation(data)
  }

  return (
    <div className={`${styles}`}>
      { label && <p className="label">{label}</p> }
      { !location && (
        <div className="relative">
          <Dropdown
            id="position-localizer"
            navItem={<div className="flex items-center">
                <p>Cerca per: <b>{METHOD_DESCRIPTION[method]}</b></p>
                <FiChevronDown />
              </div>}
            navItemOpen={<div className="inline-flex items-center text-secondary-200 dark:text-secondary-300">
              <p>Cerca per: <b>{METHOD_DESCRIPTION[method]}</b></p>
              <FiChevronUp />
            </div>}
            position="left-0 top-2"
            className="bg-inverse-300 border border-light-300 dark:border-dark-100 z-50"
          >
            <TinyParagraph styles="pt-2 pr-2 p-2">Scegli metodo di ricerca:</TinyParagraph>
            <ul className="mt-2">
              {Object.keys(METHOD_DESCRIPTION).map(meth_key => (
                <li key={meth_key}>
                  <button onClick={() => setMethod(meth_key)} className={`block w-full text-left px-2 py-1 ${meth_key === method ? 'text-primary-200 dark:text-primary-300' : ''} hover:bg-light-200 dark:hover:bg-dark-200`}>
                    {METHOD_DESCRIPTION[meth_key]}
                  </button>
                </li>
              ))}
            </ul>
          </Dropdown>
        </div>
      )}

      { method === 'WAREHOUSES' && (
        !location 
        ? <ComboBox
            id="warehouses-finder"
            label={null}
            dropdownLabel="Checkpoint registrati"
            descriptionKey="name"
            data={inputWarehouses}
            onChange={(warehouse) => handleChangeByWarehouse(warehouse)}
            onKeyPress={null}
            disabled={false}
            placeholder="es. Deposito Roma"
            withPortal={withPortal}
            isLoading={isLoading}
            pagination={pagination}
          />
        : <LocationItem
          location={location}
          clearLocation={clearLocation 
            ? () => {
              setLocation && setLocation(null);
              setCheckpoint && setCheckpoint(null);
            }
            : null 
          }
          styles="mt-2"
        />
      )}

      { method === 'ADDRESS' && (
        !location
          ? <SearchPlaces
              label={null}
              onClick={(data) => handleChangeByAddress(data)}
              clearAfterClick={true}
              styles="mt-2"
            />
          : <LocationItem
              location={location}
              clearLocation={() => {
                setLocation && setLocation(null);
                setCheckpoint && setCheckpoint(null);
              }}
              styles="mt-2"
            />
      )}
    </div>
  )
}