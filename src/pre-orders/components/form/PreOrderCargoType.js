import InputCheckbox from '../../../globals/components/dataEntry_v2/InputCheckbox'
import TradeSelector from './TradeSelector'

function PreOrderCargoType({
  trades,
  perishable,
  updateTrades,
  updateForm
}) {
  return (
    <>
      <h3 className='title-4'>Tipologia carico</h3>
      <TradeSelector
        label="Seleziona una o più opzioni"
        selectedTrades={trades}
        setSelectedTrades={updateTrades}
      />

      <div className='flex gap-2'>
        <InputCheckbox
          id={'perishable'}
          name={'perishable'}
          label={`Contiene merce deperibile`}
          value={perishable}
          initialValues={[]}
          checked={perishable}
          callback={updateForm}
          labelClassName="mt-2"
        />
      </div>
    </>
  )
}

export default PreOrderCargoType
