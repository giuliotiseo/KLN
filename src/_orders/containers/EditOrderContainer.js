import { useRef, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SmallTitle } from "../../globals/components/typography/titles";
import SectionWrap from "../../globals/components/layout/SectionWrap";
import SectionTop from "../../globals/components/layout/SectionTop";
import SafeArea from "../../globals/components/layout/SafeArea";
import SafeCol from "../../globals/components/layout/SafeCol";
import FullSpinner from "../../globals/components/spinners/FullSpinner";
import PickupDeliveryMap from "../components/PickupDeliveryMap";
import DeliveryCompiler from "../components/create/DeliveryCompiler";
import UdcCompiler from "../components/create/UdcCompiler";
import PickupCompiler from "../components/create/PickupCompiler";
import PalletCompiler from "../components/create/PalletCompiler";
import DocsCompiler from "../components/create/DocsCompiler";
import AdditionalRequest from "../components/create/AdditionalRequest";
import InfoPaymentCompiler from "../components/create/InfoPaymentCompiler";
import AttachmentsList from "../components/AttachmentsList";
import Modal from "../../globals/components/layout/Modal";
import { LargeParagraph, Paragraph } from "../../globals/components/typography/paragraphs";
import Drawer from "../../globals/components/layout/Drawer";
import ContactCheckpointCompiler from "../../contacts/components/checkpoint/ContactCheckpointCompiler";
import DropdownStatusEditor from "../components/DropdownStatusEditor";
// Helpers
import { toast } from "react-toastify";
import { useLoadingMeter } from "../../globals/libs/hooks";
import { getPreOrderById } from "../../preOrders/api/fetch";
import { updateFormLogic } from "../libs/reducer";
import { motion } from "framer-motion";
import { useRemoteOrder } from "../libs/hooks";
// Store
import { updateOrderThunk } from "../../app/thunks/ordersThunks";
import { selectSelectedOrder } from "../slices/ordersSlice";
import { selectCompanyInfo } from "../../company/slices/companyInfoSlice";
import { selectPreOrderFromPicker, selectSelectedPreOrder } from "../../preOrders/slices/preOrdersSlice";
// Icons
import { MdOutlineSend } from "react-icons/md";
import pickupIcon from '../../globals/assets/pickup_pin.svg';
import DepotCompiler from "../components/create/DepotCompiler";

// Constants ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, y: 25 },
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function EditOrderContainer({ queryFrom }) {
  const [ pickupDrawer, setPickupDrawer ] = useState(false);
  const [ deliveryDrawer, setDeliveryDrawer ] = useState(false);
  const [ depotDrawer, setDepotDrawer ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ alertModal, setAlertModal ] = useState(false);
  const [ confirmationModal, setConfirmationModal ] = useState(false);
  const [ loadingMeterLimit, setLoadingMeterLimit ] = useLoadingMeter(null);
  const [ attachments, showAttachments ] = useState(false);
  const [ orderId, setOrderId ] = useState(null);
  const [ order, updateOrderState ] = useRemoteOrder(orderId);
  // Store
  const selectedOrder = useSelector(selectSelectedOrder);
  const myCompany = useSelector(selectCompanyInfo);
  const selectedPreOrder = useSelector(selectSelectedPreOrder);
  // Scroller references
  const scrollableRef_left = useRef();
  const scrollableRef_right = useRef();
  const dispatch = useDispatch();
  const location = useLocation();

  /* 
    * Callbacks 
  */
  const updateForm = useCallback(({ target: { value, name, type } }) => {
    updateFormLogic({ name, type, value, updateOrderState });
  }, []);

  const getPreOrder = useCallback(async (preOrderId) => {
    if(preOrderId) {
      const fetchPreOrder = await getPreOrderById(preOrderId);
      dispatch(selectPreOrderFromPicker({ ...fetchPreOrder }));
    }
  }, []);

  // To handle changes from children components and avoid loop
  const initLoadingMeterLimit = useCallback((data) => {
    setLoadingMeterLimit(data)
  }, []);

  /* 
    * Effects 
  */
  useEffect(() => {
    const orderId = new URLSearchParams(location.search).get("id");
    setOrderId(orderId);
  }, []);

  useEffect(() => {
    if(selectedOrder) {
      if(selectedOrder?.preOrderId) {
        getPreOrder(selectedOrder.preOrderId)
      }
      
      updateForm({ target: { type: "copypaste", name: "all", value: selectedOrder }});
    }
  }, [selectedOrder]);

  useEffect(() => {
    if(selectedOrder?.status) {
      updateForm({ target: { type: "text", name: "status", value: selectedOrder?.status }});
    }
  }, [selectedOrder?.status])

  useEffect(() => {
    if(selectedPreOrder) {
      setLoadingMeterLimit(selectedPreOrder.slot, [80,120]);
    }
  }, [selectedPreOrder])

  /* 
    * Subscriptions 
  */
  // ...

  /* 
    * Mutation 
  */
  function handleUpdateOrder() {
    setLoading(true);
    if(order.loadingMeter > loadingMeterLimit) {
      setConfirmationModal(true);
      return null;
    } else {
      runUpdate();
    }
  }

  // Button save config
  const btn_save = {
    onClick: () => handleUpdateOrder(),
    text: "Aggiorna",
    icon: () => <MdOutlineSend />,
    loading: loading,
  }

  const runUpdate = async () => {
    // if(!order?.sender?.vatNumber || !order?.carrier?.vatNumber || !order?.receiver?.vatNumber) {
    //   toast.error("Dati aziendali mancanti.");
    //   setLoading(false);
    //   return null;
    // }

    // // Save companies that are not stored in Contacts
    // await saveAbsentCompaniesInContacts({
    //   companiesInOrder: [order.sender, order.carrier, order.receiver],
    //   allCompaniesContactsVats: allCompaniesContacts.map(c => c.vatNumber),
    //   myCompany,
    //   dispatch,
    // });

    await dispatch(updateOrderThunk({
      order,
      displayToast: true,
    }));

    setLoading(false);
  }


  /*
    Todo: verificare corretto funzionamento del codice seguente:
    Il mittente e il destinatario non devono riuscire ad accedere alla pagina di editing
    Edit 22/04/22: funziona pure troppo bene
  */
  if(!selectedOrder) return <FullSpinner />

  if(selectedOrder?.tenantCarrier !== myCompany.tag) {
    toast.error("Non disponi dell'autorizzazione per modificare gli ordini");
    return <Navigate to={`/orders?from=${queryFrom}&status=pending`} replace />
  }

  if(!order) return <FullSpinner />

  return (
    <SectionWrap className="bg-transparent dark:bg-transparent">
      <SectionTop
        title={`Editor ${order.name}`}
        // icon={() => <FiSend className="w-8 h-auto mr-4"/>}
        icon={null}
        backPath="/orders"
        filters={null}
        action={btn_save}
        className="bg-base-100 rounded-t-md"
      />

      <div className="bg-base-100 rounded-b-md shadow-md z-20">
        <div className="pr-4 py-2 text-lg font-bold">
          <DropdownStatusEditor
            order={order}
            storedOrder={selectedOrder}
            origin={queryFrom}
          />
        </div>
      </div>

      <SafeArea className="grid grid-cols-2 grid-rows-3">
        {/* Left */}
        <div className="relative col-span-2 row-span-2 md:row-span-3 md:col-span-1">
          <SafeCol id="order-creator-left" ref={scrollableRef_left}>
            <div className='bg-base-100 mt-2 mr-4 mb-4 px-4 py-4 rounded-md'>
              <SmallTitle styles="flex items-center mb-4">
                <img src={pickupIcon} className='w-[30px] mr-2' />
                <span>Info ritiro</span>
              </SmallTitle>

              { order?.preOrderId && ( 
                <PickupCompiler
                  sender={order.sender}
                  carrier={order.carrier}
                  myCompany={myCompany}
                  mode={queryFrom}
                  changeableMode={false}
                  pickup={order.pickup}
                  shipmentType={order.shipmentType}
                  trades={order.trades}
                  perishable={order.perishable}
                  updateForm={updateForm}
                  initLoadingMeterLimit={initLoadingMeterLimit}
                  setDrawer={setPickupDrawer}
                  clearLocation={false}
                  hideSlot={true}
                />
              )}
            </div>
          </SafeCol>
        </div>

        {/* Right */}
        <div className="relative col-span-2 row-span-2 md:row-span-3 md:col-span-1">
          <SafeCol id="order-creator-right" ref={scrollableRef_right}>
            <div className="relative w-full h-[250px] mb-4 mt-2 pl-1 rounded-md overflow-hidden">
              <PickupDeliveryMap
                pickup={order.pickupCheckpoint}
                depot={order?.depotCheckpoint?.name && order.depotCheckpoint}
                delivery={order.deliveryCheckpoint}
              />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <DepotCompiler
                carrier={order.carrier}
                depot={order.depot}
                pickupDateEnd={order.pickup.end}
                deliveryDateStart={order.delivery.start}
                updateForm={updateForm}
                showCompiler={Object.values(order.pickup).every(Boolean)}
                clearLocation={true}
                setDrawer={setDepotDrawer}
              />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <DeliveryCompiler
                receiver={order.receiver}
                delivery={order.delivery}
                pickupDateEnd={order.pickup.end}
                updateForm={updateForm}
                showCompiler={Object.values(order.pickup).every(Boolean)}
                clearLocation={false}
                setDrawer={setDeliveryDrawer}
              />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <UdcCompiler
                order={order}
                loadingMeterLimit={loadingMeterLimit}
                LDMFromOthers={0}
                estimatedLDM={parseFloat(order.loadingMeter)}
                updateForm={updateForm}
                showCompiler={Object.values(order.pickup).every(Boolean) && Object.values(order.delivery).every(Boolean)}
              />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <PalletCompiler
                palletInfo={order.palletInfo}
                updateForm={updateForm}
                showCompiler={Object.values(order.pickup).every(Boolean) && Object.values(order.delivery).every(Boolean)}
              />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <DocsCompiler
                docs={order.docs}
                updateForm={updateForm}
                showAttachments={showAttachments}
                showCompiler={Object.values(order.pickup).every(Boolean) && Object.values(order.delivery).every(Boolean)}
              />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <AdditionalRequest
                paymentCondition={order.paymentCondition}
                note={order.note}
                collectChecks={order.collectChecks}
                checksAmount={order.checksAmount}
                companiesNames={{ receiver: { name: order?.receiver?.name }, sender: { name: order?.sender?.name }}}
                updateForm={updateForm}
                showModule={Object.values(order.pickup).every(Boolean) && Object.values(order.delivery).every(Boolean)}
              />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <InfoPaymentCompiler
                order={order}
                updateForm={updateForm}
                showCompiler={Object.values(order.pickup).every(Boolean) && Object.values(order.delivery).every(Boolean)}
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
            />
          </motion.div>
        </div>

        <Modal
          title={"Attenzione!"}
          message={"Il pre-ordine selezionato è stato rimosso dal suo proprietario"}
          messageStyle={'alert-danger'}
          closeModal={() => setAlertModal(false)}
          showModal={alertModal}
          size={320}
        >
          <Paragraph styles="text-center">
            Impossibile proseguire con la compilazione dell'ordine
          </Paragraph>
        </Modal>

        <Modal
          title={"Sei sicuro?"}
          message={"Gli slot occupati da questo ordine superano i parametri impostati nel pre-ordine. Conferma solo se sei sicuro di voler registrare l'ordine"}
          messageStyle={'alert-warn'}
          closeModal={() => {
            setConfirmationModal(false)
            setLoading(false)
          }}
          showModal={confirmationModal}
          size={320}
          confirm={runUpdate}
        >
          <LargeParagraph styles="text-center font-bold text-danger-200 dark:text-danger-300">
            {order.loadingMeter} / {loadingMeterLimit}
          </LargeParagraph>
        </Modal>

        {/* Drawers */}
        <Drawer title="Dettagli magazzino di carico" isOpen={pickupDrawer} setIsOpen={setPickupDrawer}>
          {order.pickup.checkpoint && (
            <ContactCheckpointCompiler
              checkpoints={[order.pickup.checkpoint]}
              editEnabled={false}
              titleStyles="mt-4"
            />
          )}
        </Drawer>

        <Drawer title="Dettagli magazzino di scarico" isOpen={deliveryDrawer} setIsOpen={setDeliveryDrawer}>
          {order.delivery.checkpoint && (
            <ContactCheckpointCompiler
              checkpoints={[order.delivery.checkpoint]}
              editEnabled={false}
              titleStyles="mt-4"
            />
          )}
        </Drawer>

        <Drawer title="Dettagli magazzino di scarico" isOpen={depotDrawer} setIsOpen={setDepotDrawer}>
          { order?.depot?.checkpoint?.name && (
            <ContactCheckpointCompiler
              checkpoints={[order.depot.checkpoint]}
              editEnabled={false}
              titleStyles="mt-4"
            />
          )}
        </Drawer>
      </SafeArea>
    </SectionWrap>
  )
}