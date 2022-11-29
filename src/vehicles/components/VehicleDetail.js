// Components
import VehicleDimensions from "./detail/VehicleDimensions";
import VehicleNoteDetail from "./detail/VehicleNoteDetail";
import VehicleFeaturesList from "./item/VehicleFeaturesList";
import VehicleSpot from "./item/VehicleSpot";
import LocationItem from "../../globals/components/layout/LocationItem";
import LogsDispayList from "../../globals/components/layout/LogsDispayList";
import FullSpinner from "../../globals/components/spinners/FullSpinner";
import { HugeParagraph, LargeParagraph, TinyParagraph } from "../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../globals/components/typography/titles";
// Icons
import { FiPauseCircle, FiPlayCircle, FiStopCircle } from "react-icons/fi";
import { VscGitCommit } from "react-icons/vsc";
// Helpers
import { VehicleType, VEHICLE_STATUS_DESCRIPTION, VEHICLE_TYPE_DESCRIPTION } from "../libs/helpers";
import { formatDate } from "../../globals/libs/helpers";

export default function VehicleDetail({ vehicle }) {
  if(!vehicle) return <FullSpinner />
  
  const colors = {
    "DISPONIBILE":  "text-success-100 dark:text-success-300",
    "NON_DISPONIBILE": "text-danger-200 dark:text-danger-300",
    "IN_MARCIA": "text-amber-400 dark:text-amber-200",
  }

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-2 px-8">
      <div className="col-span-1 top-0 bg-base-100 z-10 pb-2 bg-opacity-95">
        <div className="mt-4">
          <HugeParagraph>{VEHICLE_TYPE_DESCRIPTION[vehicle.type]}</HugeParagraph>
          <div className="mt-2">
            <LargeParagraph styles={`flex items-center ${colors[vehicle.status]}`}>
              { vehicle.status === 'DISPONIBILE' && <FiPlayCircle className="mr-1" />}
              { vehicle.status === 'NON_DISPONIBILE' && <FiStopCircle className="mr-1" />}
              { vehicle.status === 'IN_MARCIA' && <FiPauseCircle className="mr-1" />}
              <span>{VEHICLE_STATUS_DESCRIPTION[vehicle.status]}</span>
            </LargeParagraph>
          </div>
        </div>

        <div className="mt-8">
          <SmallTitle>Tracking mezzo</SmallTitle>
          <div className="mt-2">
            <LocationItem location={vehicle.lastPosition} />
            { vehicle.updatedAt && <TinyParagraph styles="flex items-center mt-4">Ultima modifica registrata: {formatDate(new Date(vehicle.updatedAt), "PPpp")}</TinyParagraph> }
          </div>
        </div>

        { vehicle.spot && <div className="mt-8">
          <SmallTitle styles="mb-2">Posti disponibili</SmallTitle>
          <VehicleSpot spot={vehicle.spot} />
        </div> }

        <div className="mt-8">
          <VehicleFeaturesList {...vehicle} />
        </div>

        { vehicle.dimensions && <div className="mt-8">
          <VehicleDimensions dimensions={vehicle.dimensions} trailType={vehicle.type === VehicleType.MOTRICE ? 'cassone' : 'rimorchio'} />
        </div> }

        <div className="mt-8">
          <VehicleNoteDetail content={vehicle.note} />
        </div>

        <div className="mt-8 w-full">
          <div className="flex w-full flex-1">
            <VscGitCommit className="text-3xl" />
            <LogsDispayList
              JSONLogs={vehicle.log}
              title="Attività recenti"
              styles="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}