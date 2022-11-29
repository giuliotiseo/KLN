import { TinyTitle } from "../../../globals/components/typography/titles"
import ActionButton from "../../../globals/components/buttons/ActionButton"
import { FiRotateCcw } from "react-icons/fi";
import { OPERATION_DESCRIPTION, waypointTargetByStatusShipment } from "../../libs/helpers"
import { capitalize, globalStatusColorsBorder } from "../../../globals/libs/helpers"
import OrderItemContentForTravel from "../form/OrderItemContentForTravel";

function isDisabledButton(index, indexOp) {
  let result = false;
  if(!indexOp && !index) result = false;
  if(!indexOp && index) result = true;
  if(indexOp === 0 && index === 0) result = true;
  if(indexOp === 0 && index === 1) result = false;
  if(indexOp === 1) result = true;
  return result;
}

// Main component ------------------------------------------------------------------------------------------------------------------------------------------
export default function OrderListItemForTravelEditor({ 
  item,
  onClick,
  addOrder,
  removeOrder,
}) {
  const currentIndexOp = item.operationValue;
  return (
    <li className={`border-l-4 ${globalStatusColorsBorder[item.status]} bg-base-100 mb-2 rounded-md flex p-4 flex-col md:flex-row items-start`}>
      <div className="ml-2 w-full">
        {/* Heading section */}
        <section>
          <header className="flex justify-between pb-2 border-b border-light-50 dark:border-dark-100">
            <button className="block w-full text-left" onClick={() => onClick(item)}>
              <TinyTitle styles="block py-2">
                {item.name} - {item.shipmentType}
              </TinyTitle>
            </button>
            <div className="flex items-center">
              { waypointTargetByStatusShipment?.[`${item.status}#${item.shipmentType}`] 
                ? waypointTargetByStatusShipment[`${item.status}#${item.shipmentType}`].operation.map((op, index) => (
                  <ActionButton
                    key={`${index}:${item.id}`}
                    text={capitalize(OPERATION_DESCRIPTION[op])}
                    styles={`btn-primary text-sm whitespace-nowrap ${index === 0 ? 'mr-1' : 'ml-1'}`}
                    disabled={isDisabledButton(index, currentIndexOp)}
                    onClick={() => addOrder({...item, indexOp: index })}
                  />
                ))
                : null 
              }

              {(currentIndexOp === 0 || currentIndexOp === 1) && removeOrder && (
                <div className="text-center items-center">
                  <button
                    onClick={() => removeOrder({ ...item, indexOp: currentIndexOp })}
                    className="text-lg ml-4 mr-2 text-primary-200 dark:text-primary-300 hover:text-primary-300 dark:hover:text-primary-200"
                  >
                    <FiRotateCcw className="inline-block" />
                  </button>
                </div>
              )}
            </div>
          </header>
        </section>

        {/* Content section */}
        <section className="my-2">
          <OrderItemContentForTravel
            order={item}
            currentIndexOp={currentIndexOp}
          />
        </section>
        
        {/* Footer section */}
        {/* <section className="text-center border-t border-light-50 dark:border-dark-100">
          <p className="pt-2"><b>{item.quantity} {item.support}</b> {item.size}</p>
        </section> */}
       </div>
     </li>
   )
}