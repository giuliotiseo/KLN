import { useRef, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
// Components
import SectionWrap from "../../globals/components/layout/SectionWrap";
import SectionTop from "../../globals/components/layout/SectionTop";
import SafeArea from "../../globals/components/layout/SafeArea";
import SafeCol from "../../globals/components/layout/SafeCol";
import FullSpinner from "../../globals/components/spinners/FullSpinner";
import PickupDeliveryMap from "../components/PickupDeliveryMap";
import DocsCompiler from "../components/create/DocsCompiler";
import AttachmentsList from "../components/AttachmentsList";
import LogsDispayList from "../../globals/components/layout/LogsDispayList";
import DeliveryVisualizer from "../components/details/DeliveryVisualizer";
import UdcVisualizer from "../components/details/UdcVisualizer";
import PalletInfoVisualizer from "../components/details/PalletInfoVisualizer";
import OrderAdditionalRequestVisualizer from "../components/details/OrderAdditionalRequestVisualizer";
import InfoPaymentVisualizer from "../components/details/InfoPaymentVisualizer";
import OrderListItemConfirmationModal from "../components/item/OrderListItemConfirmationModal";
import CarrierVisualizer from "../components/details/CarrierVisualizer";
import OrderStatusVisualizer from "../components/details/OrderStatusVisualizer";
import PickupVisualizer from "../components/details/PickupVisualizer";
// Helpers
import { getPreOrderById } from "../../preOrders/api/fetch";
import { motion } from "framer-motion";
// Store
import { selectSelectedOrder } from "../slices/ordersSlice";
import { selectCompanyInfo } from "../../company/slices/companyInfoSlice";
import { selectPreOrderFromPicker, selectSelectedPreOrder } from "../../preOrders/slices/preOrdersSlice";
import { getOrderThunk } from "../../app/thunks/ordersThunks";
// Icons
import { FiDelete, FiEdit } from "react-icons/fi";

// Constants ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, y: 25 },
}

const mode_reader = {
  "sender": "modalità mittente",
  "carrier": "modalità vettore",
  "receiver": "modalità destinatario",
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function DetailsOrderContainer({ queryFrom }) {
  const [ attachments, showAttachments ] = useState(false);
  const [ modal, setModal ] = useState(false);
  // Store
  const order = useSelector(selectSelectedOrder);
  const myCompany = useSelector(selectCompanyInfo);
  // Scroller references
  const scrollableRef_left = useRef();
  const scrollableRef_right = useRef();
  const dispatch = useDispatch();
  const location = useLocation();

  /* 
    * Callbacks 
  */
  const getPreOrder = useCallback(async (preOrderId) => {
    if(preOrderId && !preOrderId.includes("standalone")) {
      const fetchPreOrder = await getPreOrderById(preOrderId);
      dispatch(selectPreOrderFromPicker({ ...fetchPreOrder }));
    }
  }, []);

  const findOrder = useCallback(async (orderId) => {
    dispatch(getOrderThunk({ id: orderId }));
  }, []);

  /* 
    * Effects 
  */
  useEffect(() => {
    const orderId = new URLSearchParams(location.search).get("id");
    findOrder(orderId)
  }, [location?.search]);

  useEffect(() => {
    if(order) {
      if(order?.preOrderId) {
        getPreOrder(order.preOrderId)
      }
    }
  }, [order]);

  /* 
    * Subscriptions 
  */
  // ...

  /* 
    * Mutation 
  */
  // CTA buttons config
  let link = myCompany.type === "TRANSPORT" && order?.tenantCarrier === myCompany.tag 
    ? {
      to: `/orders/edit?from=${queryFrom}&id=${order.id}`,
      text: "Modifica",
      icon: () => <FiEdit />,
    }
    : null;

  if(!link) {
    link = (order?.tenantSender === myCompany.tag && (order.status === "PENDING" || order.status === "PICKEDUP"))
      ? {
        to: `/orders/${myCompany.tag}/edit?from=${queryFrom}&id=${order.id}`,
        text: "Modifica",
        icon: () => <FiEdit />,
      }
      : null
  }

  const action = myCompany.type === "CLIENT" && order?.tenantSender === myCompany.tag 
     ? {
      onClick: () => setModal("delete"),
      text: "Elimina",
      icon: () => <FiDelete className="rotate-180" />,
    }
    : null;

  if(!order || Object.keys(order)?.length <= 0) return <FullSpinner />

  return (
    <SectionWrap className="bg-transparent dark:bg-transparent">
      <SectionTop
        title={`Dettagli ${order.name}`}
        // icon={() => <FiSend className="w-8 h-auto mr-4"/>}
        icon={null}
        backPath="/orders"
        filters={null}
        action={action}
        link={link}
        className="bg-base-100 rounded-t-md"
      >
        <p className="uppercase font-bold text-secondary-200 dark:text-secondary-300 mr-2 text-sm">
          {mode_reader[queryFrom]}
        </p>
      </SectionTop>

      <div className="bg-base-100 rounded-b-md shadow-md z-50">
        <div className="pr-4 py-2 text-lg font-bold">
          <OrderStatusVisualizer status={order?.status} />
        </div>
      </div>

      <SafeArea className="grid grid-cols-2 grid-rows-3">
        {/* Left */}
        <div className="relative col-span-2 row-span-2 md:row-span-3 md:col-span-1">
          <SafeCol id="order-editor-left" ref={scrollableRef_left}>
            <div className='mt-2 mr-4 mb-4'>
              <PickupVisualizer order={order} />
            </div>

            {/* Log visualizer */}
            <div className='bg-base-100 mt-2 mr-4 mb-4 py-4 rounded-md'>
              <LogsDispayList
                JSONLogs={order.log}
                title="Attività recenti"
              />
            </div>
          </SafeCol>
        </div>

        {/* Right */}
        <div className="relative col-span-2 row-span-2 md:row-span-3 md:col-span-1">
          <SafeCol id="order-editor-right" ref={scrollableRef_right}>
            <div className="relative w-full h-[250px] mb-4 mt-2 pl-1 rounded-md overflow-hidden">
              <PickupDeliveryMap
                pickup={order.pickupCheckpoint}
                depot={order?.depotCheckpoint?.name ? order.depotCheckpoint : null}
                delivery={order.deliveryCheckpoint}
              />
            </div>

            <div className="bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md">
              <CarrierVisualizer order={order} name={order.carrierName} tag={order.tenantCarrier}  />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <DeliveryVisualizer order={order} />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <UdcVisualizer order={order} />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <PalletInfoVisualizer order={order} />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <DocsCompiler
                docs={order.docs}
                updateForm={null}
                showAttachments={showAttachments}
                showCompiler={true}
              />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <OrderAdditionalRequestVisualizer
                collectChecks={order.collectChecks}
                checksAmount={order?.checksAmount}
                note={order.note}
              />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <InfoPaymentVisualizer
                customer={order.customer}
                paymentCondition={order.paymentCondition}
              />
            </div>
          </SafeCol>
        </div>

        {/* Fixed window for attachments */}
        <div className={`fixed right-6 bottom-8 ${attachments ? "pointer-events-all" : "pointer-events-none"}`}>
          <motion.div
            animate={attachments ? "open" : "closed"} 
            variants={variants}
            className={`mb-2 backdrop-blur-lg opacity-0 bg-base-100/30 w-[400px] h-[350px] shadow-xl rounded-md border border-zinc-300 ${attachments ? "pointer-events-all" : "pointer-events-none"}`}
          >
            <AttachmentsList
              docs={order.docs}
              showAttachments={showAttachments}
              indexAttachment={attachments ? attachments - 1 : null}
              remote={true}
            />
          </motion.div>
        </div>
      </SafeArea>

      {/* Modals */}
      { order?.tenantSender === myCompany.tag && (
        <OrderListItemConfirmationModal
          order={order}
          operation={modal}
          modal={modal}
          setModal={setModal}
          queryFrom={queryFrom}
        />
      )}
    </SectionWrap>
  )
}