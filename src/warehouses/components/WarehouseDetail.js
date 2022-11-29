import { FiCheck, FiX } from "react-icons/fi";
import LocationItem from "../../globals/components/layout/LocationItem";
import FullSpinner from "../../globals/components/spinners/FullSpinner";
import { LargeParagraph } from "../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../globals/components/typography/titles";
import { WAREHOUSE_STATUS } from "../libs/helpers";
import AutomationLevelDetail from "./detail/AutomationLevelDetail";
// import CargoBayDetails from "./detail/CargoBayDetails";
import StorekeepersList from "./detail/StorekeepersList";
import WarehouseFeaturesList from "./detail/WarehouseFeaturesList";
import WarehouseNoteDetail from "./detail/WarehouseNoteDetail";
import WarehouseToolsDetail from "./detail/WarehouseToolsDetail";
import WarehouseWindowsDetail from "./detail/WarehouseWindowsDetail";

export default function WarehouseDetail({ warehouse }) {
  if(!warehouse) return <FullSpinner />

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-2 px-8">
      <div className="col-span-1 sticky top-0 bg-base-100 z-10 pb-2 bg-opacity-95 bg-da">
        <div className="mt-4">
          <SmallTitle>Stato del magazzino</SmallTitle>
          <div className="mt-2">
            <LargeParagraph styles={`flex items-center ${warehouse.status === 'ACTIVE' ? 'text-success-100 dark:text-success-300' : 'text-danger-200 dark:text-danger-300'}`}>
              {warehouse.status === 'ACTIVE' 
                ? <FiCheck className="mr-1" />
                : <FiX className="mr-1" />
              }
              <span>{WAREHOUSE_STATUS[warehouse.status].toUpperCase()}</span>
            </LargeParagraph>
          </div>
        </div>

        <div className="mt-4">
          <SmallTitle>Indirizzo struttura</SmallTitle>
          <div className="mt-2">
            <LocationItem location={warehouse.location} />
          </div>
        </div>

        <div className="mt-8">
          <WarehouseFeaturesList
            type={warehouse.type}
            specialization={warehouse.specialization}
            scope={warehouse.scope}
          />
        </div>

        {/* <div className="mt-8">
          <CargoBayDetails
            maxLength={warehouse.maxLength}
            enabledVehicles={warehouse.enabledVehicles}
          />
        </div> */}

        { warehouse?.windows && warehouse?.windows?.length > 0 && (
          <div className="mt-4">
            <WarehouseWindowsDetail windows={warehouse.windows} />
          </div>
        )}

        <div className="mt-8">
          <AutomationLevelDetail automationLevel={warehouse.automationLevel} />
        </div>

        <div className="mt-8">
          <WarehouseToolsDetail tools={warehouse.tools} />
        </div>

        <div className="mt-8">
          <WarehouseNoteDetail content={warehouse.note} />
        </div>

        <div className="mt-8">
          <StorekeepersList storekeeperIds={warehouse.contactIds} />
        </div>
      </div>
    </div>
  )
}