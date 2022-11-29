import PalletListItemValidation from "./PalletListItemValidation";
import { renderPalletResult } from "../../../libs/helpers";
import CopyOnClipboard from "../../../../globals/components/buttons_v2/CopyOnClipboard";

const resultResponse = {
  customer: {
    major: 'under',
    minor: 'over',
  }, 
  carrier: {
    major: 'over',
    minor: 'under',
  }
}


// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------
const PalletListItemReversalContent = ({ pallet, handlingRef, queryFrom }) => {
  let response = null;
  if(pallet?.reversalQuantity >= 0) response = resultResponse[queryFrom].major;
  if(pallet?.reversalQuantity < 0) response = resultResponse[queryFrom].minor;

  return (
    <div className="mt-2">
      {/* Content */}
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
        <CopyOnClipboard tipMessage='' tipSuccess='Copiato' hideInternalDataTip={true} inputData={handlingRef} />
      </div>

      <div className={`mt-4 flex items-center font-bold text-lg ${renderPalletResult[response]?.className || ''}`}>
        { renderPalletResult[response].icon() }
        { renderPalletResult[response].text(pallet.reversalQuantity) }
      </div>
    </div>
  )
}

export default PalletListItemReversalContent;