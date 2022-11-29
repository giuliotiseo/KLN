import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { usePreOrderByIdQuery } from '../../pre-orders/api/pre-orders-api-slice';
import { useCustomerByIdQuery } from '../../customers/api/customers-api-slice';
import { useOrderByPreOrderIdQuery } from '../api/orders-api-slice';
import useCreateOrder from '../hooks/useCreateOrder';
import useListCustomers from '../../customers/hooks/useListCustomers';
import useListPreOrders from '../../pre-orders/hooks/useListPreOrders';
import useListWarehouses from '../../warehouses/hooks/useListWarehouses';
import useCalculateLDM from '../hooks/useCalculateLDM';
// Components
import Button from '../../globals/components/buttons_v2/Button';
import OrderPickupCompiler from '../components/form/OrderPickupCompiler';
import OrderDepotForCarrierCompiler from '../components/form/OrderDepotForCarrierCompiler';
import PreOrderViewerContent from '../../pre-orders/components/viewer/PreOrderViewerContent';
import OrderDeliveryCompiler from '../components/form/OrderDeliveryCompiler';
import Spinner from '../../globals/components/layout/Spinner';
import PickupDeliveryMap from '../../_orders/components/PickupDeliveryMap';
import SafeCol from '../../globals/components/layout/SafeCol';
import Drawer from '../../globals/components/layout/Drawer';
import UdcCompiler from '../components/form/UdcCompiler';
import DocsCompiler from '../components/form/DocsCompiler';
import AttachmentsList from '../components/viewer/AttachmentsList';
import CardDetails from '../../globals/components/dataDisplay/CardDetails';
import TextEditor from '../../globals/components/dataEntry/TextEditor';
import AdditionalRequestCompiler from '../components/form/AdditionalRequestCompiler';
import OrderBillingTypeSelector from '../components/form/OrderBillingTypeSelector';
import InfoPaymentCompiler from '../components/form/InfoPaymentCompiler';
import { FiCheck, FiTerminal } from 'react-icons/fi';
import { BiReset } from 'react-icons/bi';
// Actions
import { changeOrderCreatorCheckpoint, changeOrderCreatorCustomer, changeOrderCreatorForm, changeOrderCreatorPalletInfo, changeOrderCreatorPreOrder, changeOrderCreatorQuantity, changeOrderCreatorReceiver, changeOrderCreatorSender, changeOrderCreatorSize, changeOrderCreatorTrades, resetOrderCreator, selectOrderCreator } from '../slices/orderCreatorSlice';
import { selectCurrentCompany } from '../../company/slices/companySlice';
// Helpers
import { round } from '../../globals/libs/helpers';

function OrderCreatorCarrierContainer() {
  const [ senderSearchable, setSenderSearchable ] = useState("");
  const [ receiverSearchable, setReceiverSearchable ] = useState("");
  const [ preOrderDrawer, setPreOrderDrawer ] = useState(false);
  const [ attachments, showAttachments ] = useState(false);
  const order = useSelector(selectOrderCreator);
  const currentCompany = useSelector(selectCurrentCompany);
  const sendersQuery = useListCustomers("SENDER", senderSearchable.toLowerCase());
  const receiversQuery = useListCustomers("RECEIVER", receiverSearchable.toLowerCase());
  const preOrdersQuery = useListPreOrders({ companyType: "CARRIER", status: "ORDER" });
  const { pathname } = useLocation();
  const { data: preOrderDetails,  isFetching: isFetchingPreOrderDetails, isLoading: isLoadingPreOrderDetails  } = usePreOrderByIdQuery({ id: preOrderDrawer });
  const senderDetailsQuery = useCustomerByIdQuery((!order.selectedPreOrder && order?.sender?.id) ? { id: order.sender.id }  : null );
  const receiverDetailsQuery = useCustomerByIdQuery(order?.receiver?.id ? { id: order.receiver.id }  : null);
  const ordersInPreOrderQuery = useOrderByPreOrderIdQuery(order?.selectedPreOrder?.id ? { preOrderId: order.selectedPreOrder.id } : null);
  const LDMFromOthers = useCalculateLDM(ordersInPreOrderQuery.data);
  const estimatedLDM = round((parseFloat(order?.loadingMeter) + parseFloat(LDMFromOthers)), 10);
  const [{ items: warehouses, isLoading: isLoadingWarehouses, isFetching: isFetchingWarehouses, refetch: refetchWarehouses }]  = useListWarehouses("ALL");
  const [ createOrder, { isLoading }] = useCreateOrder();

  const dispatch = useDispatch();

  /*
    * Callbacks
  */
  const updateForm = useCallback((payload) => {
    dispatch(changeOrderCreatorForm(payload));
  }, [dispatch]);

  const updatePreOrder = useCallback((value) => {
    dispatch(changeOrderCreatorPreOrder(value));
  }, [dispatch]);

  const updateSender = useCallback((value) => {
    dispatch(changeOrderCreatorSender(value));
  }, [dispatch]);

  const updateCheckpoint = useCallback((payload) => {
    if(!payload?.opType) {
      console.error("OpType property missing", payload);
      return;
    }
    
    dispatch(changeOrderCreatorCheckpoint({ ...payload.value, opType: payload.opType }));
  }, [dispatch]);

  const updateReceiver = useCallback((value) => {
    dispatch(changeOrderCreatorReceiver(value));
  }, [dispatch]);

  const updateTrades = useCallback((value) => {
    dispatch(changeOrderCreatorTrades(value))
  }, [dispatch]);

  const updateQuantity = useCallback((value) => {
    dispatch(changeOrderCreatorQuantity(value))
  }, [dispatch]);

  const updateSize = useCallback((value) => {
    dispatch(changeOrderCreatorSize(value))
  }, [dispatch]);

  const addPalletInfo = useCallback((value) => {
    dispatch(changeOrderCreatorPalletInfo({value, opType: "ADD"}))
  }, [dispatch]);

  const removePalletInfo = useCallback((value) => {
    dispatch(changeOrderCreatorPalletInfo({ value, opType: "REMOVE"}))
  }, [dispatch]);

  const updateCustomer = useCallback((value) => {
    dispatch(changeOrderCreatorCustomer(value))
  }, [dispatch]);

  const handleCreateOrder = useCallback(() => {
    createOrder({
      ...order,
      carrier: currentCompany
    });
  }, [order, currentCompany])

  const reset = useCallback(() => {
    dispatch(resetOrderCreator());
  }, [dispatch]);

  /*
    * Reset effect 
  */
  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <div className="flex flex-col h-full w-full gap-4">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        <aside className="relative rounded-lg flex-1 my-2 overflow-hidden">
          <OrderPickupCompiler
            order={order}
            preOrdersQuery={preOrdersQuery}
            customersQuery={sendersQuery}
            customerDetailsQuery={senderDetailsQuery}
            ordersInPreOrderQuery={ordersInPreOrderQuery}
            setCustomerSearchable={setSenderSearchable}
            setPreOrderDrawer={setPreOrderDrawer}
            updateForm={updateForm}
            updateCustomer={updateSender}
            updatePickupCheckpoint={(value) => updateCheckpoint({ value, opType: "pickup" })}
            updateTrades={updateTrades}
            updatePreOrder={updatePreOrder}
          />
        </aside>

        {/* Content */}
        <section className="relative flex-1 lg:flex-2 bg-base-200">
          <SafeCol>
            <div className='px-4'>
              <div className="relative w-full h-[250px] mt-2 mb-4 rounded-lg overflow-hidden">
                <PickupDeliveryMap
                  pickup={order.pickupCheckpoint?.name && order.pickupCheckpoint}
                  depot={order?.depotCheckpoint?.name && order.depotCheckpoint}
                  delivery={order?.deliveryCheckpoint?.name && order.deliveryCheckpoint}
                />
              </div>

              { order.shipmentType === "GROUPAGE" && (
                <OrderDepotForCarrierCompiler
                  order={order}
                  company={currentCompany}
                  warehouses={warehouses}
                  loading={isLoadingWarehouses || isFetchingWarehouses }
                  refetch={refetchWarehouses}
                  selectedWarehouse={order?.depotCheckpoint}
                  updateDepotCheckpoint={(value) => updateCheckpoint({ value, opType: "depot" })}
                  updateForm={updateForm}
                  editable={true}
                  className = ""
                  title="Seleziona il magazzino di scarico vettore"
                />
              )}

              <OrderDeliveryCompiler
                order={order}
                preOrdersQuery={preOrdersQuery}
                customersQuery={receiversQuery}
                receiverDetailsQuery={receiverDetailsQuery}
                ordersInPreOrderQuery={ordersInPreOrderQuery}
                setReceiverSearchable={setReceiverSearchable}
                setPreOrderDrawer={setPreOrderDrawer}
                updateForm={updateForm}
                updateReceiver={updateReceiver}
                updatePreOrder={updatePreOrder}
                updateDeliveryCheckpoint={(value) => updateCheckpoint({ value, opType: "delivery" })}
                companyType="CARRIER"
              />
              
              <h2 className="title-5 my-4 uppercase text-gray-500 dark:text-gray-600">
                Dettagli ordine
              </h2>

              <UdcCompiler
                order={order}
                estimatedLDM={estimatedLDM}
                LDMFromOthers={LDMFromOthers}
                updateQuantity={updateQuantity}
                updateSize={updateSize}
                updateTrades={updateTrades}
                updateForm={updateForm}
                addPalletInfo={addPalletInfo}
                removePalletInfo={removePalletInfo}
              />

              <DocsCompiler
                order={order}
                updateForm={updateForm}
                showAttachments={showAttachments}
              />

              <AdditionalRequestCompiler
                order={order}
                companiesNames={{ receiver: { name: order?.receiver?.name }, sender: { name: order?.sender?.name }}}
                updateForm={updateForm}
              />

              <InfoPaymentCompiler
                order={order}
                updateForm={updateForm}
                updateCustomer={updateCustomer}
              />

              <OrderBillingTypeSelector
                order={order}
                updateForm={updateForm}
              />

              <CardDetails
                header={<h4 className="title-3">Note ordine</h4>}
                className="mt-4"
              >
                <TextEditor
                  content={order.note}
                  onSaveTextEditor={(content) => updateForm({ name: "note", value: content })} 
                  label="Aggiungi annotazioni per il vettore"
                  actionButtonPosition="INTERNAL"
                  showList={true}
                />
              </CardDetails>
            </div>
          </SafeCol>
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Compilazione ordine / VETTORE</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={reset}
          />

          <Button
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text={pathname.includes("carrier") ? `Registra ordine` : `Invia ordine` }
            loading={isLoading}
            onClick={handleCreateOrder}
          />
        </div>
      </footer>

      {/* Drawers */}
      <Drawer title={`Dettagli Pre-ordine`} isOpen={preOrderDrawer} setIsOpen={setPreOrderDrawer}>
        { !preOrderDetails || isFetchingPreOrderDetails || isLoadingPreOrderDetails 
          ? <Spinner />
          : <PreOrderViewerContent
              preOrder={preOrderDetails}
              currentRole={"CARRIER"}
            />
        }
      </Drawer>

      {/* Fixed window for attachments */}
      <div className={`fixed right-6 bottom-10 transition-all ${attachments ? "pointer-events-all" : "pointer-events-none"}`}>
        <div
          className={`mb-2 z-50 backdrop-blur-lg bg-base-100/30 w-[400px] h-[350px] shadow-xl rounded-md border border-zinc-300 
          ${attachments ? "pointer-events-all opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <AttachmentsList
            docs={order.docs}
            showAttachments={showAttachments}
            indexAttachment={attachments ? attachments - 1 : null}
            remote={false}
          />
        </div>
      </div>

    </div>
  )
}

export default OrderCreatorCarrierContainer
