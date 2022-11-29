import { useState } from "react"
import { useWarehousesByTenantQuery } from "../../../warehouses/api/warehouses-api-slice";
import { normalizeWindows } from "../../libs/helpers";
import LocationItem from "../layout/LocationItem";
import Dropdown from "../navigation/Dropdown";
import { TinyParagraph } from "../typography/paragraphs";
import ComboBox from "./ComboBox";
import SearchPlaces from "./SearchPlaces";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const METHOD_DESCRIPTION = {
  "ADDRESS": "Indirizzo",
  "WAREHOUSES": "Magazzini registrati"
}

export default function CheckpointLocalizer({
  tenant,
  location = null,
  setLocation,
  setCheckpoint,
  clearLocation = true,
  label,
  styles,
  inputWarehouses = null,
  withPortal = false,
}) {
  const [method, setMethod] = useState("WAREHOUSES");
  const { data: fetchedWarehouses = {}, isFetching: isFetchingWarehouses } = useWarehousesByTenantQuery({
    tenant,
    status: "ACTIVE",
    limit: 9999,
  });

  let warehousesIds = fetchedWarehouses.ids;
  let warehouses = fetchedWarehouses.entities;

  if(inputWarehouses) {
    warehouses = inputWarehouses.entities;
    warehousesIds = inputWarehouses.ids;
  }

  const handleChangeByWarehouse = (id) => {
    setCheckpoint
      ? setCheckpoint({
        id,
        name: warehouses[id].name,
        contacts: warehouses[id].contacts,
        note: warehouses[id].note,
        windows: normalizeWindows(warehouses[id].windows),
        maxLength: warehouses[id]?.maxLength,
        tools: warehouses[id]?.tools,
        location: {
          ...warehouses[id].location, 
          coordinate: { 
            lat: warehouses[id].location.coordinate[0], 
            lng: warehouses[id].location.coordinate[1]
          }
        }
      })
      : setLocation({
        ...warehouses[id].location, 
        coordinate: { 
          lat: warehouses[id].location.coordinate[0], 
          lng: warehouses[id].location.coordinate[1]
        }
      })
  };

  const handleChangeByAddress = (data) => {
    setCheckpoint 
      ? setCheckpoint({ 
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
          <TinyParagraph styles="pt-2 pr-2">Scegli metodo di ricerca:</TinyParagraph>
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

      { method === 'WAREHOUSES' && (
        !location 
        ? <ComboBox
            id="warehouses-finder"
            label={null}
            dropdownLabel="Checkpoint registrati"
            descriptionKey="name"
            data={warehousesIds.map(w_id => ({ 
              name: warehouses[w_id].name, 
              id: w_id,
            }))}
            onChange={({ id }) => handleChangeByWarehouse(id)}
            onKeyPress={null}
            disabled={false}
            placeholder="es. Deposito Roma"
            withPortal={withPortal}
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
        !location?.coordinate?.lat || !location?.coordinate?.lng
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