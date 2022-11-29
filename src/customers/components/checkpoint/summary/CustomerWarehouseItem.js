import React from 'react'
import { FiMapPin } from 'react-icons/fi'
import CheckpointAccessInfo from './CheckpointAssets'
import WindowCheckpointDetails from './WindowCheckpointDetails'

function CustomerWarehouseItem({ warehouse }) {
  return (
    <>
      <div className="title-3 mb-2 flex items-center">
        <FiMapPin className="text-lg mr-2" />
        <h3>Punti di interesse</h3>
      </div>
      <div className="bg-base-100 p-4 rounded-md">
        <p className='flex bg-gray-400 bg-opacity-10 text-secondary-100 items-center justify-between text-lg mb-2 p-2 rounded-lg'>
          {warehouse.name}
        </p>

        <div className='flex flex-items'>
          <span className="inline-block text-base mr-1" data-tip="Checkpoint tracciato">
            <span className={`w-[20px] h-[20px] text-center flex items-center justify-center bg-emerald-500 dark:bg-emerald-300 p-1 rounded-full`}>
              <FiMapPin className="text-light-100 dark:text-dark-100" />
            </span>
          </span>
          <p>{warehouse.location.address}</p>
        </div>


        <WindowCheckpointDetails
          windows={warehouse.windows}
          className="mt-4"
        />

        <CheckpointAccessInfo
          checkpoint={warehouse}
          className="mt-4"
        />
      </div>
    </>
  )
}

export default CustomerWarehouseItem
