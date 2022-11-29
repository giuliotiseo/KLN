import React from 'react'
import { TbTruck, TbTruckLoading } from 'react-icons/tb'
import { formatDate } from '../../../globals/libs/helpers'

const PreOrderListItemSide = ({
  preOrder
}) => {
  return (
    <aside className='mr-2'>
      <div className="flex items-center justify-center rounded-full text-2xl w-[50px] h-[50px] bg-secondary-200 dark:bg-secondary-300 text-light-300">
        { preOrder.shipmentType === "GROUPAGE" && <TbTruckLoading />}
        { preOrder.shipmentType === "DIRETTO" && <TbTruck />}
      </div>
      <div className="mt-2 uppercase text-center flex md:flex-col items-center">
        <p className="text-lg block mr-1 ml-2 md:ml-0 md:mr-0 font-bold">
          { formatDate(new Date(preOrder.createdAt), "d")}
        </p>
        <p className="text-sm block mr-1 md:mr-0">
          { formatDate(new Date(preOrder.createdAt), "LLL")}
        </p>
        <p className="text-sm block mr-1 md:mr-0">
          { formatDate(new Date(preOrder.createdAt), "yy")}
        </p>
      </div>
    </aside>
  )
}

export default PreOrderListItemSide
