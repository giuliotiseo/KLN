import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom";
import { Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs"
import { SmallTitle, TinyTitle } from "../../../globals/components/typography/titles"
import OrderListItemConfirmationModal from "../item/OrderListItemConfirmationModal";
// Store
import { resetDynamicOrdersSelection, selectDynamicStatus, selectOrdersFromDynamicList, selectPreOrderFromDynamicList } from "../../slices/ordersSlice"
import { searchOrdersByPreOrderThunk } from "../../../app/thunks/ordersThunks";
import { addDays } from "date-fns";
// Helpers
import { formatDate } from "../../../globals/libs/helpers"
// Icons
import { FiX } from "react-icons/fi"
import { CgArrowLongRightC, CgArrowLongDownC } from "react-icons/cg";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";


// Sub components ---------------------------------------------------------------------------------------------------------------------------------------------------------
const RowOrderItemContent = ({ order }) => {
  return (
    <div className="flex relative">
      <div className="pr-4">
        <p className="tracking-wide font-bold">
          { order.senderName }
        </p>
        <SmallParagraph>
          { order?.pickupCheckpoint?.location.address}
        </SmallParagraph>
        <SmallParagraph>
          { formatDate(new Date(order?.pickupDateStart), "PPp")} - { formatDate(new Date(order?.pickupDateEnd), "PPp")}
        </SmallParagraph>
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
            <SmallParagraph>
              { order?.depotCheckpoint?.location.address}
            </SmallParagraph>
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
        <SmallParagraph>
          { order?.deliveryCheckpoint?.location.address}
        </SmallParagraph>
        <SmallParagraph>
          { formatDate(new Date(order?.deliveryDateStart), "PPp")} - { formatDate(new Date(order?.deliveryDateEnd), "PPp")}
        </SmallParagraph>
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
        <SmallParagraph>
          { order?.pickupCheckpoint?.location.address}
        </SmallParagraph>
        <SmallParagraph>
          { formatDate(new Date(order?.pickupDateStart), "PPp")} - { formatDate(new Date(order?.pickupDateEnd), "PPp")}
        </SmallParagraph>
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
            <SmallParagraph>
              { order?.depotCheckpoint?.location.address}
            </SmallParagraph>
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
        <SmallParagraph>
          { order?.deliveryCheckpoint?.location.address}
        </SmallParagraph>
        <SmallParagraph>
          { formatDate(new Date(order?.deliveryDateStart), "PPp")} - { formatDate(new Date(order?.deliveryDateEnd), "PPp")}
        </SmallParagraph>
      </div>
    </div>
  )
}

// Main component ---------------------------------------------------------------------------------------------------------------------------------------------------------
export function LinkedOrderItem({
  order,
  styles,
  queryFrom,
  enableDelete,
  visualization = "row"
}) {
  const [ modal, setModal ] = useState(false);

  const isRemovableOrder = (queryFrom === "sender" && enableDelete)
    ? new Date() < addDays(new Date(order.createdAt), 14) 
      ? true
      : false
    : false;

  return <div className={`relative ${styles}`}>
      <TinyTitle styles="block py-2 border-b border-light-50 dark:border-dark-100">{order.name} - {order.shipmentType}</TinyTitle>
      <SmallParagraph styles="block pt-1"><span className="opacity-60">Oggetto:</span> {order.quantity} {order.support} {order.size}</SmallParagraph>
      <SmallParagraph styles="block pb-2"><span className="opacity-60">Trasportato da:</span> {order.carrierName}</SmallParagraph>
      
      { visualization === "column"
        ? <ColumnOrderItemContent order={order} />
        : <RowOrderItemContent order={order} />
      }

      { isRemovableOrder && (
        <button onClick={() => setModal("delete")} className="absolute text-xl text-danger-200 dark:text-danger-300 opacity-100 hover:opacity-100 right-4 top-2 border-2 border-danger-200 dark:border-danger-300 hover:bg-danger-200 dark:hover:bg-danger-300 hover:text-light-300 dark:hover:text-dark-50 h-6 w-6 flex items-center justify-center rounded-full">
          <FiX className="w-8 fill-current" />
        </button>
      )}
 
      <OrderListItemConfirmationModal
        order={order}
        operation={modal}
        modal={modal}
        setModal={setModal}
        queryFrom={queryFrom}
      />
    </div>
}

export default function LinkedOrders({ order, enableDelete, itemStyles }) {
  const linkedOrders = useSelector((store) => selectOrdersFromDynamicList(store));
  const status = useSelector(selectDynamicStatus);
  const preOrder = useSelector(selectPreOrderFromDynamicList);
  const location = useLocation();
  const queryFrom = new URLSearchParams(location.search).get("from");
  const dispatch = useDispatch();

  const getOrders = useCallback(async (preOrderId) => {
    await dispatch(searchOrdersByPreOrderThunk(preOrderId))
  }, [dispatch]);

  useEffect(() => {
    if(order.preOrderId) {
      getOrders(order.preOrderId);
    }else {
      dispatch(resetDynamicOrdersSelection())
    }
  }, [order?.preOrderId, getOrders]);

  return (
    <div className="relative">
      { preOrder?.stamp && <SmallTitle styles="flex items-center mb-4">
        Ordini registrati in { preOrder?.stamp }
      </SmallTitle> }

      { status === "loading" && <InlineSpinner color="#158084" loading={status === "loading"} /> }

      { status !== "loading"  && ( 
        linkedOrders?.length > 0 
          ? linkedOrders.map((order, index) => (
                <div key={order.id} className={`relative ${index > 0 && 'mt-2'}`}>
                  <LinkedOrderItem
                    key={order.id}
                    order={order}
                    styles={itemStyles}
                    queryFrom={queryFrom}
                    enableDelete={enableDelete}
                  />
                </div>
              ))
          : <Paragraph styles="italic">Nessun ordine registrato per questo carico</Paragraph>
        )
      }
    </div>
  )
}