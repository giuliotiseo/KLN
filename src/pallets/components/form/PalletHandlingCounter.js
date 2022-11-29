import {
  ImArrowDown2,
  ImArrowUp2,
} from "react-icons/im";
import { FaEquals } from "react-icons/fa";
import { globalStatusColorsText } from "../../../globals/libs/helpers";


// Sub components ------------------------------------------------------------------------------------------------------------------------------
const CounterResponse = ({
  text,
  icon,
  status
}) => {
  return (
    <p className={`inline-flex items-center ${globalStatusColorsText[status]}`}>
      <span className="mr-2">{ icon && icon }</span>
      <span className="font-bold">{text}</span>
    </p>
  )
}

// Main component ------------------------------------------------------------------------------------------------------------------------------
export default function PalletHandlingCounter({
  show,
  loads,
  unloads,
  reversal,
  palletHandlingType,
  className
}) {
  if(!show) return null;
  const loadingValue = loads?.COMPLIANT?.value || 0;
  const unloadingValue = unloads?.COMPLIANT?.value || 0;
  const reversalValue = reversal?.length > 0
    ? reversal.reduce((acc, val) => acc + val.value, 0)
    : 0;
  
  let result = (unloadingValue - loadingValue) - Math.abs(reversalValue);
  if(palletHandlingType === "REVERSAL") result *= -1;

  return (
    <div className={className}>
      { result === 0
        ? <CounterResponse text={`${reversalValue ? 'Azzeramento debito con storno' : 'Scambio alla pari'}`} icon={<FaEquals />} status="PARI" />
        : result > 0
          ? <CounterResponse
              text={`Credito di ${result} PLT`}
              icon={<ImArrowUp2 />}
              status="CREDIT"
            /> 
          : <CounterResponse
              text={`Debito di ${Math.abs(result)} PLT`}
              icon={<ImArrowDown2 />}
              status="DEBT"
            />  
      }
    </div>
  )
}