import React from 'react'
import InputCheckbox from '../../../globals/components/dataEntry_v2/InputCheckbox'
import InputText from '../../../globals/components/dataEntry_v2/InputText'
import SafeCol from '../../../globals/components/layout/SafeCol'
import ThirdPartyWarehouseSummary from './ThirdPartyWarehouseSummary'

function ThirdPartyWarehouseEditor({
  warehouse,
  updateForm,
}) {
  return (
    <SafeCol>
      <div className="pr-4 mb-4 ml-4">
        <h2 className="title-3 mb-2 mt-4">Personalizza punto di interesse</h2>          
        <div className='bg-base-100 rounded-md p-4'>
          <InputText
            id="name"
            label="Nome personalizzato del magazzino"
            value={warehouse.name}
            className="w-full flex-col"
            contentClassName="w-full"
            inputClassName="text-left pr-6"
            placeholder="Nome del magazzino"
            callback={updateForm}
          />

          <InputCheckbox
            id={"isLinked"}
            value={warehouse.isLinked}
            label={warehouse?.isLinked ? `Scollega il magazzino di ${warehouse.companyOwner.name}` : `Ripristina il collegamento con il magazzino di ${warehouse.companyOwner.name}`}
            name="isLinked"
            className='mt-4'
            checked={warehouse.isLinked === 1}
            callback={() => updateForm({ name: "isLinked", value: warehouse.isLinked === 1 ? 0 : 1 })}
          />
        </div>

        <ThirdPartyWarehouseSummary
          warehouse={warehouse}
        />
      </div>
    </SafeCol>
  )
}

export default ThirdPartyWarehouseEditor
