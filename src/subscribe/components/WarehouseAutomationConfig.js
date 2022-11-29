import React from 'react'
import RangeItemSlider from '../../globals/components/dataEntry_v2/RangeItemSlider'
import { WAREHOUSE_AUTOMATION_LEVEL } from '../../warehouses/libs/helpers'

const WarehouseAutomationConfig = ({
  automationLevel,
  changeAutomationLevel
}) => {
  return (
    <div className="my-8">
      <h3 className='title-3'>Tecnologia deposito</h3>
      <RangeItemSlider
        label="Livello di automazione"
        values={Object.keys(WAREHOUSE_AUTOMATION_LEVEL)}
        valueDescriptors={Object.keys(WAREHOUSE_AUTOMATION_LEVEL).reduce((acc, val) => ({ ...acc, [val]: WAREHOUSE_AUTOMATION_LEVEL[val].shortDesc }), {})}
        value={automationLevel}
        onChange={changeAutomationLevel}
        className="mt-4"
      />

      <p className="text-sm mt-2 px-1">
        { WAREHOUSE_AUTOMATION_LEVEL[automationLevel].longDesc }
      </p>
    </div>
  )
}

export default WarehouseAutomationConfig
