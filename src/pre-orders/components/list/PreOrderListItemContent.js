import React from 'react'
import { formatDate } from '../../../globals/libs/helpers'
import { COMPLEX_VEHICLE_TYPE_DESCRIPTION } from '../../../vehicles/libs/helpers'
import { PREORDER_STATUS_DESCRIPTION } from '../../libs/constants'

const PreOrderListItemContent = ({ preOrder }) => {
  return (
    <div className="w-full text-sm">
      <p>Inviato da: <b>{preOrder.senderName}</b> a: <b>{preOrder.carrierName}</b></p>
      <p>{ PREORDER_STATUS_DESCRIPTION[preOrder.status]}</p>

      <div className="mt-2 py-2 border-t w-full text-gray-400 dark:text-gray-500">
        <p>Oggetto: 
        { preOrder.shipmentType === "GROUPAGE"
          ? ` ${preOrder.slot} basi a terra 80x120`
          : ` ${COMPLEX_VEHICLE_TYPE_DESCRIPTION[preOrder.vehicleType]}`}

        </p>
        <p>Ritiro dal: {formatDate(new Date(preOrder.pickupDateStart))} al: {formatDate(new Date(preOrder.pickupDateEnd))}</p>
        <p>Regione ritiro: {preOrder.checkpoint.location.region}</p>

      </div>
    </div>
  )
}

export default PreOrderListItemContent
