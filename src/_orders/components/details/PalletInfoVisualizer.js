import { SmallTitle, TinyTitle } from "../../../globals/components/typography/titles";
// Icons
import { ImStack } from "react-icons/im";
import { SystemInterchange } from "../../../globals/libs/models";

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default ({ order, className = "", showTitle = true }) => {
  const palletInfoFormat = order.palletInfo.reduce((acc,val) => {
    return ({
      ...acc,
      [val.type]: acc?.[val.type] 
        ? [...acc[val.type], {
          size: val.size,
          value: val.value,
          system: val.system
        }]
        : [{ size: val.size, value: val.value, system: val.system }]
    })
  }, {});

  return (
    <section className={`${className}`}>
      { showTitle && <SmallTitle styles="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <ImStack className="text-lg mr-1" />
          <span>Informazioni scambio legni</span>
        </div>
      </SmallTitle> }

      { Object.keys(palletInfoFormat).map(pallet_type => (
        <div key={pallet_type} className="flex items-center mb-2">
          <TinyTitle styles="pr-2 mr-2 w-[50px]">{pallet_type}</TinyTitle>
          <ul className="pl-2 border-l border-light-50 dark:border-dark-200 min-w-[50px]">
            { palletInfoFormat[pallet_type].map((item, index) => {
              return (
              <li key={index}>{item.value} {item.size} - <b>{SystemInterchange[item.system]}</b></li>
            )})}
          </ul>
        </div>
      ))}
    </section>
  )
}