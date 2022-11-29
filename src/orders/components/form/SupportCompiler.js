import InputBoundNumber from '../../../globals/components/dataEntry_v2/InputBoundNumber';
import Select from '../../../globals/components/dataEntry_v2/Select';
import { STANDARD_DIMENSIONS, TRANSPORT_SUPPORTS } from '../../libs/constants';

function SupportCompiler({
  order,
  updateForm,
  updateQuantity,
  updateSize
}) {
  const { size, support, quantity } = order;
  return (
    <>
      <h4 className='title-5 mb-4 uppercase text-gray-500 dark:text-gray-600 border-b'>Definizione dei supporti</h4> 
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-5 md:col-span-2 w-full">
          <Select
            id="support"
            name="support"
            label="Scegli il supporto di carico"
            value={support}
            callback={updateForm}
            className="w-full"
            selectClassName="w-full"
            labelClassName="mt-2"
          >
            { Object.keys(TRANSPORT_SUPPORTS).map(sup => ( 
              <option key={sup} value={sup}>
                {TRANSPORT_SUPPORTS[sup]}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-span-4 md:col-span-2 w-full">
          <Select
            id="size"
            name="size"
            label="Seleziona base di riferimento"
            value={size}
            callback={({ value }) => updateSize(value)}
            className="w-full"
            selectClassName="w-full"
            labelClassName="mt-2"
          >
            {  Object.keys(STANDARD_DIMENSIONS[support]).map((stnd_dim, index) => ( 
              <option key={stnd_dim} value={index}>
                {STANDARD_DIMENSIONS[support][stnd_dim].text}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-span-1">
          <InputBoundNumber
            label="Quantità"
            error={null}
            min={0}
            max={999}
            showZero={true}
            onChange={updateQuantity}
            inputValue={quantity}
            styles="w-full"
            inputClassName="w-full flex-1"
          />
        </div>
      </div> 
    </>
  )
}

export default SupportCompiler
