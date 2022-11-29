import { CgArrowLongDownC } from "react-icons/cg";
import { MdGpsFixed } from "react-icons/md";
import { useSelector } from "react-redux";
import Scrollbar from "../../../globals/components/layout/Scrollbar";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { formatDate } from "../../../globals/libs/helpers";
import { orderStatusColorsBorders } from "../../../orders/libs/helpers";
import { selectTravelCreatorIndexOp, selectTravelCreatorOrdersIds } from "../../slices/travelCreatorSlice";

function isDisabledButton(index, indexOp) {
  let result = false;

  if(!indexOp && !index) result = false;
  if(!indexOp && index) result = true;
  if(indexOp === 0 && index === 0) result = true;
  if(indexOp === 0 && index === 1) result = false;
  if(indexOp === 1) result = true;
  return result;
}

const isPickupDone = (status, currentIndexOp) => {
  let result = [0, 0]; // [carico, scarico]

  if(status === "PENDING") {
    if(currentIndexOp !== null && currentIndexOp === 0) {
      result = [1, 0];
    } else if(currentIndexOp !== null && currentIndexOp === 1) {
      result = [1, 1];
    }
  }
  
  if(status === "STOCKED") {
    result = [1, 1];
  }

  return result;
}

const isDepotDone = (status, currentIndexOp) => {
  let result = [0, 0]; // [carico, scarico]

  if(status === "PENDING") {
    if(currentIndexOp === 1) {
      result = [1, 0];
    }
  }

  if(status === "STOCKED") {
    if(currentIndexOp !== null && currentIndexOp === 0) {
      result = [1, 0];
    } else if(currentIndexOp !== null && currentIndexOp === 1) {
      result = [1, 1];
    }
  }
  return result;
}

function OrderPickupForTravelTable({
  order,
  currentIndexOp,
}) {
  const [ pickupLoad, pickupUnload ] = isPickupDone(order.status, currentIndexOp)
  return (
    <div className={`pr-4
      ${(pickupLoad === 1 && pickupUnload === 0) && 'text-secondary-200 dark:text-secondary-300' }
      ${(pickupLoad === 1 && pickupUnload === 1) && 'line-through opacity-40' }
    `}>
      <div className="flex items-center">
        { (pickupLoad === 1 && pickupUnload === 0) && <MdGpsFixed className="mr-2" /> }
        <p className="flex items-center tracking-wide font-bold">
          { order.senderName }
        </p>
      </div>

      <SmallParagraph>
        { order?.pickupCheckpoint?.location.address}
      </SmallParagraph>
      <SmallParagraph>
        { formatDate(new Date(order?.pickupDateStart), "PPp")} - { formatDate(new Date(order?.pickupDateEnd), "PPp")}
      </SmallParagraph>
    </div>
  )
}

function OrderDepotForTravelTable({
  order,
  currentIndexOp,
}) {
  const [ pickupLoad, pickupUnload ] = isPickupDone(order.status, currentIndexOp)
  const [ depotLoad, depotUnload ] = isDepotDone(order.status, currentIndexOp)

  return (
    <div className={`pr-4
      ${(pickupLoad === 1 && pickupUnload === 0) && 'text-secondary-200 dark:text-secondary-300' }
      ${(pickupLoad === 1 && pickupUnload === 1) && 'line-through opacity-40' }
    `}>
      { order?.depotCheckpoint && (
        <>
          <div className={`
            ${(pickupUnload === 1 && depotLoad === 1 && depotUnload === 0) && 'text-secondary-200 dark:text-secondary-300' }
            ${(depotLoad === 1 && depotUnload === 1) && 'line-through opacity-40' }
          `}>
            <div className="flex items-center">
              {(pickupUnload === 1 && depotLoad === 1 && depotUnload === 0) && <MdGpsFixed className="mr-1" /> }
              <p className="tracking-wide font-bold">
                { order.carrierName }
              </p>
            </div>

            <SmallParagraph>
              { order?.depotCheckpoint?.location.address}
            </SmallParagraph>
          </div>
        </>
      )}
    </div>
  )
}


function OrderDeliveryForTravelTable({
  order,
  currentIndexOp,
}) {
  const [ pickupLoad, pickupUnload ] = isPickupDone(order.status, currentIndexOp)
  const [ depotLoad, depotUnload ] = isDepotDone(order.status, currentIndexOp)

  return (
    <div className={`
      ${depotUnload === 1 && 'text-secondary-200 dark:text-secondary-300' }
    `}>
      <div className="flex items-start">
        {depotUnload === 1 && 'text-secondary-200 dark:text-secondary-300' && <MdGpsFixed className="mr-1" />}
        <p className="tracking-wide font-bold">
          { order.receiverName }
        </p>
      </div>
      <SmallParagraph>
        { order?.deliveryCheckpoint?.location.address}
      </SmallParagraph>
      <SmallParagraph>
        { formatDate(new Date(order?.deliveryDateStart), "PPp")} - { formatDate(new Date(order?.deliveryDateEnd), "PPp")}
      </SmallParagraph>
    </div>
  )
}

function OrderRowForTravelTable ({
  order,
  selectedOrdersIds,
  onClick,
  addOrder,
  removeOrder,
}) {
  const currentIndexOp = useSelector(store => selectTravelCreatorIndexOp(store, order.id));

  return (
    <tr className={`border-l-4 ${orderStatusColorsBorders[order.status]} bg-base-100 mb-2 rounded-md`}>
      <td className="min-w-[150px]">
        { order.stamp}
      </td>
      <td className="min-w-[150px]">
        <OrderPickupForTravelTable
          order={order}
          currentIndexOp={currentIndexOp}
        />
      </td>
      <td className="min-w-[150px]">
        <OrderDepotForTravelTable
          order={order}
          currentIndexOp={currentIndexOp}
        />
      </td>
      <td className="min-w-[150px]">
        <OrderDeliveryForTravelTable
          order={order}
          currentIndexOp={currentIndexOp}
        />
      </td>
      <td className="min-w-[150px]">3</td>
      <td className="min-w-[150px]">4</td>
    </tr>
  )
}

export default function OrdersTableForTravel({
  ids,
  entities,
  isLoading,
  onClick,
  addOrder,
  removeOrder,
}) {
  const selectedOrdersIds = useSelector(selectTravelCreatorOrdersIds);

  if(isLoading) return <InlineSpinner />
  if(!ids || ids?.length <= 0) return <SmallParagraph>Nessun ordine trovato</SmallParagraph>

  const orders = ids.map(id => entities[id]);

  const tableHeadings = [
    "Codice ordine",
    "Mittente",
    "Vettore",
    "Destinatario",
    "Basi a terra",
    "Tipologia trasporto"
  ];

  return (
    <table className="table-fixed">
      <Scrollbar>
      <thead className="w-full">
        <tr>
          { tableHeadings.map(th => (
            <th key={th}>{th}</th>
          ))}
        </tr>
      </thead>

        <tbody>
          { orders.map(order => (
            <OrderRowForTravelTable
              key={order.id}
              order={order}
              selectedOrdersIds={selectedOrdersIds}
              onClick={onClick}
              addOrder={addOrder}
              removeOrder={removeOrder}
            />
          ))}
        </tbody>
      </Scrollbar>
    </table>
  )
}