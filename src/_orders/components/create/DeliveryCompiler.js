import { useEffect, useState } from "react";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { Paragraph } from "../../../globals/components/typography/paragraphs";
import CompanyFinder from "../../../globals/components/dataEntry/CompanyFinder";
import PositionLocalizer from "../../../globals/components/dataEntry/PositionLocalizer";
import DateTimeRangePicker from "../../../globals/components/dataEntry/DateTimeRangePicker";
import StorekeeperSelector from "../../../preOrders/components/StorekeeperSelector";
import SimpleMap from "../../../globals/components/layout/SimpleMap";
// Helpers
import { formatDate, getStandardCoordinatesByCheckpoint } from "../../../globals/libs/helpers";
// Icons
import { FiInfo, FiAlertTriangle } from "react-icons/fi"
import { runDateTimeVerifications } from "../../libs/helpers";
import deliveryIcon from '../../../globals/assets/delivery_pin.svg';
import { v4 } from "uuid";

// Sub component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function DeliveryCompilerModule ({ receiver, updateForm, deliveryCheckpoint, deliveryDateStart, deliveryDateEnd, pickupDateStart, pickupDateEnd, clearLocation, setDrawer }) {
  const [ warning, setWarning ] = useState(false);
  const [ mapVisibility, setMapVisibility ] = useState(false);

  useEffect(() => {
    setWarning(false);
    if(deliveryDateStart && deliveryDateEnd && deliveryCheckpoint?.windows.SCARICO) {
      runDateTimeVerifications(deliveryCheckpoint.windows.SCARICO, deliveryDateStart, deliveryDateEnd, setWarning)
    }
  }, [deliveryDateStart, deliveryDateEnd, deliveryCheckpoint?.windows?.SCARICO]);
  
  const setCompanies = (value) => {
    updateForm({ target: { type: "company", name: "receiver", value: {
      ...value,
      checkpoints: value?.warehouses?.items ? value?.warehouses?.items : value?.checkpoints
    }}});
  }

  const standard_coordinate = getStandardCoordinatesByCheckpoint(deliveryCheckpoint);

  return (
    <>
      <CompanyFinder
        company={receiver}
        setCompany={value => setCompanies(value)}
        label="Cerca l'azienda che riceverà l'ordine"
        id="search-receiver"
        reset={() => updateForm({ target: { type: "reset", name: "delivery" }})}
      />

      {/* Pickup: place and date  */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="col-span-2 lg:col-span-1">
          {/* Checkpoint */}
          <SmallTitle>Indicazioni luogo di consegna</SmallTitle>
          <PositionLocalizer
            location={deliveryCheckpoint?.location}
            inputWarehouses={receiver?.checkpoints}
            label={"Indica il punto di consegna della merce"}
            styles="mb-4"
            clearLocation={clearLocation}
            setCheckpoint={(value) => updateForm({
              target: {
                type: "delivery",
                name: "delivery.checkpoint",
                value
              }
            })}
          />

          { deliveryCheckpoint && (
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
          {/* Date time range */}
          <SmallTitle styles="col-span-4">Data e orario di consegna</SmallTitle>
          <DateTimeRangePicker
            labelIcon={() => <FiInfo className="mr-1" />}
            label={`Ritiro dal mittente previsto entro il ${formatDate(new Date(pickupDateEnd), "PPp")}`}
            start={deliveryDateStart ? new Date(deliveryDateStart) : ""}
            end={deliveryDateEnd ? new Date(deliveryDateEnd) : ""}
            setStart={(value) => updateForm({ target: { type: "delivery", name: "delivery.start", value }})}
            setEnd={(value) => updateForm({ target: { type: "delivery", name: "delivery.end", value }})}
            minimumStart={pickupDateStart}
            timeMargin={0}
          />

          { warning && 
            <p className="flex items-center text-sm text-amber-500 dark:text-amber-200">
              <FiAlertTriangle className="mr-2" />
              Date non corrispondenti con le info di scarico
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
                  type: "delivery",
                  name: "delivery.checkpoint",
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
      <div className="mb-4">
        <StorekeeperSelector
          company={receiver}
          checkpoint={deliveryCheckpoint}
          inputStorekeepers={deliveryCheckpoint?.contacts || null}
          onChange={(value) => updateForm({ target: { type: "contacts", name: "delivery.checkpoint", value: value ? value() : null }})}
          warehouseSearch={receiver?.companyId}
          styles="mt-6"
        />
      </div>
    </>
  )
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const DeliveryCompiler = ({ receiver, delivery, updateForm, showCompiler, pickupDateStart, pickupDateEnd, setDrawer, clearLocation }) => {
  const deliveryCheckpoint = delivery.checkpoint;
  const deliveryDateStart = delivery.start;
  const deliveryDateEnd = delivery.end;

  return (
    <>
      <SmallTitle styles="flex items-center">
        <img src={deliveryIcon} className='w-[30px] mr-2' />
        <span>Info consegna</span>
      </SmallTitle>

      {/* Company finder */}
      { showCompiler 
        ? <div className="max-w-full">
            <DeliveryCompilerModule
              receiver={receiver} 
              updateForm={updateForm}
              deliveryCheckpoint={deliveryCheckpoint}
              deliveryDateStart={deliveryDateStart}
              deliveryDateEnd={deliveryDateEnd}
              pickupDateStart={pickupDateStart}
              pickupDateEnd={pickupDateEnd}
              clearLocation={clearLocation}
              setDrawer={setDrawer}
            />
          </div>
        : <Paragraph styles="alert-info px-4 mt-4">
            Indica le informazioni di ritiro per procedere
          </Paragraph>
      }
    </>
    )
}

export default DeliveryCompiler;