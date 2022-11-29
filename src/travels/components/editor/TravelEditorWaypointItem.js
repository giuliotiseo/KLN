import { useDispatch, useSelector } from "react-redux";
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { TinyTitle } from "../../../globals/components/typography/titles";
import { removeDuplicates } from "../../../globals/libs/helpers";
import { removeTravelEditorOperationThunk } from "../../api/travels-thunks";
import { OPERATION_DESCRIPTION } from "../../libs/helpers";
import { addEmptyWaypointToTravelEditor, changeTravelEditorSelectedWaypoint, selectIsSelectedWaypointId, selectSelectedWaypointId, selectTravelEditorOrderById } from "../../slices/travelEditorSlice";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import { FiPlusCircle, FiX } from "react-icons/fi";

// Sub components ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function WaypointItemButton ({ order }) {
  const { operationValue } = useSelector((store) => selectTravelEditorOrderById(store, order.orderId));
  const dispatch = useDispatch();

  return (
    <li className="text-sm inline-flex items-center chip-neutral">
      <span className={`inline-block mx-1 w-[10px] h-[10px] rounded-full ${operationValue ? 'bg-emerald-500 border-emerald-500' : 'border-2 border-amber-500'}`}></span>
      {order?.orderStamp || order?.stamp}
      <button
        className="hover:text-primary-200 dark:hover:text-primary-300"
        onClick={() => dispatch(removeTravelEditorOperationThunk({ order: {
          ...order, indexOp: order.indexOp || order.operationValue 
        }}))}
      >
        <FiX className="ml-1"/>
      </button>
    </li>
  )
}

function WaypointSelectorButton({
  waypointId,
  selectedWaypointId,
  toggleClick
}) {
  return (
    waypointId === selectedWaypointId 
    ? <button className={`text-xl text-primary-100 dark:text-primary-300`} onClick={() => toggleClick(waypointId)}><BsPinAngleFill /></button>
    : <button className={`text-xl text-primary-100 dark:text-primary-300`} onClick={() => toggleClick(waypointId)}><BsPinAngle /></button>
  )
}


// Main component ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function TravelEditorWaypointItem({
  title,
  address,
  orders,
  index,
  waypoints,
  waypointId,
  selectedWaypointId
}) {
  const operations = removeDuplicates(orders.map(order => order.operation));

  const ordersByOperation = operations.reduce((acc, val) => ({
    ...acc,
    [val]: orders.filter(order => order.operation === val)
  }), {});

  const dispatch = useDispatch();
  return (
    <li className={`flex flex-col flex-1 h-full
      ${
        selectedWaypointId 
        ? selectedWaypointId === waypointId
          ? "opacity-100" 
          : "opacity-30 pointer-events-none"
        : "opacity-100"
      }
    `}>
      <div className={`bg-base-100 rounded-md py-2 px-4`}>
        <div className="top flex-1 relative">
          <header className="flex flex-1 justify-between">
            <TinyTitle>{ title }</TinyTitle>
            <WaypointSelectorButton
              selectedWaypointId={selectedWaypointId}
              waypointId={waypointId}
              toggleClick={(id) => dispatch(changeTravelEditorSelectedWaypoint(id))}
            />
          </header>
          <SmallParagraph>{address}</SmallParagraph>
          { operations?.length > 0 && operations.map(op => (
              <div key={op} className="mt-2 border-t border-light-50 dark:border-light-100 py-2">
                <SmallParagraph styles="uppercase font-bold text-secondary-200 dark:text-secondary-300">{OPERATION_DESCRIPTION[op]}</SmallParagraph>
                <ul className="mt-1">
                  { ordersByOperation[op].map((order, index) => {
                    return <WaypointItemButton
                      key={order.orderId + index}
                      order={order}
                    />
                  })}
                </ul>
              </div>
          ))}
        </div>
      </div>
      
      <div className="my-2 text-center flex items-center juystify-center">
        <button
          onClick={() => dispatch(addEmptyWaypointToTravelEditor({ index,  waypoints }))}
          className={`
            inline-block mx-auto text-3xl text-gray-500 
            ${ selectedWaypointId && (selectedWaypointId === waypointId)
              ? 'pointer-events-none opacity-30'
              : 'hover:text-primary-200 dark:hover:text-primary-300'
            }      
          `}
        >
          <FiPlusCircle />
        </button>
      </div>
    </li>
  )
}