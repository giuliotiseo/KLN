import React from 'react'
import FormBoundNumber from '../../../globals/components/dataEntry/FormBoundNumber'
import { COMPLEX_VEHICLE_LIMIT } from '../../../vehicles/libs/helpers'

function PreOrderSlotInput({
  slot,
  vehicleType,
  updateForm
}) {
  return (
    <div className='flex-1'>
      <h3 className='title-4'>Basi a terra</h3>
      <p className="label whitespace-normal">Comunica lo spazio che occuperai sul veicolo in basi <b>80x120</b></p>
      <div className="flex items-center">
        <FormBoundNumber
          error="Quantità basi non consentita"
          min={1}
          max={parseInt(COMPLEX_VEHICLE_LIMIT[vehicleType])}
          onChange={val => updateForm({ name: "slot", value: val })}
          inputValue={slot}
        />
        <div>
          <button
            className={`w-36 ml-1 whitespace-nowrap p-2 border border-light-50 hover:border-secondary-300 dark:hover:border-secondary-300 dark:border-dark-100 rounded-md cursor-pointer ${slot === COMPLEX_VEHICLE_LIMIT[vehicleType]  ? 'bg-primary-200 dark:bg-primary-200 text-light-100 dark:text-light-100 border-primary-100 dark:border-primary-300' : 'bg-light-200 text-dark-50 dark:bg-dark-200 dark:text-light-100'}`}
            onClick={() => updateForm({ name: "slot", value: COMPLEX_VEHICLE_LIMIT[vehicleType] })}
          >
            {slot === COMPLEX_VEHICLE_LIMIT[vehicleType]  ? 'Pieno carico' : 'Carico completo' }
          </button>
        </div>
      </div>
      <div>
        { vehicleType !== 'NONE' 
          ? <p>Hai scelto <b>{vehicleType.toLowerCase()}</b> come mezzo per il tuo trasporto. Scegli un numero di basi 80x120 compreso tra 1 e {COMPLEX_VEHICLE_LIMIT[vehicleType]}.</p>
          : <p>Non hai indicato un mezzo per questo pre-ordine. Scegli un numero di basi 80x120 compreso tra 1 e {COMPLEX_VEHICLE_LIMIT[vehicleType]}.</p>
        }               
      </div>

    </div>
  )
}

export default PreOrderSlotInput
