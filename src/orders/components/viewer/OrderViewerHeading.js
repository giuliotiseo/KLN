import React from 'react'
import { GrStatusGoodSmall } from 'react-icons/gr'
import { TbTruck, TbTruckLoading } from 'react-icons/tb'
import { globalStatusBackground, globalStatusColorsText } from '../../../globals/libs/helpers'
import { ORDER_STATUS_DESCRIPTION, SHIPMENT_METHOD_DESCRIPTION } from '../../libs/constants'

const OrderViewerHeading = ({ order }) => {
  return (
    <header className="mt-2">
      <div className="flex">
        <div className={`flex mt-2 mr-2 items-center justify-center rounded-full text-2xl w-[40px] h-[40px] 2xl:w-[50px] 2xl:h-[50px] text-light-300 ${globalStatusBackground[order.status]} `}>
          { order.shipmentType === "GROUPAGE" && <TbTruckLoading />}
          { order.shipmentType === "DIRETTO" && <TbTruck />}
        </div>
        <div>
          <p className="text-lg uppercase text-gray-400 dark:text-gray-500">{SHIPMENT_METHOD_DESCRIPTION[order.shipmentType]}</p>
          <h1 className="title-3 xl:title-2">{order.name}</h1>
        </div>
      </div>

      <div className='text-lg bg-base-100 p-2 rounded-md mb-2 mt-4'>
        <GrStatusGoodSmall className={`inline-block mr-1 ${globalStatusColorsText[order.status]}`} />
        <p className="inline-block">{ ORDER_STATUS_DESCRIPTION[order.status]}</p>
      </div>
    </header>
  )
}

export default OrderViewerHeading
