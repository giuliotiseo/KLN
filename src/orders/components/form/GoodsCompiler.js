import InputCheckbox from '../../../globals/components/dataEntry_v2/InputCheckbox';
import InputNumber from '../../../globals/components/dataEntry_v2/InputNumber';

function GoodsCompiler({
  order,
  updateForm
}) {
  const { grossWeight, netWeight, temperature, packages, stackable, perishable } = order;

  return (
    <>
      <h4 className='title-5 mb-4 uppercase text-gray-500 dark:text-gray-600 border-b'>Definizione del contenuto</h4> 
      <div className="flex mt-4 max-w-full">
        <div className="mr-2 flex-1 flex-wrap">
          <InputNumber
            id="grossWeight"
            label="Peso lordo"
            className="flex-col w-full"
            contentClassName="w-full"
            labelClassName="block"
            value={grossWeight}
            callback={updateForm}
          />
        </div>

        <div className="ml-2 flex-1">
          <InputNumber
            id="netWeight"
            label="Peso netto"
            className="flex-col w-full"
            contentClassName="w-full"
            labelClassName="block"
            value={netWeight}
            callback={updateForm}
          />
        </div>

        <div className="ml-2 flex-1">
          <InputNumber
            id="temperature"
            label="Temperatura (°C)"
            className="flex-col w-full"
            contentClassName="w-full"
            labelClassName="block"
            value={temperature}
            callback={updateForm}
          />
        </div>

        <div className="ml-2 flex-1">
          <InputNumber
            id="packages"
            label="N. colli"
            className="flex-col w-full"
            contentClassName="w-full"
            labelClassName="block"
            value={packages}
            callback={updateForm}
          />
        </div>
      </div>

      <div className='mt-4'>
        <InputCheckbox
          id={"stackable"}
          name="stackable"
          value={stackable}
          label={'Unità sovrapponibile'}
          checked={stackable ? true : false}
          callback={updateForm}
        />

        <InputCheckbox
          id={"perishable"}
          name="perishable"
          value={perishable}
          label={'Contiene merce deperibile'}
          checked={perishable ? true : false}
          callback={updateForm}
        />
      </div>
    </>
  )
}

export default GoodsCompiler
