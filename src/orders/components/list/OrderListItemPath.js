import { useState } from "react";
import Button from "../../../globals/components/buttons_v2/Button";
import { CgArrowLongDownC, CgArrowLongRightC } from "react-icons/cg";
import { FiChevronRight, FiChevronUp } from "react-icons/fi";
import { addDays } from "date-fns";
import { formatDate, formatDistanceDate } from "../../../globals/libs/helpers";

// Sub components ---------------------------------------------------------------------------------------------------------------------------------------------------------
const RowOrderItemContent = ({ order }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 relative gap-4 items-center bg-base-300 px-2 py-2 rounded-md">
      <div className="col-span-1 flex items-center">
        <div className="flex-1">
          <p className="tracking-wide font-bold">
            { order.pickupStorageName }
          </p>
          <p className="text-sm">
            { order?.pickupCheckpoint?.location?.city} ({order?.pickupCheckpoint?.location?.province})
          </p>
          <p className="text-sm">
            { formatDate(new Date(order?.pickupDateStart), "PPp")} - { formatDate(new Date(order?.pickupDateEnd), "PPp")}
          </p>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center mx-6">
          <CgArrowLongRightC className="text-2xl text-secondary-100 dark:text-secondary-300" />
        </div>
      </div>

      <div className="flex md:hidden items-start">
        <CgArrowLongDownC className="text-2xl text-secondary-100 dark:text-secondary-300" />
      </div>

      <div className="col-span-1 flex items-center">
        { order?.depotCheckpoint
          ? <div className="flex-1">
              <p className="tracking-wide font-bold">
                { order.carrierName }
              </p>
              <p className="text-sm">
                { order?.depotCheckpoint?.location?.city} ({order?.depotCheckpoint?.location?.province})
              </p>
            </div>
          : <p className="italic block w-full text-center">Scarico vettore non presente</p>
        }

        <div className="hidden md:flex flex-col items-center justify-center mx-6">
          <CgArrowLongRightC className="text-2xl text-secondary-100 dark:text-secondary-300" />
        </div>
      </div>

      <div className="flex md:hidden items-start">
        <CgArrowLongDownC className="text-2xl text-secondary-100 dark:text-secondary-300" />
      </div>

      <div className="col-span-1">
        <p className="tracking-wide font-bold">
          { order.deliveryStorageName }
        </p>
        <p className="text-sm">
          { order?.deliveryCheckpoint?.location?.city} ({order?.deliveryCheckpoint?.location?.province})
        </p>
        <p className="text-sm">
          { formatDate(new Date(order?.deliveryDateStart), "PPp")} - { formatDate(new Date(order?.deliveryDateEnd), "PPp")}
        </p>
      </div>
    </div>
  )
}

const ColumnOrderItemContent = ({ order }) => {
  return (
    <div className="flex flex-col relative">
      <div className="pr-4">
        <p className="tracking-wide font-bold">
          { order.pickupStorageName }
        </p>
        <p className="text-sm">
          { order?.pickupCheckpoint?.location.address}
        </p>
        <p className="text-sm">
          { formatDate(new Date(order?.pickupDateStart), "PPp")} - { formatDate(new Date(order?.pickupDateEnd), "PPp")}
        </p>
      </div>

      { order?.depotCheckpoint && (
        <>
          <div className="flex flex-col items-start justify-center my-3">
            <CgArrowLongDownC className="text-2xl text-secondary-100 dark:text-secondary-300" />
          </div>
          <div>
            <p className="tracking-wide font-bold">
              { order.carrierName }
            </p>
            <p className="text-sm">
              { order?.depotCheckpoint?.location.address}
            </p>
          </div>
        </>
      )}

      <div className="flex flex-col items-start justify-center my-3">
        <CgArrowLongDownC className="text-2xl text-secondary-100 dark:text-secondary-300" />
      </div>
      <div>
        <p className="tracking-wide font-bold">
          { order.deliveryStorageName }
        </p>
        <p className="text-sm">
          { order?.deliveryCheckpoint?.location.address}
        </p>
        <p className="text-sm">
          { formatDate(new Date(order?.deliveryDateStart), "PPp")} - { formatDate(new Date(order?.deliveryDateEnd), "PPp")}
        </p>
      </div>
    </div>
  )
}


export function OrderListItemPath({
  order,
  className = "",
  queryFrom,
  enableDelete,
  showTitle,
  visualization = "row"
}) {
  const [ modal, setModal ] = useState(false);
  const [ path, showPath ] = useState(false);

  const isRemovableOrder = (queryFrom === "sender" && enableDelete)
    ? new Date() < addDays(new Date(order.createdAt), 14) 
      ? true
      : false
    : false;

  return <div className={`relative ${className}`}>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          { showTitle && <h4 className="title-4 block py-2 border-b border-light-50 dark:border-dark-100">{order.name} - {order.shipmentType}</h4> }
          
          <p>Inviato da: <b>{order.senderName}</b> a: <b>{order.carrierName}</b> per: <b>{order.receiverName}</b> </p>
          <p>Registrato {formatDistanceDate(new Date(order.createdAt), new Date())}</p>
          <div className="mt-2 py-2 border-t w-full text-gray-400 dark:text-gray-500">
            <p>Oggetto: <b>{order.quantity} {order.support} {order.size}</b>
            </p>
            <p>Ritiro dal: {formatDate(new Date(order.pickupDateStart))} al: {formatDate(new Date(order.pickupDateEnd))}</p>
            <p>Consegna dal: {formatDate(new Date(order.deliveryDateStart))} al: {formatDate(new Date(order.deliveryDateEnd))}</p>
          </div>

          <Button
            text={path ? `Nascondi fermate` : `Vedi fermate`}
            icon={path ? <FiChevronUp className="text-xl" /> : <FiChevronRight className="text-xl" />}
            className="btn-primary-outline text-sm mb-2"
            onClick={() => showPath(prev => !prev)}
          />
        </div>
      </div>

      { visualization === "column"
        ? path && <ColumnOrderItemContent order={order} />
        : path && <RowOrderItemContent order={order} />
      }
    </div>
}