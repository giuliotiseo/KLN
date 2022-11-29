import React from 'react'
import CardDetails from '../../../globals/components/dataDisplay/CardDetails'
import ItalyAreasForRegions from '../../../globals/components/dataDisplay/ItalyAreasForRegions'
import { COMPLEX_VEHICLE_TYPE_DESCRIPTION } from '../../../globals/libs/constants'
import { formatDate } from '../../../globals/libs/helpers'

const PreOrderDatesDetails = ({
  preOrder
}) => {
  return (
    <CardDetails
      header={<h4 className="title-3">Dettagli incarico</h4>}
      footer={null}
      clear={false}
    >
      <div className='flex'>
        <div>
          <p className='text-lg mb-4'>Ritiro previsto tra il {formatDate(new Date(preOrder.pickupDateStart))} e il {formatDate(new Date(preOrder.pickupDateEnd))}</p>
          <p><span className='text-gray-400 dark:text-gray-500'>Oggetto: </span>
          { preOrder.shipmentType === "GROUPAGE"
            ? ` ${preOrder.slot} basi a terra 80x120`
            : ` ${COMPLEX_VEHICLE_TYPE_DESCRIPTION[preOrder.vehicleType]}`}

          </p>
          <p><span className='text-gray-400 dark:text-gray-500'>Regione ritiro: </span>{preOrder.checkpoint.location.region}</p>
          { preOrder?.trades?.length > 0 && <p><span className='text-gray-400 dark:text-gray-500'>Caratteristiche merce: </span><b>{
              preOrder.trades.map(trade => trade.toLowerCase()).join(', ')}</b>
          </p> }
      
          { preOrder.shipmentType === "DIRETTO" && (
            <div>
              { preOrder?.deliveryAreas?.length > 0 && (
                <p>
                  <span className='text-gray-400 dark:text-gray-500'>Prospetto zone di consegna: </span>{ preOrder.deliveryAreas.join(', ') }
                </p>
              )}

            </div>
          )}
      
          { preOrder.shipmentType === "DIRETTO" && (
            <div>
              { preOrder?.deliveryRegions?.length > 0 && (
                <p>
                  <span className='text-gray-400 dark:text-gray-500'>Prospetto regioni di consegna: </span>{ preOrder.deliveryRegions.join(', ') }
                </p>
              )}

            </div>
          )}

          <p className='alert-info text-sm px-2 inline-block mt-4'>{ preOrder?.perishable ? 'Contiene merce deperibile' : 'Non contiene merce deperibile'}</p>
        </div>

        { preOrder?.deliveryRegions?.length >  0 && (
          <div className="hidden md:block self-center ml-8">
            <div className="mr-4 inline-block" style={{ width: 150 }}>
              <ItalyAreasForRegions selectedRegions={preOrder.deliveryRegions} />
            </div>
          </div>
        )}
      </div>

   </CardDetails>
  )
}

export default PreOrderDatesDetails
