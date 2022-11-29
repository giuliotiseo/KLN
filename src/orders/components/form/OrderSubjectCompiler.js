import Select from '../../../globals/components/dataEntry_v2/Select'
import { ShipmentType, TRANSPORT_TYPE_DESCRIPTION } from '../../../globals/libs/models'

function OrderSubjectCompiler({
  shipmentType,
  updateForm
}) {
  return (
    <>
      <div className='flex flex-col md:flex-row gap-2'>
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
    </>
  )
}

export default OrderSubjectCompiler
