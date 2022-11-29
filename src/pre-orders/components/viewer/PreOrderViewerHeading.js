import React from 'react'
import { GrStatusGoodSmall } from 'react-icons/gr'
import { globalStatusColorsText } from '../../../globals/libs/helpers'
import { PREORDER_STATUS_DESCRIPTION, SHIPMENT_METHOD_DESCRIPTION } from '../../libs/constants'

const PreOrderViewerHeading = ({ preOrder }) => {
  return (
    <header className="mt-2">
      <p className="text-lg uppercase text-gray-400 dark:text-gray-500">{SHIPMENT_METHOD_DESCRIPTION[preOrder.shipmentType]}</p>
      <h1 className="title-2">{preOrder.name}</h1>
      <div className='mt-2'>
        <GrStatusGoodSmall className={`inline-block mr-1 ${globalStatusColorsText[preOrder.status]}`} />
        <p className="inline-block">{ PREORDER_STATUS_DESCRIPTION[preOrder.status]}</p>
      </div>
    </header>
  )
}

export default PreOrderViewerHeading
