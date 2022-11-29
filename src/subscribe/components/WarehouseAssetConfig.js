import React from 'react'
import CheckboxGroup from '../../globals/components/dataEntry_v2/CheckboxGroup'
import { WAREHOUSE_TOOLS } from '../../warehouses/libs/helpers'

const WarehouseAssetConfig = ({
  tools,
  changeTools,
}) => {
  return (
    <div className='my-4'>
      <h3 className="title-3">Richieste ai trasportatori</h3>
      <CheckboxGroup
        label="Seleziona i mezzi operativi necessari per effettuare le operazioni di carico / scarico"
        optionsType="object"
        options={WAREHOUSE_TOOLS}
        values={tools}
        onChange={changeTools}
        className="mt-1"
        optionClassName="text-lg"
        controlled={true}
      />
    </div>
  )
}

export default WarehouseAssetConfig
