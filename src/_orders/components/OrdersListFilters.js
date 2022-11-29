import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { it } from 'date-fns/locale';
import { formatISO } from "date-fns";
// Components
import { SmallParagraph } from "../../globals/components/typography/paragraphs";
import { TinyTitle } from "../../globals/components/typography/titles";
import DatePicker, { registerLocale } from "react-datepicker";
import SimpleBar from 'simplebar-react';
import FormBoundNumber from "../../globals/components/dataEntry/FormBoundNumber";
import FormText from "../../globals/components/dataEntry/FormText";
// Helpers
import "react-datepicker/dist/react-datepicker.css";
import { FiDelete } from "react-icons/fi";
// Slices
import { resetPickupDateStart, selectOrdersShipmentType } from "../../orders/slices/ordersSlice";
import { resetDeliveryDateStart } from "../../orders/slices/ordersSlice";
import { ShipmentType } from "../../globals/libs/models";

// Constants -----------------------------------------------------------------------------------------------
registerLocale('it', it)

// Filters employers -----------------------------------------------------------------------------------------------
export default function OrdersListFilters({ runQuery, queryFrom }) {
  const [ pickupDateRange, setPickupDateRange ] = useState([null, null]);
  const [ deliveryDateRange, setDeliveryDateRange ] = useState([null, null]);
  const [ pickupDateStartFrom, pickupDateStartTo ] = pickupDateRange;
  const [ deliveryDateStartFrom, deliveryDateStartTo ] = deliveryDateRange;
  const [ quantityRange, setQuantityRange ] = useState(["", ""]);
  const [ quantityFrom, quantityTo ] = quantityRange;
  const [ pickupAddress, setPickupAddress ] = useState([]);
  const [ deliveryAddress, setDeliveryAddress ] = useState([]);
  const [ senderName, setSenderName ] = useState("");
  const [ carrierName, setCarrierName ] = useState("");
  const [ receiverName, setReceiverName ] = useState("");
  const shipmentType = useSelector((store) => selectOrdersShipmentType(store, queryFrom));
  const dispatch = useDispatch();

  // Range pickup date filter
  const handleChangePickup = value => {
    setPickupDateRange(value);
    if(value.length === 2 && !value.includes(null)) {
      // Converted to ISOString for compliance with AWSDate and Redux (new Date() is not good for redux store!)
      runQuery({ key: "pickupDateStart", value: [formatISO(new Date(value[0])), formatISO(new Date(value[1]))]})
    } else {
      dispatch(resetPickupDateStart(queryFrom));
    }

    if(value[0] === null && value[1] === null) {
      runQuery({ key: "pickupDateStart", value: [null, null]})
    }
  }

  // Range delivery date filter
  const handleChangeDelivery = value => {
    setDeliveryDateRange(value);
    if(value.length === 2 && !value.includes(null)) {
      // Converted to ISOString for compliance with AWSDate and Redux (new Date() is not good for redux store!)
      runQuery({ key: "deliveryDateStart", value: [formatISO(new Date(value[0])), formatISO(new Date(value[1]))]})
    } else {
      dispatch(resetDeliveryDateStart(queryFrom));
    }

    if(value[0] === null && value[1] === null) {
      runQuery({ key: "deliveryDateStart", value: [null, null]})
    }
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
      runQuery({ key: "quantity", value: newValue })
    };
  }

  const clearQuantityRange = () => {
    setQuantityRange(["", ""]);
    runQuery({ key: "quantity", value: ["", ""]})
  }

  return (
    <SimpleBar className="queryFilters h-full">
      <aside className="flex flex-col items-center">
        <div className="text-left w-full p-2">
          <div className="flex-1">
            {/* Dates */}
            <div className="mr-2">
              <TinyTitle styles="sticky top-0 z-50 bg-base-100 py-2">Filtri per data</TinyTitle>
              <div className="mt-2">
                <p className="label">Data di ritiro</p>
                <DatePicker
                  selectsRange={true}
                  startDate={pickupDateStartFrom}
                  endDate={pickupDateStartTo}
                  closeOnScroll={(e) => e.target === document}
                  className="relative input my-1 w-full block flex-1 mr-4"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Data di ritiro"
                  locale="it"
                  openToDate={new Date()}
                  isClearable
                  onChange={(update) => {
                    handleChangePickup(update);
                  }}
                />
              </div>
              
              <div className="mt-4">
                <p className="label">Data di consegna</p>
                <DatePicker
                  selectsRange={true}
                  startDate={deliveryDateStartFrom}
                  endDate={deliveryDateStartTo}
                  closeOnScroll={(e) => e.target === document}
                  className="relative input my-1 w-full block flex-1 mr-4"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Data di consegna"
                  locale="it"
                  openToDate={new Date()}
                  isClearable
                  onChange={(update) => {
                    handleChangeDelivery(update);
                  }}
                />
              </div>
            </div>

            {/* Shipment Type */}
            <div className="mr-2 mt-4">
              <TinyTitle styles="sticky top-0 z-50 bg-base-100 py-2">Filtra tipo spedizione</TinyTitle>
              <select
                className="input block w-full cursor-pointer"
                onChange={({ target: { value }}) => runQuery({ key: "shipmentType", value }) }
                value={shipmentType}
              >
                <option value="ALL">Tutti</option>
                <option value={ShipmentType.GROUPAGE}>Groupage</option>
                <option value={ShipmentType.DIRETTO}>Carico completo</option>
              </select>

              <div>
                <FormText
                  type="Azienda mittente"
                  label="Azienda mittente"
                  placeholder={"Es. LTS SRL"}
                  onChange={({ target: { value }}) => setSenderName(value)}
                  value={senderName}
                  styles="col-span-4 text-left text-base"
                  readOnly={false}
                  onBlur={() => runQuery({ key: "senderName", value: senderName })}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      runQuery({ key: "senderName", value: senderName })
                    }
                  }}
                />
              </div>
            </div>

            {/* Companies */}
            <div className="mr-2 mt-4">
              <TinyTitle styles="sticky top-0 z-50 bg-base-100 py-2">Filtri per azienda</TinyTitle>
              { queryFrom !== "sender" && <div className="flex items-center">
                <FormText
                  type="text"
                  placeholder={"Es. LTS SRL"}
                  label="Azienda mittente"
                  onChange={({ target: { value }}) => setSenderName(value)}
                  value={senderName}
                  styles="col-span-4 text-left text-base"
                  readOnly={false}
                  onBlur={() => runQuery({ key: "senderName", value: senderName })}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      runQuery({ key: "senderName", value: senderName })
                    }
                  }}
                />
              </div> }

              { queryFrom !== "carrier" && <div className="flex items-center">
                <FormText
                  type="text"
                  placeholder={"Es. LTS SRL"}
                  label="Azienda di trasporto"
                  onChange={({ target: { value }}) => setCarrierName(value)}
                  value={carrierName}
                  styles="col-span-4 text-left text-base"
                  readOnly={false}
                  onBlur={() => runQuery({ key: "carrierName", value: carrierName })}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      runQuery({ key: "carrierName", value: carrierName })
                    }
                  }}
                />
              </div> }

              { queryFrom !== "receiver" && <div className="flex items-center">
                <FormText
                  type="text"
                  label="Azienda destinataria"
                  placeholder={"Es. LTS SRL"}
                  onChange={({ target: { value }}) => setReceiverName(value)}
                  value={receiverName}
                  styles="col-span-4 text-left text-base"
                  readOnly={false}
                  onBlur={() => runQuery({ key: "receiverName", value: receiverName })}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      runQuery({ key: "receiverName", value: receiverName })
                    }
                  }}
                />
              </div> }
            </div>

            {/* Content */}
            <div className="mt-2">
              <TinyTitle styles="sticky top-0 z-50 bg-base-100 py-2">Filtri per contenuto</TinyTitle>
              <div className="flex items-center mr-2">
                <SmallParagraph styles="mr-2">Qnt. basi</SmallParagraph>
                <div className="mr-2">
                  <FormBoundNumber
                    error={null}
                    min={1}
                    max={quantityTo || 99}
                    onChange={val => handleChangeQuantity("from", val)}
                    inputValue={quantityFrom}
                    placeholder="da:"
                  />
                </div>
                <div className="mr-2">
                  <FormBoundNumber
                    error={null}
                    min={quantityFrom || 2}
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
            </div>

            <div className="mr-2 mt-2">
              <TinyTitle styles="sticky top-0 z-50 bg-base-100 py-2">Filtri geografici</TinyTitle>
              <FormText
                type="text"
                placeholder={"Es. Indirizzo, regione, città, CAP, ecc."}
                onChange={({ target: { value }}) => setPickupAddress(value)}
                value={pickupAddress}
                label="Indicazioni geografiche ritiro"
                styles="text-left text-base"
                readOnly={false}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    runQuery({ key: "pickupAddress", value: pickupAddress })
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
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    runQuery({ key: "deliveryAddress", value: deliveryAddress })
                  }
                }}
              />
            </div>
          </div>
        </div>
      </aside>
    </SimpleBar>
  )
} 