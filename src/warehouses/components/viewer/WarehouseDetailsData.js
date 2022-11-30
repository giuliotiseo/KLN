import LocationItem from '../../../globals/components/layout/LocationItem'
import WarehouseFeaturesList from '../detail/WarehouseFeaturesList'
import CargoBayDetails from '../detail/CargoBayDetails'
import WarehouseWindowsDetail from '../detail/WarehouseWindowsDetail'
import AutomationLevelDetail from '../detail/AutomationLevelDetail'
import WarehouseToolsDetail from '../detail/WarehouseToolsDetail'
import WarehouseNoteDetail from '../detail/WarehouseNoteDetail'
import StorekeepersList from '../detail/StorekeepersList'
import SafeCol from '../../../globals/components/layout/SafeCol'
import { WAREHOUSE_STATUS } from '../../libs/helpers'
import { FiCheck, FiMapPin, FiX } from 'react-icons/fi'
import { formatWindowsToDynamoDb } from '../../../globals/libs/helpers'
import CheckpointContacts from '../../../customers/components/checkpoint/summary/CheckpointContacts'
import WindowCheckpointDetails from '../../../customers/components/checkpoint/summary/WindowCheckpointDetails'
import { TbLink, TbMapPin } from 'react-icons/tb'
import { Link } from 'react-router-dom'


function WarehouseDetailsData({
  warehouse
}) {
  return (
    <SafeCol>
      <div className="mx-4 mb-2">
        <h1 className='title-2 mt-4 mb-2'>{warehouse.name}</h1>
        { warehouse?.isLinked 
          ? <div className='text-lg flex items-center mb-4'>
              <TbLink
                className="text-2xl mr-2 text-secondary-200 dark:text-secondary-300"
              />
              Magazzino controllato da {warehouse.companyOwner.name}
            </div>
          : <div className='text-lg flex items-center mb-4'>
              <TbMapPin
                className="text-2xl mr-2 text-primary-200 dark:text-primary-300"
              />
              Magazzino di proprietà
            </div>
        }

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
          <h3 className="title-3">Operatività magazzino</h3>
          <WindowCheckpointDetails
            windows={warehouse.windows}
            className="mt-4"
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
          <CheckpointContacts
            checkpoint={warehouse}
            className="my-0 mx-4"
          />
        </div>
      </div>
    </SafeCol>
  )
}

export default WarehouseDetailsData
