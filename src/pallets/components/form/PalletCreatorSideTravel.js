import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import SafeCol from "../../../globals/components/layout/SafeCol"
import PalletOrdersSelection from "./PalletOrdersSelection"
import PalletTravelFinder from "./PalletTravelFinder"
import PalletWaypointSelector from "./PalletWaypointSelector"
import PalletVehicleForm from "./PalletVehicleForm"
import PalletTravelSelection from "./PalletTravelSelection"
import PalletCarrierOperatorForm from "./PalletCarrierOperatorForm"
import { changePalletCreatorWaypointThunk } from "../../api/pallets-thunks"
import { changePalletCreatorCarrierOperator, changePalletCreatorLicensePlate, changePalletCreatorTravelStamp, changePalletCreatorVehicleName, changePalletCreatorWaypointTab } from "../../slices/palletCreatorSlice"

export default function PalletCreatorSideTravel({
  companyId,
  travel,
  travel_id,
  isTravelSelected,
  travelStamp,
  waypoint,
  setLeaveModal,
  readOnlyData,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeWaypointHandler = (output) => waypoint 
    ? readOnlyData?.id 
      ? dispatch(changePalletCreatorWaypointThunk({ travel_id, waypoint: output })) 
      : setLeaveModal("waypoint")
    : dispatch(changePalletCreatorWaypointThunk({ travel_id, waypoint: output }));

  const onChangeOperationHandler = (tab) => waypoint 
    ? readOnlyData?.id 
      ? dispatch(changePalletCreatorWaypointTab(tab))
      : setLeaveModal("tab")
    : dispatch(changePalletCreatorWaypointTab(tab))

  return (
    <SafeCol id="pallet-creator-selectors">
      <div className="pr-4">
        { travel_id && isTravelSelected && (
          <PalletTravelSelection
            title={`Viaggio ${travel.stamp.split("-")[1]}`}
            travel={travel}
            clear={() => navigate('/pallets/create')}
          />
        )}

        {/* Waypoint selector */}
        { isTravelSelected && (
          <PalletWaypointSelector
            companyId={companyId}
            waypoints={travel.waypoints}
            palletHandlingCounter={travel.palletHandlingCounter}
            selectedWaypoint={waypoint}
            onChange={(output) => onChangeWaypointHandler(output)}
          />
        )}

        { waypoint && (
          <PalletOrdersSelection
            waypoint={waypoint}
            orders={travel.orders}
            onChange={tab => onChangeOperationHandler(tab)}
          />
        )}

        {/* Travel selector */}
        { travel_id && isTravelSelected
          ? !readOnlyData && (
            <>
                <PalletVehicleForm
                  licensePlate={travel?.licensePlate}
                  vehicleName={travel?.vehicleName}
                  changePalletLicensePlate ={(payload) => dispatch(changePalletCreatorLicensePlate(payload))}
                  changePalletVehicleName={(payload) => dispatch(changePalletCreatorVehicleName(payload))}
                />

                <PalletCarrierOperatorForm
                  carrierOperator={travel?.driver}
                  changePalletOperator={(value) => dispatch(changePalletCreatorCarrierOperator(value))}
                />
            </>
          )
          : <PalletTravelFinder
              title="Aggancia un viaggio"
              label="Inserisci l'ID viaggio"
              travelStamp={travelStamp}
              travel={travel}
              onChangeStamp={(value) => dispatch(changePalletCreatorTravelStamp(value))}
              travel_id={travel_id}
            />
        }
      </div>
    </SafeCol>
  )
}