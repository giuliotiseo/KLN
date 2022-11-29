import React from 'react'
import { Link } from 'react-router-dom'
import { SHIPMENT_METHOD_DESCRIPTION } from '../../libs/constants'

const PreOrderListItemHeader = ({
  preOrder
}) => {
  return (
    <header>
      <p className="text-xs uppercase text-gray-400 dark:text-gray-500">Pre-ordine - {SHIPMENT_METHOD_DESCRIPTION[preOrder.shipmentType]}</p>
      <h3 className='inline-flex items-center text-lg md:text-xl uppercase'>
        <Link to={`/pre-orders/view?id=${preOrder.id}`} className="mr-2 flex-1 hover:text-primary-200 dark:text-primary-300 transition-colors">
          <span>COD. { preOrder.stamp.split("-")[1] }</span>
        </Link>
      </h3>
    </header>
  )
}

export default PreOrderListItemHeader
