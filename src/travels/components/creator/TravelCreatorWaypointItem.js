import { useDispatch, useSelector } from "react-redux";
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { TinyTitle } from "../../../globals/components/typography/titles";
import { removeDuplicates } from "../../../globals/libs/helpers";
import { OPERATION_DESCRIPTION } from "../../libs/helpers";
import { selectTravelCreatorForesightById, selectTravelCreatorOrderById } from "../../slices/travelCreatorSlice";
import { FiX } from "react-icons/fi";
import { removeTravelCreatorOperationThunk } from "../../api/travels-thunks";

function WaypointItemStatus ({ order }) {
  const { indexOp } = useSelector((store) => selectTravelCreatorOrderById(store, order.orderId));
  const dispatch = useDispatch();

  console.log('wpitemstatus', { order })

  return (
    <li className="text-sm inline-flex gap-1 chip-neutral">
      <span className={`mt-1 inline-block mx-1 w-[10px] h-[10px] rounded-full ${indexOp ? 'bg-emerald-500 border-emerald-500' : 'border-2 border-amber-500'}`}></span>
      <div className="flex flex-col">
        <p>{order.stamp}</p>
        <p>{order.quantity} basi</p>
      </div>
      <button
        className="hover:text-primary-200 dark:hover:text-primary-300"
        onClick={() => dispatch(removeTravelCreatorOperationThunk({ order: { ...order, indexOp }}))}
      >
        <FiX className="ml-1"/>
      </button>
    </li>
  )
}

const TravelCreatorWaypointItem = ({ id, title, address = "", orders = [] }) => {
  const foresight = useSelector((store) => selectTravelCreatorForesightById(store, id));
  const operations = removeDuplicates(orders.map(order => order.operation));
  const ordersByOperation = operations.reduce((acc, val) => ({
    ...acc,
    [val]: orders.filter(order => order.operation === val)
  }), {});

  return (
    <li className="flex flex-col flex-1 bg-base-100 rounded-md my-4 py-2 px-4 h-full">
      <div className="top flex-1 relative">
        <TinyTitle>
          { title }
        </TinyTitle>
        <SmallParagraph>{address}</SmallParagraph>
        { operations?.length > 0 && operations.map(op => (
          <div key={op} className="mt-2 border-t border-light-50 dark:border-light-100 py-2">
            <SmallParagraph styles="uppercase font-bold text-secondary-200 dark:text-secondary-300">{OPERATION_DESCRIPTION[op]}</SmallParagraph>
            <ul className="mt-1">
              { ordersByOperation[op].map((order, index) => (
                <WaypointItemStatus key={order.id + index} order={order} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      { foresight &&(
        <aside className="p-2 opacity-50">
          { foresight?.time && <SmallParagraph>Tempo di percorrenza: {foresight.time.text}</SmallParagraph>}
          { foresight?.distance && <SmallParagraph>Distanza percorsa: {foresight.distance.text}</SmallParagraph>}
        </aside>
      )}
    </li>
  )
}

export default TravelCreatorWaypointItem;