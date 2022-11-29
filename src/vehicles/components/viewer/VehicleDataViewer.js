import React from 'react'
import { FiPauseCircle, FiPlayCircle, FiStopCircle } from 'react-icons/fi'
import { VscGitCommit } from 'react-icons/vsc'
import LocationItem from '../../../globals/components/layout/LocationItem'
import LogsDispayList from '../../../globals/components/layout/LogsDispayList'
import VehicleDimensions from '../detail/VehicleDimensions'
import VehicleNoteDetail from '../detail/VehicleNoteDetail'
import VehicleFeaturesList from '../item/VehicleFeaturesList'
import VehicleSpot from '../item/VehicleSpot'
import SafeCol from '../../../globals/components/layout/SafeCol'
import { formatDate } from '../../../globals/libs/helpers'
import { VehicleType, VEHICLE_STATUS_DESCRIPTION, VEHICLE_TYPE_DESCRIPTION } from '../../libs/helpers'

const colors = {
  "DISPONIBILE":  "text-success-100 dark:text-success-300",
  "NON_DISPONIBILE": "text-danger-200 dark:text-danger-300",
  "IN_MARCIA": "text-amber-400 dark:text-amber-200",
}

function VehicleDataViewer({
  vehicle
}) {
  return (
    <SafeCol id="VehicleDataViewer">
      <div className="grid grid-cols-1 gap-x-4 gap-y-2 px-4">
        <div className="col-span-1 top-0 z-10 pb-2">
          <section className="mt-4 bg-base-100 rounded-md p-4">
            <h2 className="title-2">{VEHICLE_TYPE_DESCRIPTION[vehicle.type]}</h2>
            <p className='text-xl text-secondary-200 dark:text-secondary-300'>{vehicle.brand} {vehicle.model} - targato <b className='text-wider'>{vehicle.licensePlate}</b></p>

            <div className="mt-4">
              <h4 className={`title-4 flex items-center ${colors[vehicle.status]}`}>
                { vehicle.status === 'DISPONIBILE' && <FiPlayCircle className="mr-1" />}
                { vehicle.status === 'NON_DISPONIBILE' && <FiStopCircle className="mr-1" />}
                { vehicle.status === 'IN_MARCIA' && <FiPauseCircle className="mr-1" />}
                <span>{VEHICLE_STATUS_DESCRIPTION[vehicle.status]}</span>
              </h4>
            </div>
          </section>

          { vehicle?.lastPosition?.address && <section className="mt-4  bg-base-100 rounded-md p-4">
            <h3 className='title-3'>Tracking mezzo</h3>
            <div className="mt-2">
              <LocationItem location={vehicle.lastPosition} />
              { vehicle.updatedAt && <p className="text-sm flex items-center mt-4">Ultima modifica registrata: {formatDate(new Date(vehicle.updatedAt), "PPpp")}</p> }
            </div>
          </section> }

          { vehicle.spot && <section className="mt-4 bg-base-100 rounded-md p-4">
            <h3 className="title-3 mb-2">Posti disponibili</h3>
            <VehicleSpot spot={vehicle.spot} />
          </section> }

          <section className="mt-4 bg-base-100 rounded-md p-4">
            <VehicleFeaturesList {...vehicle} />
          </section>

          { vehicle.dimensions && <section className="mt-4 bg-base-100 rounded-md p-4">
            <VehicleDimensions dimensions={vehicle.dimensions} trailType={vehicle.type === VehicleType.MOTRICE ? 'cassone' : 'rimorchio'} />
          </section> }

          <section className="mt-4 bg-base-100 rounded-md p-4">
            <VehicleNoteDetail content={vehicle.note} />
          </section>

          <section className="mt-4 w-full bg-base-100 rounded-md p-4">
            <div className="flex w-full flex-1">
              <VscGitCommit className="text-3xl" />
              <LogsDispayList
                JSONLogs={vehicle.log}
                title="Attività recenti"
                className="w-full"
              />
            </div>
          </section>
        </div>
      </div>
    </SafeCol>
  )
}

export default VehicleDataViewer
