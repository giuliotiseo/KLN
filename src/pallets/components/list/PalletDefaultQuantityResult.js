import { useSelector } from "react-redux";
import { selectCurrentCompany } from "../../../company/slices/companySlice";
import { calculatePalletResultFromTrade } from "../../libs/calculatePalletResult";
import { renderPalletResult } from "../../libs/helpers";


export default function PalletDefaultQuantityResult({
  show,
  items,
  className,
  forceAddReversal = false,
}) {
  const { id } = useSelector(selectCurrentCompany);
  if(!show || items?.length <= 0) return null;
    
  const trade = calculatePalletResultFromTrade(items, id);
  const reversal = calculatePalletResultFromTrade(items, id);
  console.log({ trade, reversal });
  const result = forceAddReversal ? (trade + reversal) : trade;

  let response = "wait";
  if(result < 0) response = "under";
  if(result > 0) response = "over";
  if(result === 0) response = "equal"; 

  // console.groupCollapsed()

  // console.groupEnd()
  return (
    <div className={className}>
      <div className={`flex items-center font-bold text-lg ${renderPalletResult[response].className}`}>
        { renderPalletResult[response].icon() }
        { renderPalletResult[response].long_text(result, reversal) }
      </div>
    </div>
  )
}