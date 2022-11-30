import React from 'react'
import InputBoundNumber from '../../../globals/components/dataEntry_v2/InputBoundNumber'

const WarehouseCargoBay = ({
  cargoBay,
  changeCargoBay
}) => {
  return (
    <div>
      <InputBoundNumber
        label="Numero baie di carico"
        error="Valore non ammesso"
        inputValue={cargoBay}
        showZero={true}
        onChange={changeCargoBay}
        min={0}
        max={99}
      />
    </div>
  )
}

export default WarehouseCargoBay
