import { useState } from "react";
// Components
import SimpleBar from 'simplebar-react';
import DatePicker from "react-datepicker";
import FormText from "../../../globals/components/dataEntry/FormText";
import FormBoundNumber from "../../../globals/components/dataEntry/FormBoundNumber";
import ActionButton from "../../../globals/components/buttons/ActionButton";
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { TinyTitle } from "../../../globals/components/typography/titles";
// Helpers
import { ShipmentType } from "../../../globals/libs/models";
import { formatISO } from "date-fns";
// Icons
import { FiDelete } from "react-icons/fi";
import { BiReset } from "react-icons/bi";
import { ORDER_STATUS_DESCRIPTION } from "../../../orders/libs/constants";
import { EXCLUDED_STATUS_FOR_TRAVEL } from "../../../orders/slices/ordersListSlice";

const FilterBox = ({ title, className, children }) => {
  return (
    <div className={`mr-2 p-2 bg-base-100 rounded-md ${className}`}>
      { title && <TinyTitle styles="sticky top-0 z-0 bg-base-100 py-2">{title}</TinyTitle>}
      { children }
    </div>
  )
}

export default function OrdersListFiltersForTravel({ filter, onChange, reset }) {
  const [ stamp, setStamp ] = useState(filter?.stamp || "");
  const [ senderName, setSenderName ] = useState(filter?.senderName);
  const [ receiverName, setReceiverName ] = useState(filter?.receiverName);
  const [ quantityRange, setQuantityRange ] = useState([filter?.quantity?.[0] || null, filter?.quantity?.[1] || null]);
  const [ quantityFrom, quantityTo ] = quantityRange;
  const [ pickupAddress, setPickupAddress ] = useState(filter?.pickupAddress)
  const [ depotAddress, setDepotAddress ] = useState(filter?.depotAddress)
  const [ deliveryAddress, setDeliveryAddress ] = useState(filter?.deliveryAddress)

  // Range pickup date filter
  const handleChangeDateRange = (key, value) => {
    console.log(value);
    // Converted to ISOString for compliance with AWSDate and Redux (new Date() is not good for redux store!)
    onChange({
      key,
      value: [
        value[0] ? formatISO(new Date(value[0])) : null, 
        value[1] ? formatISO(new Date(value[1])) : null
      ]
    })
  }

  // Change quantity range
  const handleChangeQuantity = (target, value) => {
    let newValue;
    if(target === "from") {
      newValue = [value, quantityRange[1]];
      setQuantityRange(newValue);
    };

    if(target === "to") {
      newValue = [quantityRange[0], value];
      setQuantityRange(newValue);
    };

    if(!newValue.includes("") && newValue[0] <= newValue[1]) {
      onChange({ key: "quantity", value: newValue })
    };
  }

  const clearQuantityRange = () => {
    setQuantityRange(["", ""]);
    onChange({ key: "quantity", value: ["", ""]})
  }

  return (
    <SimpleBar className="queryFilters h-full">
      <aside className="flex flex-col items-center">
        <div className="text-left w-full">
          <div className="flex-1">
            <ActionButton
              styles="btn-ghost mt-4"
              onClick={reset}
              text="Pulisci filtri"
              icon={() => <BiReset />}
            />

            <FilterBox title="Escludi stato ordine" className="my-2">
              <div className="flex items-center">
                <select
                  className="input block w-full cursor-pointer mt-4"
                  onChange={({ target: { value }}) => value === "ALL"
                    ? onChange({ key: "filterStatus", value: EXCLUDED_STATUS_FOR_TRAVEL })
                    : onChange({ key: "filterStatus", value: EXCLUDED_STATUS_FOR_TRAVEL.concat(value) }) }
                  value={filter.status.filter(st => !["PICKEDUP", "DELIVERING", "DELIVERED"].includes(st))[0]}
                >
                  <option value="ALL">Nessuno</option>
                  {["PENDING", "STOCKED"].map(o_key => (
                    <option key={o_key} value={o_key}>{ORDER_STATUS_DESCRIPTION[o_key]}</option>
                  ))}
                </select>
              </div>
            </FilterBox>

            {/* Companies */}
            <FilterBox title="Filtri per ordine" className="my-2">
              <div className="flex items-center">
                <FormText
                  type="text"
                  placeholder={"Es. AB123C4D"}
                  label="Inserisci identificativo ordine"
                  onChange={({ target: { value }}) => setStamp(value)}
                  value={stamp}
                  styles="col-span-4 text-left text-base"
                  readOnly={false}
                  onBlur={() => onChange({ key: "stamp", value: stamp.toUpperCase() })}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      onChange({ key: "stamp", value: stamp.toUpperCase() })
                    }
                  }}
                />
              </div>
            </FilterBox>

            {/* Dates */}
            <FilterBox title="Data di ritiro" className="my-2">
              <div>
                <p className="label">Data di ritiro</p>
                <DatePicker
                  selectsRange={true}
                  startDate={filter?.pickupDateStart?.[0] ? new Date(filter.pickupDateStart[0]) : null}
                  endDate={filter?.pickupDateStart?.[1] ? new Date(filter.pickupDateStart[1]) : null}
                  closeOnScroll={(e) => e.target === document}
                  className="relative input my-1 w-full block flex-1 mr-4"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Data di ritiro"
                  locale="it"
                  openToDate={new Date()}
                  isClearable
                  onChange={(update) => {
                    handleChangeDateRange("pickupDateStart", update);
                  }}
                />
              </div>
              
              <div className="mt-4">
                <p className="label">Data di consegna</p>
                <DatePicker
                  selectsRange={true}
                  startDate={filter?.deliveryDateStart?.[0] ? new Date(filter.deliveryDateStart[0]) : null}
                  endDate={filter?.deliveryDateStart?.[1] ? new Date(filter.deliveryDateStart[1]) : null}
                  closeOnScroll={(e) => e.target === document}
                  className="relative input my-1 w-full block flex-1 mr-4"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Data di consegna"
                  locale="it"
                  openToDate={new Date()}
                  isClearable
                  onChange={(update) => {
                    handleChangeDateRange("deliveryDateStart", update);
                  }}
                />
              </div>
            </FilterBox>

            {/* Shipment Type */}
            <FilterBox title="Filtra tipo spedizione" className="my-2">
              <select
                className="input block w-full cursor-pointer mt-4"
                onChange={({ target: { value }}) => onChange({ key: "shipmentType", value }) }
                value={filter.shipmentType}
              >
                <option value="ALL">Tutti</option>
                <option value={ShipmentType.GROUPAGE}>Groupage</option>
                <option value={ShipmentType.DIRETTO}>Carico completo</option>
              </select>
            </FilterBox>

            {/* Companies */}
            <FilterBox title="Filtri per azienda" className="my-2">
              <div className="flex items-center">
                <FormText
                  type="text"
                  placeholder={"Es. LTS SRL"}
                  label="Azienda mittente"
                  onChange={({ target: { value }}) => setSenderName(value)}
                  value={senderName}
                  styles="col-span-4 text-left text-base"
                  readOnly={false}
                  onBlur={() => onChange({ key: "senderName", value: senderName })}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      onChange({ key: "senderName", value: senderName })
                    }
                  }}
                />
              </div>

              <div className="flex items-center">
                <FormText
                  type="text"
                  label="Azienda destinataria"
                  placeholder={"Es. LTS SRL"}
                  onChange={({ target: { value }}) => setReceiverName(value)}
                  value={receiverName}
                  styles="col-span-4 text-left text-base"
                  readOnly={false}
                  onBlur={() => onChange({ key: "receiverName", value: receiverName })}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      onChange({ key: "receiverName", value: receiverName })
                    }
                  }}
                />
              </div>
            </FilterBox>

            {/* Content */}
            <FilterBox title="Filtri per contenuto" className="my-2">
              <div className="flex items-center mr-2">
                <SmallParagraph styles="mr-2">Qnt. basi</SmallParagraph>
                <div className="mr-2">
                  <FormBoundNumber
                    error={null}
                    min={1}
                    max={98}
                    // max={quantityTo || 99}
                    onChange={val => handleChangeQuantity("from", val)}
                    inputValue={quantityFrom}
                    placeholder="da:"
                  />
                </div>
                <div className="mr-2">
                  <FormBoundNumber
                    error={null}
                    // min={quantityFrom || 2}
                    min={1}
                    max={99}
                    onChange={val => handleChangeQuantity("to", val)}
                    inputValue={quantityTo}
                    placeholder="a:"
                  />
                </div>
                <button className="btn btn-primary" onClick={clearQuantityRange}>
                  <FiDelete />
                </button>
              </div>
            </FilterBox>

            <FilterBox title="Filtri geografici" className="my-2">
              <FormText
                type="text"
                placeholder={"Es. Indirizzo, regione, città, CAP, ecc."}
                onChange={({ target: { value }}) => setPickupAddress(value)}
                value={pickupAddress}
                label="Indicazioni geografiche ritiro"
                styles="text-left text-base"
                readOnly={false}
                onBlur={() => onChange({ key: "pickupAddress", value: pickupAddress })}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    onChange({ key: "pickupAddress", value: pickupAddress })
                  }
                }}
              />

              <FormText
                type="text"
                placeholder={"Es. Indirizzo, regione, città, CAP, ecc."}
                onChange={({ target: { value }}) => setDepotAddress(value)}
                value={depotAddress}
                label="Indicazioni geografiche deposito"
                styles="text-left text-base mt-4"
                readOnly={false}
                onBlur={() => onChange({ key: "depotAddress", value: depotAddress })}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    onChange({ key: "depotAddress", value: depotAddress })
                  }
                }}
              />

              <FormText
                type="text"
                placeholder={"Es. Indirizzo, regione, città, CAP, ecc."}
                onChange={({ target: { value }}) => setDeliveryAddress(value)}
                value={deliveryAddress}
                label="Indicazioni geografiche consegna"
                styles="text-left text-base mt-4"
                readOnly={false}
                onBlur={() => onChange({ key: "deliveryAddress", value: deliveryAddress })}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    onChange({ key: "deliveryAddress", value: deliveryAddress })
                  }
                }}
              />
            </FilterBox>
          </div>
        </div>
      </aside>
    </SimpleBar>
  )
}