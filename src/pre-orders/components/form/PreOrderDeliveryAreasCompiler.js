import React from 'react'
import DeliveryAreasPicker from '../../../globals/components/dataEntry/DeliveryAreasPicker'

function PreOrderDeliveryAreasCompiler({
  deliveryAreas,
  deliveryRegions,
  updateForm
}) {
  return (
    <>
      <h3 className='title-4'>Fornisci indicazioni sulle zone di consegna</h3>
      <DeliveryAreasPicker
        areas={deliveryAreas}
        onChangeAreas={(value) => updateForm({ name: "deliveryAreas", value })}
        regions={deliveryRegions}
        onChangeRegions={(value) => updateForm({ name: "deliveryRegions", value })}
      />
    </>
  )
}

export default PreOrderDeliveryAreasCompiler
