// Icons
import { ImStack } from "react-icons/im";
import { SystemInterchange } from "../../libs/constants";
import CardDetails from "../../../globals/components/dataDisplay/CardDetails";

const PltInfoVisualizerHeader = ({ showTitle }) => showTitle 
? (
  <div className="flex items-center">
    <ImStack className="text-lg mr-1" />
    <h3 className="title-3">Informazioni scambio legni</h3>
  </div>
)
: null;

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletInfoVisualizer ({ order, className = "", showTitle = true }) {
  let { palletInfo } = order;

  if(Array.isArray(palletInfo)) {
    palletInfo = palletInfo.reduce((acc, val) => ({
      ...acc,
      [val.type]: palletInfo.filter(pallet => pallet.type === val.type)      
    }), {})
  }
  
  return (
    <CardDetails
      header={<PltInfoVisualizerHeader showTitle={showTitle} />}
    >
      { Object.keys(palletInfo).map(pallet_type => (
        <div key={pallet_type} className="flex items-center border-b last:border-0">
          <h5 className="title-5 pr-2 mr-2 w-[50px] py-2">{pallet_type}</h5>
          <ul className="pl-2 border-l border-light-50 dark:border-dark-200 min-w-[50px] h-full">
            {palletInfo[pallet_type]?.length > 0
              ? palletInfo[pallet_type].map((item, index) => {
                return (
                <li key={index}>{item.value} {item.size} - <b>{SystemInterchange[item.system]}</b></li>
              )})
              : <p className="text-sm text-gray-400 dark:text-gray-500">Nessuna quantità pallet dichiarata per questo tipo</p>
            }
          </ul>
        </div>
      ))}
    </CardDetails>
  )
}