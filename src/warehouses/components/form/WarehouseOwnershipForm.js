import React from 'react'
import { TbBuildingWarehouse } from 'react-icons/tb'
import Button from '../../../globals/components/buttons_v2/Button'

function WarehouseOwnershipForm({ 
  callback
}) {
  return (
    <div className="h-full flex flex-col">
      <div className='container text-center -translate-y-16 l-0 p-4 bg-base-100 w-5/6 mx-auto rounded-lg border border-light-50 dark:border-dark-300'>
        <div className='mx-auto text-center mb-8 max-w-[640px]'>
          <TbBuildingWarehouse className='text-6xl mb-4 mx-auto text-secondary-200 dark:text-secondary-300' />
          <h1 className="title-1">Configura il punto di interesse</h1>
          <p className="mt-2">Se desideri agganciare un magazzino o deposito gestito da terzi seleziona <b className='italic'>Magazzino di terze parti</b>, altrimenti se il punto di interesse è gestito dalla tua azienda seleziona <b className='italic'>Magazzino di proprietà</b></p>
        </div>
        
        <div className='flex items-center justify-center gap-2'>
          <Button
            className="btn-primary inline-flex"
            text='Magazzino di proprietà'
            onClick={() => callback(0)}
          />

          <Button
            className="btn-primary-outline--bold font-normal inline-flex"
            text='Magazzino di terze parti'
            onClick={() => callback(1)}
          />
        </div>
      </div>
    </div>
  )
}

export default WarehouseOwnershipForm
