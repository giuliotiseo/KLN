import { useEffect, useState } from "react";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import CompanyFinder from "../../../globals/components/dataEntry/CompanyFinder";
import PositionLocalizer from "../../../globals/components/dataEntry/PositionLocalizer";
import DateTimeRangePicker from "../../../globals/components/dataEntry/DateTimeRangePicker";
import StorekeeperSelector from "../../../preOrders/components/StorekeeperSelector";
import BasicSelector from "../../../globals/components/dataEntry/BasicSelector";
import TradeSelector from "../../../preOrders/components/TradeSelector";
import FormBoundNumber from "../../../globals/components/dataEntry/FormBoundNumber";
import ControlledSelector from "../../../globals/components/dataEntry/ControlledSelector";
import SimpleMap from "../../../globals/components/layout/SimpleMap";
import { ShipmentType } from "../../../globals/libs/models";
// Helpers
import { v4 } from "uuid";
import { TRANSPORT_TYPE_DESCRIPTION, TRANSPORT_TYPE_LONG_DESCRIPTION } from "../../../preOrders/libs/helpers";
import { COMPLEX_VEHICLE_LIMIT } from "../../../vehicles/libs/helpers";
import { runDateTimeVerifications } from "../../libs/helpers";
// Icons
import { FiAlertTriangle, FiInfo } from "react-icons/fi";
import { getStandardCoordinatesByCheckpoint } from "../../../globals/libs/helpers";
import { useNavigate } from "react-router-dom";

const modes = {
  "sender": { text: "Modalità cliente", actionText: "Cerca l'azienda che trasporta l'ordine", opposite: "carrier" },
  "carrier": { text: "Modalità trasportatore", actionText: "Cerca l'azienda che invia l'ordine", opposite: "sender"}
} 

function PickupCompiler ({ updateForm, mode, myCompany, changeableMode = true, sender, carrier, pickup, shipmentType, trades, setDrawer, initLoadingMeterLimit, hideSlot = false, clearLocation }) {
  const [ slot, setSlot ] = useState(hideSlot ? null : 1);
  const [ warning, setWarning ] = useState(false);
  const [ mapVisibility, setMapVisibility ] = useState(false);
  const pickupCheckpoint = pickup.checkpoint;
  const pickupDateStart = pickup.start;
  const pickupDateEnd = pickup.end;
  const navigate = useNavigate();

  useEffect(() => {
    initLoadingMeterLimit(slot, [80,120]);
  }, [slot, initLoadingMeterLimit]);

  // Controls over datetime
  useEffect(() => {
    setWarning(false);
    if(pickupDateStart && pickupDateEnd && pickupCheckpoint?.windows.CARICO) {
      runDateTimeVerifications(pickupCheckpoint.windows.CARICO, pickupDateStart, pickupDateEnd, setWarning)
    }
  }, [pickupDateStart, pickupDateEnd, pickupCheckpoint?.windows?.CARICO]);

  const changeMode = (value) => {
    updateForm({ target: { type: "company", name: modes[mode].opposite, value: { ...myCompany, tenant: myCompany.tag }}});
    updateForm({ target: { name: mode, type: "company", value: null }});
    updateForm({ target: { type: "pickup", name: "pickup.checkpoint", value: null }});
    navigate(`/orders/create?from=${value}`);
  }

  const setCompanies = (value) => {
    updateForm({ target: { type: "company", name: modes[mode].opposite, value: {
      ...value,
      checkpoints: value?.warehouses?.items ? value?.warehouses?.items : value?.checkpoints
    }}});

    updateForm({ target: { name: mode, type: "company", value: { ...myCompany, tenant: myCompany.tag } }});

    // if(mode === "sender" && !value.tag) {
    //   toast.error('Impossibile inviare un pre-ordine ad un\'azienda di trasporti non registrata alla piattaforma.');
    //   toast.error('Si prega di effettuare un tenativo di sincronizzazione dei dati dalla rubrica. In caso di fallimento, inviare all\'azienda un invito di iscrizione alla piattaforma.', { autoClose: 10000 });
    //   updateForm({ target: { type: "company", name: modes[mode].opposite, value: null }});
    //   return;
    // }
  }

  const standard_coordinate = getStandardCoordinatesByCheckpoint(pickupCheckpoint);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="mr-2 mb-4">
          <SmallTitle styles="flex items-center">
            <span>Cerca azienda { mode === "carrier" ? "mittente" : "di trasporto"}</span>
          </SmallTitle>
        </div>
        { changeableMode && myCompany.type === "TRANSPORT" && (
          <ControlledSelector
            id="pickup-compiler"
            label={null}
            value={mode}
            disabled={false}
            onChange={value => changeMode(value)}
            styles=""
          >
            { Object.keys(modes).map(value => (
              <option key={value} value={value}>{modes[value].text}</option>
            ))}
          </ControlledSelector>
        )}
      </div>

      {/* Sender */}
      <div>
        <CompanyFinder
          company={mode === "carrier" ? sender : carrier}
          searchType={mode === "sender" ? "TRANSPORT" : null}
          setCompany={value => setCompanies(value)}
          label={modes[mode]?.text || ""}
          id="search-company"
          registeredOnly={mode === "sender" ? true : false}
          reset={() => updateForm({ target: { type: "reset", name: modes[mode].opposite, value: null }})}
        />
      </div>

      {/* Pickup: place and date  */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="col-span-2 lg:col-span-1">
          <SmallTitle>Indicazioni luogo di carico</SmallTitle>
          <PositionLocalizer
            location={pickupCheckpoint?.location}
            inputWarehouses={sender?.checkpoints}
            label={"Indica il punto di ritiro della merce"}
            styles="mb-4"
            clearLocation={clearLocation}
            setCheckpoint={(value) => updateForm({
              target: {
                type: "pickup",
                name: "pickup.checkpoint",
                value
              }
            })}
          />

          { pickupCheckpoint && (
            <div className="flex items-center">
              <button onClick={() => setDrawer(true)} className="flex rounded-md items-center px-2 py-1 bg-secondary-200 dark:bg-secondary-300 text-light-300 dark:text-light-300 opacity-60 hover:opacity-100">
                <FiInfo className="mr-2" />
                <span>Info punto di interesse</span>
              </button>
              <button
                onClick={() => setMapVisibility(prev => !prev)}
                className=" ml-2 flex rounded-md items-center px-2 py-1 bg-secondary-200 dark:bg-secondary-300 text-light-300 dark:text-light-300 opacity-60 hover:opacity-100"
              >
                { mapVisibility 
                  ? <span>Nascondi mappa</span>
                  : <span>Mostra mappa</span>
                }
              </button>
            </div>
          )}
        </div>
        <div className="col-span-2 lg:col-span-1">
          <SmallTitle styles="col-span-4">Indicazioni data e orario</SmallTitle>
          <DateTimeRangePicker
            label="Imposta data e orario indicativi"
            start={pickupDateStart ? new Date(pickupDateStart) : ""}
            end={pickupDateEnd ? new Date(pickupDateEnd) : ""}
            setStart={(value) => updateForm({ target: { type: "pickup", name: "pickup.start", value }})}
            setEnd={(value) => updateForm({ target: { type: "pickup", name: "pickup.end", value }})}
            timeMargin={0}
          />
          { warning && 
            <p className="flex items-center text-sm text-amber-500 dark:text-amber-200">
              <FiAlertTriangle className="mr-2" />Date non corrispondenti con le info di carico
            </p>
          }
        </div>

        { mapVisibility && standard_coordinate?.lat && standard_coordinate?.lng && (
          <div className="h-[300px] col-span-4 rounded-md overflow-hidden">
            <SimpleMap
              lat={standard_coordinate.lat}
              lng={standard_coordinate.lng}
              onClick={value => updateForm({
                target: {
                  type: "pickup",
                  name: "pickup.checkpoint",
                  value: ({
                    extId: v4(),
                    name: value.address,
                    windows: { CARICO: [], SCARICO: []},
                    location: value,
                  })
                }
              })}
            />
          </div>
        )}
      </div>

      {/* Contacts refer */}
      <div className="mt-2 mb-8"> 
        <StorekeeperSelector
          company={sender}
          checkpoint={pickupCheckpoint}
          inputStorekeepers={pickupCheckpoint?.contacts || null}
          onChange={(value) => updateForm({ target: { type: "contacts", name: "pickup.checkpoint", value: value ? value() : null }})}
          warehouseSearch={sender?.companyId}
        />
      </div>

      {/* Transport Type */}
      <div className="mt-4">
        <SmallTitle>Tipologia di spedizione</SmallTitle>
        <BasicSelector
          id="shipment-type"
          label="Scegli come intendi spedire la merce"
          value={shipmentType}
          onChange={(value) => 
            // console.log(value) 
            updateForm({ target: { type: "select", name: "shipmentType", value }})
          }
          styles="w-full mt-2 bg-light-100 dark:bg-dark-300 border-light-100 dark:border-dark-300 hover:border-tertiary-100 dark:focus:border-tertiary-100"
        >
          { Object.keys(ShipmentType).map(tra_type => (
            <option key={tra_type} value={tra_type}>
              {TRANSPORT_TYPE_DESCRIPTION[tra_type]}
            </option>
          ))}
        </BasicSelector>
      
        <SmallParagraph styles="mt-2">
          {TRANSPORT_TYPE_LONG_DESCRIPTION[shipmentType]}
        </SmallParagraph>
      </div>

      {/* Trades */}
      <div className="mt-8">
        <SmallTitle>Tipologia carico</SmallTitle>
        <TradeSelector
          label="Seleziona una o più opzioni"
          selectedTrades={trades}
          setSelectedTrades={(value) => updateForm({ target: { type: "list", name: "trades", value: value ? value() : []}})}
        />
      </div>

      {/* Basis input */}
      { !hideSlot && (
        <div className="mt-6">
          <SmallTitle>Basi a terra</SmallTitle>
          <p className="label">Comunica lo spazio che occuperai sul veicolo in basi <b>80x120</b></p>
          <div className="flex mt-4 items-center">
            <FormBoundNumber
              error="Quantità basi non consentita"
              min={0}
              max={COMPLEX_VEHICLE_LIMIT["NONE"]}
              onChange={val => setSlot(val)}
              inputValue={slot}
            />
            <div>
            <button
              className={`w-36 ml-1 whitespace-nowrap p-2 border border-light-50 hover:border-secondary-300 dark:hover:border-secondary-300 dark:border-dark-100 rounded-md cursor-pointer ${slot === COMPLEX_VEHICLE_LIMIT["NONE"]  ? 'bg-primary-200 dark:bg-primary-200 text-light-100 dark:text-light-100 border-primary-100 dark:border-primary-300' : 'bg-light-200 text-dark-50 dark:bg-dark-200 dark:text-light-100'}`}
              onClick={() => setSlot(() => COMPLEX_VEHICLE_LIMIT["NONE"])}
            >
              {slot === COMPLEX_VEHICLE_LIMIT["NONE"]  ? 'Pieno carico' : 'Carico completo' }
            </button>
            </div>
            <div className="flex-1 ml-4">
              <p>Scegli un numero di basi 80x120 compreso tra 1 e {COMPLEX_VEHICLE_LIMIT["NONE"]}.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PickupCompiler;