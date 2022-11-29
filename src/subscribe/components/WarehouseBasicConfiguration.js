import React from 'react'
import InputText from '../../globals/components/dataEntry_v2/InputText'
import Select from '../../globals/components/dataEntry_v2/Select'
import { WAREHOUSE_BUILDING_TYPE, WAREHOUSE_SPECIALIZATION } from '../../warehouses/libs/helpers'
import CompanyLocationFields from './CompanyLocationFields'

const WarehouseBasicConfiguration = ({
  name,
  location,
  type,
  specialization,
  updateForm,
  updateFormLocation,
}) => {
  return (
    <>
      <h2 className='title-3 mb-2'>Configurazione di base</h2>
      <InputText
        id="name"
        label="Attribuisci un nome al deposito *"
        className="flex-col w-full mb-2"
        contentClassName="w-full text-lg"
        inputClassName='input'
        labelClassName="block"
        value={name}
        forceUpperCase={false}
        callback={updateForm}
        disabled={false}
      />

      <CompanyLocationFields
        updateFormLocation={updateFormLocation}
        location={location}
        address={location?.address || ""}
      />

      <Select
        id="type"
        label="Tipo di deposito"
        value={type}
        className="my-4"
        selectClassName="input block w-full"
        callback={updateForm}
      >
        { Object.keys(WAREHOUSE_BUILDING_TYPE).map(w_building => ( 
          <option key={w_building} value={w_building}>
            {WAREHOUSE_BUILDING_TYPE[w_building]}
          </option>
        ))}
      </Select>

      <Select
        id="specialization"
        label="Specializzazione"
        value={specialization}
        className="my-4"
        selectClassName="input block w-full"
        callback={updateForm}
      >
        { Object.keys(WAREHOUSE_SPECIALIZATION).map(w_spec => ( 
          <option key={w_spec} value={w_spec}>
            {WAREHOUSE_SPECIALIZATION[w_spec]}
          </option>
        ))}
      </Select>
    </>
  )
}

export default WarehouseBasicConfiguration
