import { useEffect } from 'react';
import { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import ReactTooltip from 'react-tooltip';
import Button from '../../../globals/components/buttons_v2/Button';
import CardDetails from '../../../globals/components/dataDisplay/CardDetails';
import InputText from '../../../globals/components/dataEntry_v2/InputText';
import useLoadingMeter from '../../hooks/useLoadingMeter';
import GoodsCompiler from './GoodsCompiler';
import OrderTradeSelector from './OrderTradeSelector';
import PalletCompiler from './PalletCompiler';
import SupportCompiler from './SupportCompiler';
import WarningsPicker from './WarningsPicker';


// Sub components ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const UdcCompilerHeader = ({
  estimatedLDM,
  loadingMeterLimit
}) => {
  return (
    <div className='flex items-center justify-between w-full mr-2 text-sm'>
      <h4 className="title-3 w-full flex-1">Info unità di carico</h4>
      <span className={`
        font-bold
        ${(loadingMeterLimit !== "NO_LIMIT" && (estimatedLDM > loadingMeterLimit)) 
          ? 'text-red-500 dark:text-red-200'
          : ''
        }
      `}>
        {estimatedLDM} { loadingMeterLimit !== "NO_LIMIT" ? ` / ${loadingMeterLimit}` : '' }
        <span data-tip="Metri di carico" className='ml-1'>Lm</span>
      </span>

      <ReactTooltip />
    </div>
  )
}

const UdcCompilerForm = ({
  order,
  updateForm,
  updateQuantity,
  updateSize,
  updateTrades,
  addPalletInfo,
  removePalletInfo
}) => {
  const { orderNumber, palletInfo } = order;
  return (
    <div>
      <div className="flex">
        <div className="flex-1">
          <InputText
            id='orderNumber'
            value={orderNumber}
            label="Numero ordine"
            className="flex-col lg:flex-row mb-2"
            contentClassName="w-full"
            inputClassName='flex-1 w-full'
            labelClassName="items-center mb-2 lg:mb-0 mr-auto lg:mr-2 flex-none w-auto"
            placeholder="Numero ordine"
            callback={updateForm}
          />
        </div>
      </div>

      <section className='mt-4'>
        <SupportCompiler
          order={order}
          updateForm={updateForm}
          updateQuantity={updateQuantity}
          updateSize={updateSize}
        />
      </section>

      <section className='mt-4'>
        <GoodsCompiler
          order={order}
          updateForm={updateForm}
        />
      </section>

      <section className='mt-4'>
        <WarningsPicker
          order={order}
          updateForm={updateForm}
        />
      </section>

      <section className='mt-4'>
        <OrderTradeSelector
          order={order}
          updateTrades={updateTrades}
        />
      </section>

      <section className='mt-4'>
        <PalletCompiler
          palletInfo={palletInfo}
          updateForm={updateForm}
          addPalletInfo={addPalletInfo}
          removePalletInfo={removePalletInfo}
          showCompiler={true}
        />
      </section>

    </div>
  )
}


// Main component ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function UdcCompiler({
  order,
  estimatedLDM,
  updateQuantity,
  updateTrades,
  updateSize,
  updateForm,
  addPalletInfo,
  removePalletInfo,
}) {
  const [ warning, setWarning ] = useState(false);
  const { selectedPreOrder } = order;
  const [ loadingMeterLimit ] = useLoadingMeter(
    selectedPreOrder?.slot,
    selectedPreOrder?.slot ? [80, 120] : null
  );

  useEffect(() => {
    if(selectedPreOrder?.slot) {
      if(loadingMeterLimit < estimatedLDM) {
        setWarning(true);
      }
    }
  }, [selectedPreOrder, loadingMeterLimit, estimatedLDM])

  return (
    <CardDetails
      header={<UdcCompilerHeader estimatedLDM={estimatedLDM} loadingMeterLimit={loadingMeterLimit} />}
      className="h-full"
      footer={null}
      clear={false}
    >
      <UdcCompilerForm
        order={order}
        updateForm={updateForm}
        updateQuantity={updateQuantity}
        updateSize={updateSize}
        updateTrades={updateTrades}
        addPalletInfo={addPalletInfo}
        removePalletInfo={removePalletInfo}
      />

      { loadingMeterLimit < estimatedLDM && warning && (
        <div className='alert-warn px-2 items-center'>
          <div className="flex">
            <FiAlertTriangle className='mr-1' />
            <h5 className='title-5'>Attenzione</h5>
          </div>
          <p>Stai superando il limite di basi richieste nel pre-ordine: {order.selectedPreOrder.slot} basi 80x120 ({loadingMeterLimit}lm). Questa operazione potrà portare a difficoltà nella gestione dell'ordine, prosegui solo se sei sicuro.</p>
          <Button
            text="Ok, ho capito"
            onClick={() => setWarning(false)}
            className="btn-primary mt-2 text-sm"
          />
        </div>
      )}
    </CardDetails>
  )
}

export default UdcCompiler
