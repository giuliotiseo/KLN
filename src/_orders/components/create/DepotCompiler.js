import { useEffect, useState } from "react";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { Paragraph } from "../../../globals/components/typography/paragraphs";
import PositionLocalizer from "../../../globals/components/dataEntry/PositionLocalizer";
import DateTimeRangePicker from "../../../globals/components/dataEntry/DateTimeRangePicker";
import StorekeeperSelector from "../../../preOrders/components/StorekeeperSelector";
import SimpleMap from "../../../globals/components/layout/SimpleMap";
// Helpers
import { formatDate, getStandardCoordinatesByCheckpoint } from "../../../globals/libs/helpers";
// Icons
import { FiInfo, FiAlertTriangle } from "react-icons/fi"
import { runDateTimeVerifications } from "../../libs/helpers";
import { v4 } from "uuid";

// Sub component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function DepotCompilerModule ({
  carrier,
  updateForm,
  depotCheckpoint,
  depotDateStart,
  depotDateEnd,
  pickupDateEnd,
  deliveryDateStart,
  clearLocation, 
  setDrawer
}) {
  const [ warning, setWarning ] = useState(false);
  const [ mapVisibility, setMapVisibility ] = useState(false);

  useEffect(() => {
    setWarning(false);
    if(depotDateStart && depotDateEnd && depotCheckpoint?.windows.SCARICO) {
      runDateTimeVerifications(depotCheckpoint.windows.SCARICO, depotDateStart, depotDateEnd, setWarning)
    }
  }, [depotDateStart, depotDateEnd, depotCheckpoint?.windows?.SCARICO]);

  const standard_coordinate = getStandardCoordinatesByCheckpoint(depotCheckpoint);
  
  return (
    <>
      {/* Pickup: place and date  */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="col-span-2 lg:col-span-1">
          {/* Checkpoint */}
          <SmallTitle>Indicazioni luogo di scarico</SmallTitle>
          <PositionLocalizer
            location={depotCheckpoint?.location}
            inputWarehouses={carrier?.checkpoints}
            clearLocation={clearLocation}
            label={"Indica il magazzino di scarico"}
            styles="mb-4"
            setCheckpoint={(value) => updateForm({
              target: {
                type: "depot",
                name: "depot.checkpoint",
                value
              }
            })}
          />
          
          { depotCheckpoint && (
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
          <SmallTitle styles="col-span-4">Data e orario di scarico</SmallTitle>
          <DateTimeRangePicker
            labelIcon={() => <FiInfo className="mr-1" />}
            label={`Ritiro dal mittente previsto entro il ${formatDate(new Date(pickupDateEnd), "PPp")}`}
            start={depotDateStart ? new Date(depotDateStart) : ""}
            end={depotDateEnd ? new Date(depotDateEnd) : ""}
            setStart={(value) => updateForm({ target: { type: "depot", name: "depot.start", value }})}
            setEnd={(value) => updateForm({ target: { type: "depot", name: "depot.end", value }})}
            minimumStart={pickupDateEnd}
            maximumStart={deliveryDateStart}
            timeMargin={0}
          />

          { warning && (
            <p className="flex items-center text-sm text-amber-500 dark:text-amber-200">
              <FiAlertTriangle className="mr-2" />Date non corrispondenti con le info di scarico
            </p>
          )}
        </div>

        { mapVisibility && standard_coordinate?.lat && standard_coordinate?.lng && (
          <div className="h-[300px] col-span-4 rounded-md overflow-hidden">
            <SimpleMap
              lat={standard_coordinate.lat}
              lng={standard_coordinate.lng}
              onClick={value => updateForm({
                target: {
                  type: "depot",
                  name: "depot.checkpoint",
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
        {/* { depotCheckpoint && (
          <ContactCheckpointCompiler
            checkpoints={[depotCheckpoint]}
            editEnabled={false}
            titleStyles="mt-4"
          />
        )} */}

      <StorekeeperSelector
          company={carrier}
          checkpoint={depotCheckpoint}
          inputStorekeepers={depotCheckpoint?.contacts || null}
          onChange={(value) => updateForm({ target: { type: "contacts", name: "depot.checkpoint", value: value ? value() : null }})}
          warehouseSearch={carrier?.companyId}
          styles="mt-6"
        />
      </div>
    </>
  )
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const DepotCompiler = ({ carrier, depot, updateForm, showCompiler, pickupDateEnd, deliveryDateStart, setDrawer, clearLocation }) => {
  const depotCheckpoint = depot.checkpoint;
  const depotDateStart = depot.start;
  const depotDateEnd = depot.end;

  return (
    <>
      <SmallTitle styles="flex items-center">
        <span>Info deposito</span>
      </SmallTitle>

      {/* Company finder */}
      { showCompiler 
        ? <div className="max-w-full">
            <DepotCompilerModule
              carrier={carrier} 
              updateForm={updateForm}
              depotCheckpoint={depotCheckpoint}
              depotDateStart={depotDateStart}
              depotDateEnd={depotDateEnd}
              deliveryDateStart={deliveryDateStart}
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

export default DepotCompiler;