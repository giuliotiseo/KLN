import { useState } from "react";
import { addDays } from "date-fns";
// Helpers
import { formatDate } from "../../../globals/libs/helpers"
// Components
import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import { FiX } from "react-icons/fi"
import { CgArrowLongRightC, CgArrowLongDownC } from "react-icons/cg";
import Button from "../../../globals/components/buttons_v2/Button";
import { TbMap2, TbMapOff } from "react-icons/tb";

// Sub components ---------------------------------------------------------------------------------------------------------------------------------------------------------
const RowOrderItemContent = ({ order }) => {
  return (
    <div className="flex relative">
      <div className="pr-4">
        <p className="tracking-wide font-bold">
          { order.senderName }
        </p>
        <p className="text-xs md:text-sm">
          { order?.pickupCheckpoint?.location.address}
        </p>
        <p className="text-xs md:text-sm">
          { formatDate(new Date(order?.pickupDateStart), "PPp")} - { formatDate(new Date(order?.pickupDateEnd), "PPp")}
        </p>
      </div>

      { order?.depotCheckpoint && (
        <>
          <div className="flex flex-col items-center justify-center mx-6">
            <CgArrowLongRightC className="text-2xl text-secondary-100 dark:text-secondary-300" />
          </div>
          <div>
            <p className="tracking-wide font-bold">
              { order.carrierName }
            </p>
            <p className="text-xs md:text-sm">
              { order?.depotCheckpoint?.location.address}
            </p>
          </div>
        </>
      )}

      <div className="flex flex-col items-center justify-center mx-6">
        <CgArrowLongRightC className="text-2xl text-secondary-100 dark:text-secondary-300" />
      </div>
      <div>
        <p className="tracking-wide font-bold">
          { order.receiverName }
        </p>
        <p className="text-xs md:text-sm">
          { order?.deliveryCheckpoint?.location.address}
        </p>
        <p className="text-xs md:text-sm">
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
          { order.senderName }
        </p>
        <p className="text-xs md:text-sm">
          { order?.pickupCheckpoint?.location.address}
        </p>

        { order?.senderId !== order?.pickupStorageId && (
          <div className="text-xs md:text-sm">
            <p>Punto gestito da: <span className="font-bold text-wide text-secondary-200 dark:text-secondary-300">{order.pickupStorageName}</span></p>
          </div>
        )}

        <p className="text-xs md:text-sm">
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
            <p className="text-xs md:text-sm">
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
          { order.receiverName }
        </p>
        <p className="text-xs md:text-sm">
          { order?.deliveryCheckpoint?.location.address}
        </p>
        { order?.receiverId !== order?.deliveryStorageId && (
          <div className="text-xs md:text-sm">
            <p>Punto gestito da: <span className="font-bold text-wide text-secondary-200 dark:text-secondary-300">{order.pickupStorageName}</span></p>
          </div>
        )}
        <p className="text-xs md:text-sm">
          { formatDate(new Date(order?.deliveryDateStart), "PPp")} - { formatDate(new Date(order?.deliveryDateEnd), "PPp")}
        </p>
      </div>
    </div>
  )
}

// Main component ---------------------------------------------------------------------------------------------------------------------------------------------------------
export function LinkedOrderItem({
  order,
  className,
  queryFrom,
  enableDelete,
  visualization = "row"
}) {
  const [ modal, setModal ] = useState(false);
  const [ orderTravelPath, setOrderTravelPath ] = useState(false);

  const isRemovableOrder = (queryFrom === "sender" && enableDelete)
    ? new Date() < addDays(new Date(order.createdAt), 14) 
      ? true
      : false
    : false;

  return <div className={`relative ${className}`}>
      <h4 className="block py-2 border-b border-light-50 dark:border-dark-100 font-bold">{order.name} - {order.shipmentType}</h4>
      <p className="block pt-1 text-xs md:text-sm "><span className="text-gray-400 dark:text-gray-500">Oggetto:</span> {order.quantity} {order.support} {order.size}</p>
      <p className="block pb-2 text-xs md:text-sm "><span className="text-gray-400 dark:text-gray-500">Trasportato da:</span> {order.carrierName}</p>
      
      { visualization === "column" && (
        <Button
          text={orderTravelPath ? 'Nascondi percorso' : 'Visualizza percorso'}
          icon={orderTravelPath ? <TbMapOff /> : <TbMap2 />}
          className="btn-primary-outline  text-sm mt-2 mb-4"
          onClick={() => setOrderTravelPath(prev => !prev)}
        />
      )}

      { visualization === "column"
        ? orderTravelPath && <ColumnOrderItemContent order={order} />
        : <RowOrderItemContent order={order} />
      }

      { isRemovableOrder && (
        <button onClick={() => setModal("delete")} className="absolute text-xl text-red-500 dark:text-red-400 opacity-100 hover:opacity-100 right-4 top-2 border-2 border-danger-200 dark:border-danger-300 hover:bg-danger-200 dark:hover:bg-danger-300 hover:text-light-300 dark:hover:text-dark-50 h-6 w-6 flex items-center justify-center rounded-full">
          <FiX className="w-8 fill-current" />
        </button>
      )}
    </div>
}

export default function LinkedOrdersByPreOrder({
  linkedOrders,
  preOrder,
  enableDelete,
  companyType,
  itemClassName = "",
  visualization = "row"
}) {
  return (
    <CardDetails
      className="bg-transparent"
      contentClassName="p-0 my-2"
      header={<h4 className="title-3">Altri ordini registrati in { preOrder?.stamp }</h4>}
      footer={null}
      clear={false}
    >
      { linkedOrders?.length > 0 
        ? linkedOrders.map((order, index) => (
              <div key={order.id} className={`relative ${index > 0 && 'mt-2'}`}>
                <LinkedOrderItem
                  key={order.id}
                  order={order}
                  className={itemClassName}
                  queryFrom={companyType}
                  enableDelete={enableDelete}
                  visualization={visualization}
                />
              </div>
            ))
        : <p className="italic mx-4">Non sono presenti altri ordini per questo carico</p>
      }
    </CardDetails>
  )
}