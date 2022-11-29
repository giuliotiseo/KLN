import React from 'react'
import InputText from '../../../globals/components/dataEntry_v2/InputText'
import Select from '../../../globals/components/dataEntry_v2/Select'
import TextEditor from '../../../globals/components/dataEntry_v2/TextEditor'
import SafeCol from '../../../globals/components/layout/SafeCol'
import InputBoundNumber from '../../../globals/components/dataEntry_v2/InputBoundNumber'
import LocationItem from '../../../globals/components/layout/LocationItem'
import VehiclePlacesFinder from './VehiclePlacesFinder'
import { BULKHEAD_DESCRIPTION, VEHICLES_FUELS, VehicleType, VEHICLE_STATUS_DESCRIPTION, VEHICLE_TYPE_DESCRIPTION } from '../../libs/helpers'

function VehicleDetailsFields({
  vehicle,
  validationError,
  updateForm,
  updateLocation,
}) {
  const { dimensions, tailLift } = vehicle;

  return (
    <SafeCol id="VehicleDetailsFields">
      <div className='m-4'>       

        <section className="mb-4">
          <h3 className="title-3 mb-4">Configurazione veicolo</h3>
          <div className="grid grid-cols-4 gap-2">
            {/* Status & Last position */}
            <div className="col-span-4 bg-base-100 z-10 p-4 rounded-md border-b-2 border-light-100 dark:border-dark-100">
              <h3 className='title-4 mb-2'>Aggiorna stato attuale</h3>
              <Select
                id="status"
                label="Stato veicolo"
                value={vehicle.status}
                selectClassName="input block w-full"
                className='mb-4'
                callback={updateForm}
              >
                { Object.keys(VEHICLE_STATUS_DESCRIPTION).map(status => ( 
                  <option key={status} value={status}>
                    {VEHICLE_STATUS_DESCRIPTION[status]}
                  </option>
                ))}
              </Select>
              
              { vehicle?.lastPosition?.place_id
                ? <div className="input bg-base-100 p-2 rounded-md">
                    <p className="text-base">Indirizzo selezionato: </p>
                    <LocationItem
                      location={vehicle.lastPosition}
                      clearLocation={() => updateForm({ name: "lastPosition", value: null })}
                    />
                  </div>
                : <VehiclePlacesFinder
                    updateLocation={updateLocation}  
                  />
              }
            </div>

            {/* Type */}
            <div className="col-span-4 lg:col-span-3 bg-base-100 p-4 rounded-md">
              <Select
                id="type"
                label="Tipo veicolo"
                value={vehicle.type}
                selectClassName="input block w-full"
                callback={updateForm}
              >
                { Object.keys(VEHICLE_TYPE_DESCRIPTION).map(type => ( 
                  <option key={type} value={type}>
                    {VEHICLE_TYPE_DESCRIPTION[type]}
                  </option>
                ))}
              </Select>
            </div>

            {/* License plate */}
            <div className="col-span-4 lg:col-span-1 bg-base-100 p-4 rounded-md flex flex-col items-center justify-center">
              <InputText
                id="licensePlate"
                label="Targa veicolo"
                className="flex-col w-full mb-2"
                contentClassName="w-full text-lg"
                inputClassName='input'
                labelClassName="block"
                value={vehicle.licensePlate}
                forceUpperCase={true}
                callback={updateForm}
                disabled={false}
                isError={validationError.includes("licensePlate")}
              />
            </div>

            {/* Brand */}
            <div className="col-span-4 lg:col-span-2 bg-base-100 p-4 rounded-md">
              <InputText
                id="brand"
                label="Marca veicolo"
                className="flex-col w-full mb-2"
                contentClassName="w-full text-lg"
                inputClassName='input'
                labelClassName="block"
                value={vehicle.brand}
                forceUpperCase={true}
                callback={updateForm}
                disabled={false}
                isError={validationError.includes("brand")}
              />
            </div>

            {/* Model */}
            <div className="col-span-4 lg:col-span-2 bg-base-100 p-4 rounded-md">
              <InputText
                id="model"
                label="Modello veicolo"
                className="flex-col w-full mb-2"
                contentClassName="w-full text-lg"
                inputClassName='input'
                labelClassName="block"
                value={vehicle.model}
                forceUpperCase={true}
                callback={updateForm}
                disabled={false}
                isError={validationError.includes("model")}
              />
            </div>

            {/* Fuel */}
            <div className="col-span-4 lg:col-span-2 bg-base-100 p-4 rounded-md">
              <Select
                id="fuel"
                label="Carburante"
                value={vehicle.fuel}
                selectClassName="input block w-full"
                callback={updateForm}
              >
                { Object.keys(VEHICLES_FUELS).map(v_fuel => ( 
                  <option key={v_fuel} value={v_fuel}>
                    {VEHICLES_FUELS[v_fuel]}
                  </option>
                ))}
              </Select>
            </div>
            
            {/* Kilometers */}
            <div className="col-span-4 lg:col-span-2 bg-base-100 p-4 rounded-md">
              <InputText
                id="kilometers"
                label="Contachilometri (km)"
                className="flex-col w-full mb-2"
                contentClassName="w-full text-lg"
                inputClassName='input'
                labelClassName="block"
                value={vehicle.kilometers}
                forceUpperCase={true}
                callback={updateForm}
                disabled={false}
              />
            </div>
          </div>
        </section>

        { vehicle.type !== VehicleType.TRATTORE && ( 
          <div className="grid grid-cols-4 gap-4">
            {/* Axle */}
            <div className="flex items-center col-span-4 bg-base-100 p-4 rounded-md">
              <InputBoundNumber
                error="Numero assi non consentito"
                min={2}
                max={9}
                onChange={value => updateForm({ name: "axle", value })}
                inputValue={vehicle.axle}
                label="N. assi"
                className="mr-4 flex-1"
                inputClassName="w-full"
              />

              <InputBoundNumber
                label="Peso massimo (t)"
                error="Peso massimo non consentito"
                min={0.1}
                max={32}
                onChange={value => updateForm({ name: "maxWeight", value })}
                inputValue={vehicle.maxWeight}
                className="mr-4 flex-1"
                inputClassName="w-full"
              />

              <InputBoundNumber
                label="Posti disponibili (80x12)"
                error="Valore non consentito"
                min={1}
                max={33}
                onChange={value => updateForm({ name: "spot", value })}
                inputValue={vehicle.spot}
                className="flex-1"
                inputClassName="w-full"
              />
            </div>

            <div className="flex items-center col-span-4 bg-base-100 p-4 rounded-md">
              <InputBoundNumber
                error="Larghezza non consentita"
                min={1}
                max={2.55}
                onChange={value => updateForm({ name: "dimensions", value: { ...vehicle.dimensions, x: value }})}
                inputValue={dimensions.x}
                label="Larghezza (m)"
                className="mr-4 flex-1"
                inputClassName="w-full"
              />

              <InputBoundNumber
                error="Altezza non consentita"
                min={1}
                max={4}
                onChange={value => updateForm({ name: "dimensions", value: { ...vehicle.dimensions, z: value }})}
                inputValue={dimensions.z}
                label="Altezza (m)"
                className="mr-4 flex-1"
                inputClassName="w-full"
              />

              <InputBoundNumber
                error="Lunghezza non consentita"
                min={1}
                max={16.50}
                onChange={value => updateForm({ name: "dimensions", value: { ...vehicle.dimensions, y: value }})}
                inputValue={dimensions.y}
                label="Lunghezza (m)"
                className="flex-1"
                inputClassName="w-full"
              />
            </div>

          </div> 
        )}
        
        <div className="flex gap-4 bg-base-100 p-4 rounded-md">
          <div className='flex-1'>
            <TextEditor
              content={vehicle.note}
              onSaveTextEditor={(content) => updateForm({ name: "note", value: content })} 
              label="Note e appunti"
              actionButtonPosition="INTERNAL"
              showList={true}
            />
          </div>
          <div className='flex-1'>
            <div className="w-full mb-4">
              <p className="label">Sponda idraulica</p>
              <button
                className={`w-full whitespace-nowrap p-2 border border-light-50 hover:border-secondary-300 dark:hover:border-secondary-300 dark:border-dark-100 rounded-md cursor-pointer ${tailLift ? 'bg-primary-200 dark:bg-primary-200 text-light-100 dark:text-light-100 border-primary-100 dark:border-primary-300' : 'bg-light-200 text-dark-50 dark:bg-dark-200 dark:text-light-100'}`}
                onClick={() => updateForm({ name: "tailLift", value: vehicle?.tailLift ? 0 : 1 })}
              >
                {tailLift ? 'Installata' : 'Non installata' }
              </button>
            </div>
              
            <div className="w-full">
              <Select
                id="bulkhead"
                label="Paratia"
                value={vehicle.bulkhead}
                selectClassName="input block w-full"
                callback={updateForm}
              >
                { Object.keys(BULKHEAD_DESCRIPTION).map(bulk_type => (
                  <option key={bulk_type} value={bulk_type}>{BULKHEAD_DESCRIPTION[bulk_type]}</option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
  </SafeCol>
  )
}

export default VehicleDetailsFields
