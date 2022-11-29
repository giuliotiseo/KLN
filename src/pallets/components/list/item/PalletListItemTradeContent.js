import PalletListItemValidation from "./PalletListItemValidation";
import PalletListLoadUnloadDetails from "./PalletListLoadUnloadDetails";
import { renderPalletResult } from "../../../libs/helpers";
import CopyOnClipboard from "../../../../globals/components/buttons_v2/CopyOnClipboard";

const resultResponse = {
  customer: {
    major: 'over',
    minor: 'under',
    equal: 'equal'
  }, 
  carrier: {
    major: 'under',
    minor: 'over',
    equal: 'equal'
  }
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------
const PalletListItemTradeContent = ({ pallet, queryFrom }) => {
  const totalReversal = pallet?.reversal?.length > 0 ? pallet?.reversal.reduce((acc, val) => acc + val.reversalQuantity, 0) : 0;
  const result = (pallet.unloadQuantity - pallet.loadQuantity) - totalReversal;
  
  let response = null;
  if(result < 0) response = resultResponse[queryFrom].minor;
  if(result > 0) response = resultResponse[queryFrom].major;
  if(result === 0) response = resultResponse[queryFrom].equal;

  return (
    <div className="mt-2">
      <div className="absolute right-2 bottom-2 chip-neutral">
        <PalletListItemValidation
          customerValidation={pallet.customerValidation}
          carrierValidation={pallet.carrierValidation}
          carrierValidatorName={pallet.carrierValidatorName}
          operationDate={pallet.operationDate}
        />
      </div>

      <div className="my-2 text-sm">
        <p>Vettore: {pallet.carrierName}</p>
        <p>Cliente: {pallet.customerName}</p>
      </div>

      <div className="text-sm text-gray-400 dark:text-gray-500 hover:text-dark-50 dark:hover:text-light-300 transition-colors">
        <CopyOnClipboard tipMessage='' tipSuccess='Copiato' hideInternalDataTip={true} inputData={pallet.stamp.split('-')[1]} />
      </div>

      <PalletListLoadUnloadDetails
        loadQuantity={pallet.loadQuantity}
        unloadQuantity={pallet.unloadQuantity}
       />
      
      <div className={`mt-4 flex items-center font-bold text-lg ${renderPalletResult[response].className}`}>
        { renderPalletResult[response].icon() }
        { renderPalletResult[response].text(result, totalReversal) }
      </div>
    </div>
  )
}

export default PalletListItemTradeContent;