import { useState } from 'react'
import Button from '../../../globals/components/buttons_v2/Button'
import Select from '../../../globals/components/dataEntry_v2/Select'
import Dialog, { DialogContent } from '../../../globals/components/layout/Dialog'
import { COMPLEX_VEHICLE_TYPE_DESCRIPTION } from '../../../globals/libs/constants'
import { ShipmentType, TRANSPORT_TYPE_DESCRIPTION } from '../../../globals/libs/models'
import { ComplexVehicleType, COMPLEX_VEHICLE_LONG_DESCRIPTION } from '../../../vehicles/libs/helpers'

const PRE_ORDER_TYPE_REQUEST_DESCRIPTIONS = {
  ...COMPLEX_VEHICLE_TYPE_DESCRIPTION,
  NONE: "Quantitativo pallet a terra"
}

function PreOrderSubjectCompiler({
  vehicleType,
  shipmentType,
  updateForm
}) {
  const [ cargoDetails, setCargoDetails ] = useState(false);

  return (
    <>
      <div className='flex flex-col md:flex-row gap-2'>
        <div className="flex-1 w-full">
          <h4 className="title-4">Oggetto della richiesta</h4>
          <Select
            id="vehicleType"
            name="vehicleType"
            label="Scegli il tipo di richiesta"
            value={vehicleType}
            callback={updateForm}
            className="w-full"
            selectClassName="w-full"
            labelClassName="mt-2"
          >
            <option key={"NONE"} value={"NONE"}>
              Quantitativo pallet a terra
            </option>
            { Object.keys(ComplexVehicleType).map(cv_type => (
              <option key={cv_type} value={cv_type}>
                {COMPLEX_VEHICLE_TYPE_DESCRIPTION[cv_type]}
              </option>
            ))}
          </Select>

          <Button
            text="Leggi dettaglio"
            onClick={() => setCargoDetails(prev => !prev)}
            className="btn-ghost"
          />
        </div>

        <div className="flex-1 w-full">
          <h4 className="title-4">Tipologia spedizione</h4>
          <Select
            id="shipmentType"
            name="shipmentType"
            label="Scegli il tipo di trasporto"
            value={shipmentType}
            callback={updateForm}
            className="w-full"
            selectClassName="w-full"
            labelClassName="mt-2"
          >
            { Object.keys(ShipmentType).map(tra_type => (
              <option key={tra_type} value={tra_type}>
                {TRANSPORT_TYPE_DESCRIPTION[tra_type]}
              </option>
            ))}
          </Select>
        </div>
      </div>
      
      <Dialog open={cargoDetails} close={() => setCargoDetails(false)}>
        <DialogContent
          title={"Dettaglio tipologia carico"}
          topMessageClassName="mt-4"
        >
          <div className="text-center my-6">
            <h2 className='title-2 text-center'>{PRE_ORDER_TYPE_REQUEST_DESCRIPTIONS[vehicleType]}</h2>
            <p className="text-lg text-center mt-4 px-6">
              {COMPLEX_VEHICLE_LONG_DESCRIPTION[vehicleType]}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PreOrderSubjectCompiler
