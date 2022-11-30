import { FiCheck, FiX } from 'react-icons/fi'
import SafeCol from '../../../globals/components/layout/SafeCol'
import LocationItem from '../../../globals/components/layout/LocationItem'
import AutomationLevelDetail from '../detail/AutomationLevelDetail'
import CargoBayDetails from '../detail/CargoBayDetails'
import StorekeepersList from '../detail/StorekeepersList'
import WarehouseFeaturesList from '../detail/WarehouseFeaturesList'
import WarehouseNoteDetail from '../detail/WarehouseNoteDetail'
import WarehouseToolsDetail from '../detail/WarehouseToolsDetail'
import WarehouseWindowsDetail from '../detail/WarehouseWindowsDetail'
import { WAREHOUSE_STATUS } from '../../libs/helpers'
import { formatWindowsToDynamoDb } from '../../../globals/libs/helpers'

const ThirdPartyWarehouseSummary = ({
  warehouse
}) => {
  return (
    <>
      <div className="mt-2 bg-base-100 p-4 rounded-md">
        <h3 className='title-4'>Stato del magazzino</h3>
        <div className="mt-2">
          <p className={`flex items-center ${warehouse.status === 'ACTIVE' ? 'text-success-100 dark:text-success-300' : 'text-danger-200 dark:text-danger-300'}`}>
            {warehouse.status === 'ACTIVE' 
              ? <FiCheck className="mr-1" />
              : <FiX className="mr-1" />
            }
            <span>{WAREHOUSE_STATUS[warehouse.status].toUpperCase()}</span>
          </p>
        </div>
      </div>

      <div className="mt-2 bg-base-100 p-4 rounded-md">
        <h3 className='title-4'>Indirizzo struttura</h3>
        <div className="mt-2">
          <LocationItem location={warehouse.location} />
        </div>
      </div>

      <div className="mt-2 bg-base-100 p-4 rounded-md">
        <WarehouseFeaturesList
          type={warehouse.type}
          specialization={warehouse.specialization}
          scope={warehouse.scope}
        />
      </div>

      <div className="mt-2 bg-base-100 p-4 rounded-md">
        <CargoBayDetails warehouse={warehouse} />
      </div>

      { warehouse?.windows && warehouse?.windows?.length > 0 && (
        <div className="mt-2 bg-base-100 p-4 rounded-md">
          <WarehouseWindowsDetail windows={formatWindowsToDynamoDb(warehouse.windows)} />
        </div>
      )}

      <div className="mt-2 bg-base-100 p-4 rounded-md">
        <AutomationLevelDetail automationLevel={warehouse.automationLevel} />
      </div>

      <div className="mt-2 bg-base-100 p-4 rounded-md">
        <WarehouseToolsDetail tools={warehouse.tools} />
      </div>

      <div className="mt-2 bg-base-100 p-4 rounded-md">
        <WarehouseNoteDetail content={warehouse.note} />
      </div>
        
      <div className="mt-2 bg-base-100 p-4 rounded-md">
        <StorekeepersList
          contacts={warehouse.contacts || []}
        />
      </div>

    </>
  )
}

export default ThirdPartyWarehouseSummary
