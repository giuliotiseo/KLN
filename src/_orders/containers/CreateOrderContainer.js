import { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LargeParagraph, Paragraph } from "../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../globals/components/typography/titles";
import SectionWrap from "../../globals/components/layout/SectionWrap";
import SectionTop from "../../globals/components/layout/SectionTop";
import SafeArea from "../../globals/components/layout/SafeArea";
import SafeCol from "../../globals/components/layout/SafeCol";
import Modal from "../../globals/components/layout/Modal";
import PreOrdersPicker from "../components/PreOrdersPicker";
import PickupCompiler from "../components/create/PickupCompiler";
import UdcCompiler from "../components/create/UdcCompiler";
import AdditionalRequest from "../components/create/AdditionalRequest";
import SenderOptionSelector from "../components/create/SenderOptionSelector";
import DeliveryCompiler from "../components/create/DeliveryCompiler";
import PickupDeliveryMap from "../components/PickupDeliveryMap";
import InfoPaymentCompiler from "../components/create/InfoPaymentCompiler";
import DocsCompiler from "../components/create/DocsCompiler";
import AttachmentsList from "../components/AttachmentsList";
import PalletCompiler from "../components/create/PalletCompiler";
import LinkedOrders from "../components/create/LinkedOrders";
import Drawer from "../../globals/components/layout/Drawer";
import ContactCheckpointCompiler from "../../contacts/components/checkpoint/ContactCheckpointCompiler";
// Helpers
import { initialOrderState, enhancedReducer, updateFormLogic } from "../libs/reducer";
import { saveAbsentCompaniesInContacts } from "../libs/helpers";
import { useLoadingMeter } from "../../globals/libs/hooks";
import { usePreOrderSubscription } from "../../preOrders/libs/hooks";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
// Store
import { selectPreOrderFromPicker, selectSelectedPreOrder } from "../../preOrders/slices/preOrdersSlice";
import { selectAllCompaniesContacts } from "../../contacts/slices/allContactsSlice";
import { selectCompanyInfo, selectTenant } from "../../company/slices/companyInfoSlice";
import { createOrderThunk } from "../../app/thunks/ordersThunks";
import { selectLoadingMetersByPreOrderId } from "../slices/ordersSlice";
// Icons
import pickupIcon from '../../globals/assets/pickup_pin.svg';
import { FiLink } from "react-icons/fi";
import { MdOutlineSend } from "react-icons/md";

// Constants ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, y: 25 },
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CreateOrderContainer({ queryFrom }) {
  const [ pickupDrawer, setPickupDrawer ] = useState(false);
  const [ deliveryDrawer, setDeliveryDrawer ] = useState(false);
  const [ senderType, setSenderType ] = useState("PREORDER");
  const [ attachments, showAttachments ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ alertModal, setAlertModal ] = useState(false);
  const [ order, updateOrderState ] = useReducer(enhancedReducer, initialOrderState);
  const [ confirmationModal, setConfirmationModal ] = useState(false);
  const { onCreatePreOrder, onUpdatePreOrder, onDeletePreOrder } = usePreOrderSubscription();
  // Data from store
  const dispatch = useDispatch();
  const tenant = useSelector(selectTenant);
  const selectedPreOrder = useSelector(selectSelectedPreOrder);
  const allCompaniesContacts = useSelector(selectAllCompaniesContacts);
  const myCompany = useSelector(selectCompanyInfo)

  // start - Need to fix this:
  const [ loadingMeterLimit, setLoadingMeterLimit ] = useLoadingMeter(null);
  const LDMFromOthers = useSelector((state) => selectLoadingMetersByPreOrderId(state));
  const estimatedLDM = parseFloat(order.loadingMeter) + parseFloat(LDMFromOthers);
  console.groupCollapsed("LDM from others and Estimated")
  console.log("! LDMFromOthers - ", LDMFromOthers);
  console.log("! EstimatedLDM - ", estimatedLDM);
  console.groupEnd();
  // end - Need to fix

  // Scroller references
  const scrollableRef_left = useRef();
  const scrollableRef_right = useRef();

  /* 
    * Callbacks 
  */
  //  Global form update
  const updateForm = useCallback(({ target: { value, name, type }}) => {
    updateFormLogic({ name, type, value, updateOrderState });
  }, []);

  // Reset sender callback
  const resetSenderData = useCallback(() => {
    if(selectedPreOrder) {
      dispatch(selectPreOrderFromPicker(null));
      updateForm({ target: { type: "reset", name: "sender", value: null }});
    };
  }, [selectedPreOrder, dispatch, updateForm]);
    
  // To handle changes from children components and avoid loop
  const initLoadingMeterLimit = useCallback((data) => {
    setLoadingMeterLimit(data)
  }, []);

  // Callback for clicking on pre-order item (triggered by redux change)
  const handlePreOrderChanges = useCallback((selectedPreOrder) => {
    if(selectedPreOrder) {
      setLoadingMeterLimit(selectedPreOrder.slot, [80,120]);
      updateForm({ target: { type: "copypaste", name: "preOrder", value: selectedPreOrder }});
    } else {
      setLoadingMeterLimit(null); // reset
      updateForm({ target: { type: "undo", name: "preOrder", value: null }});
    }
  }, [initLoadingMeterLimit, updateForm, setLoadingMeterLimit]);

  const runCreate = useCallback(async() => {
    if(!order?.sender?.vatNumber || !order?.carrier?.vatNumber || !order?.receiver?.vatNumber) {
      toast.error("Dati aziendali mancanti.");
      setLoading(false);
      setConfirmationModal(false);
      return null;
    }

    if(order.collectChecks === "NONE" && typeof order.collectChecks !== "boolean") {
      toast.error("Impossibile procedere: devi scegliere se desideri o meno la gestione dell'assegno. Vedi `Richieste aggiuntive`.");
      setLoading(false);
      setConfirmationModal(false);
      return null;
    }

    // Save companies that are not stored in Contacts
    await saveAbsentCompaniesInContacts({
      companiesInOrder: [order.sender, order.carrier, order.receiver],
      allCompaniesContactsVats: allCompaniesContacts.map(c => c.vatNumber),
      myCompany,
      dispatch,
    });

    await dispatch(createOrderThunk({
      order,
      displayToast: true,
    }));

    setLoading(false);
    setConfirmationModal(false);
    updateForm({ target: { type: "reset", name: "delivery", value: null }});
  }, [order]);

  /* 
    * Effects 
  */
  // Safe initializer on start
  useEffect(() => {
    updateForm({ target: { type: "reset", name: "sender", value: null }});
    updateForm({ target: { type: "reset", name: "receiver", value: null }});
  }, [updateForm]);


  // Trigger reset sender after change sender selection method
  useEffect(() => {
    resetSenderData();
  }, [senderType]);

  // When I select or deselect sender and pickup informations by pre-order
  useEffect(() => {
    handlePreOrderChanges(selectedPreOrder);
  }, [selectedPreOrder]);

  /* 
    * Subscriptions 
  */
  // onUpdate (pre-order)
  useEffect(() => {
    console.log('Triggered changes: onUpdatePreOrder', onUpdatePreOrder);
    if(onUpdatePreOrder?.value) dispatch(onUpdatePreOrder.action(onUpdatePreOrder.value));
  }, [onUpdatePreOrder]);

  // onDelete (pre-order)
  useEffect(() => {
    console.log('Triggered changes: onDeletePreOrder', onDeletePreOrder);
    if(onDeletePreOrder?.value) {
      dispatch(onDeletePreOrder.action(onDeletePreOrder.value));
      if(selectedPreOrder?.id === onDeletePreOrder.value.id) {
        setAlertModal(true);
        resetSenderData();
      }
    }
  }, [onDeletePreOrder]);
  
  // onCreate (pre-order)
  useEffect(() => {
    if(onCreatePreOrder?.value) {
      console.log('Triggered changes: onCreatePreOrder', onCreatePreOrder);
      // If the registration isn't pushed by the same author who must receive
      if(tenant && (tenant !== onCreatePreOrder.value.tenantSender)) {
        dispatch(onCreatePreOrder.action(onCreatePreOrder.value));
      }
    }
  }, [tenant, onCreatePreOrder]);

  /* 
    * Mutation 
  */
  function handleCreateOrder() {
    setLoading(true);
    if(estimatedLDM > loadingMeterLimit) {
      setConfirmationModal(true);
      return null;
    } else {
      runCreate();
    }
  }

  // Button save config
  const btn_save = {
    onClick: () => handleCreateOrder(order),
    text: "Registra",
    icon: () => <MdOutlineSend />,
    loading: loading,
  }

  return (
    <SectionWrap className="bg-transparent dark:bg-transparent">
      <SectionTop
        title={`Configuratore ordini`}
        icon={null}
        backPath="/orders"
        filters={null}
        action={btn_save}
      />

      <SafeArea className="grid grid-cols-2 grid-rows-3">
        {/* Left */}
        <div className="relative col-span-2 row-span-2 md:row-span-3 md:col-span-1">
          <SafeCol id="order-creator-left" ref={scrollableRef_left}>
            <div className='bg-base-100 mt-2 mr-4 mb-4 px-4 py-4 rounded-md'>
              <SmallTitle styles="flex items-center">
                <img src={pickupIcon} className='w-[30px] mr-2' />
                <span>Info ritiro</span>
              </SmallTitle>
              <SenderOptionSelector
                title="Scegli il metodo di configurazione del ritiro"
                value={senderType}
                onChange={setSenderType}
                styles="mt-2"
              />
            </div>

            <div className='bg-base-100 mt-2 mr-4 mb-4 px-4 py-4 rounded-md'>
              {/* Pre-orders picker is cool */}
              { senderType === "PREORDER" && (
                <PreOrdersPicker
                  queryStatus={"processing"}
                  queryFrom={queryFrom}
                  title="Collega un pre-ordine"
                  icon={() => <FiLink />}
                  onClick={(value) => dispatch(selectPreOrderFromPicker(value))}
                />
              )}

              {/* Manual selection is bad, but ok... I understand your creepy mind */}
              { !selectedPreOrder && senderType === "MANUAL" && (
                <PickupCompiler
                  sender={order.sender}
                  carrier={order.carrier}
                  myCompany={myCompany}
                  mode={queryFrom}
                  pickup={order.pickup}
                  shipmentType={order.shipmentType}
                  trades={order.trades}
                  perishable={order.perishable}
                  updateForm={updateForm}
                  setLoadingMeterLimit={setLoadingMeterLimit}
                  initLoadingMeterLimit={initLoadingMeterLimit}
                  setDrawer={setPickupDrawer}
                />
              )}
            </div>
            
            { selectedPreOrder?.id && (selectedPreOrder.id === order?.preOrderId) && (
              <div className='mt-2 mr-4 mb-4 rounded-md'>
                <LinkedOrders
                  order={order}
                  itemStyles="bg-base-100 dark:hover:bg-dark-200 p-4 rounded-md"
                  enableDelete={true}
                />
              </div>
            )}
          </SafeCol>
        </div>

        {/* Right */}
        <div className="relative col-span-2 row-span-2 md:row-span-3 md:col-span-1">
          <SafeCol id="order-creator-right" ref={scrollableRef_right}>
            <div className="relative w-full h-[250px] mb-4 mt-2 pl-1 rounded-md overflow-hidden">
              <PickupDeliveryMap
                pickup={order.pickup.checkpoint}
                delivery={order.delivery.checkpoint}
              />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <DeliveryCompiler
                receiver={order.receiver}
                delivery={order.delivery}
                pickupDateStart={order.pickup.start}
                pickupDateEnd={order.pickup.end}
                updateForm={updateForm}
                showCompiler={Object.values(order.pickup).every(Boolean)}
                setDrawer={setDeliveryDrawer}
              />
            </div>

            <div className='bg-base-100 mt-2 mb-4 ml-1 px-4 py-4 rounded-md'>
              <UdcCompiler
                order={order}
                loadingMeterLimit={loadingMeterLimit}
                LDMFromOthers={LDMFromOthers}
                estimatedLDM={estimatedLDM}
                updateForm={updateForm}
                showCompiler={Object.values(order.pickup).every(Boolean) && Object.values(order.delivery).every(Boolean)}
                editMode={false}
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

        {/* Modals */}
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
          confirm={runCreate}
        >
          <LargeParagraph styles="text-center font-bold text-danger-200 dark:text-danger-300">
            {estimatedLDM} / {loadingMeterLimit}
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

      </SafeArea>
    </SectionWrap>
  )
}