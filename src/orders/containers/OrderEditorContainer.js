import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCustomerByCompanyIdQuery } from '../../customers/api/customers-api-slice';
import { useOrderByPreOrderIdQuery } from '../api/orders-api-slice';
import { usePreOrderByIdQuery } from '../../pre-orders/api/pre-orders-api-slice';
import useListCustomers from '../../customers/hooks/useListCustomers';
import useUpdateOrder from '../hooks/useUpdateOrder';
import useCalculateLDM from '../hooks/useCalculateLDM';
import useListPreOrders from '../../pre-orders/hooks/useListPreOrders';
import useListWarehouses from '../../warehouses/hooks/useListWarehouses';
// Components
import Button from '../../globals/components/buttons_v2/Button';
import SafeCol from '../../globals/components/layout/SafeCol';
import OrderEditorSender from '../components/editor/OrderEditorSender';
import OrderEditorCarrier from '../components/editor/OrderEditorCarrier';
import PickupDeliveryMap from '../../_orders/components/PickupDeliveryMap';
import OrderDeliveryCompiler from '../components/form/OrderDeliveryCompiler';
import UdcCompiler from '../components/form/UdcCompiler';
import DocsCompiler from '../components/form/DocsCompiler';
import AdditionalRequestCompiler from '../components/form/AdditionalRequestCompiler';
import InfoPaymentCompiler from '../components/form/InfoPaymentCompiler';
import OrderBillingTypeSelector from '../components/form/OrderBillingTypeSelector';
import CardDetails from '../../globals/components/dataDisplay/CardDetails';
import TextEditor from '../../globals/components/dataEntry/TextEditor';
import OrdersInPreOrder from '../components/viewer/OrdersInPreOrder';
import OrderEditorStatus from '../components/editor/OrderEditorStatus';
import OrderAttachmentsFloatingWindow from '../components/editor/OrderAttachmentsFloatingWindow';
import { FiCheck, FiTerminal } from 'react-icons/fi';
import { BiReset } from 'react-icons/bi';
// Actions
import { changeOrderEditorCarrier, changeOrderEditorCheckpoint, changeOrderEditorCustomer, changeOrderEditorForm, changeOrderEditorPalletInfo, changeOrderEditorPreOrder, changeOrderEditorQuantity, changeOrderEditorReceiver, changeOrderEditorSender, changeOrderEditorSize, removeOrderEditorFile, resetOrderEditor, restoreOrderEditorFile, selectOrderEditor } from '../slices/orderEditorSlice';
import { addFileToOrderEditorThunk } from '../api/orders-thunks';
// Helpers
import { round } from '../../globals/libs/helpers';

// Constants ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const COMPANY_TYPES = {
  CARRIER: "VETTORE",
  SENDER: "MITTENTE"
}

const operationTypeToCompany = {
  pickup: "sender",
  depot: "carrier",
  delivery: "receiver"
}

// Main component ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function OrderEditorContainer({ order, currentCompanyRole }) {
  const [ senderSearchable, setSenderSearchable ] = useState("");
  const [ carrierSearchable, setCarrierSearchable ] = useState("");
  const [ receiverSearchable, setReceiverSearchable ] = useState("");
  const [ attachments, showAttachments ] = useState(false);
  const [ preOrderDrawer, setPreOrderDrawer ] = useState(false);
  const sendersQuery = useListCustomers("SENDER", senderSearchable.toLowerCase());
  const carriersQuery = useListCustomers("CARRIER", carrierSearchable.toLowerCase());
  const receiversQuery = useListCustomers("RECEIVER", receiverSearchable.toLowerCase());
  const preOrdersQuery = useListPreOrders({ companyType: currentCompanyRole, status: "ORDER" });
  const { data: preOrderDetails } = usePreOrderByIdQuery(order?.preOrderId ? { id: order.preOrderId } : null);
  const ordersInPreOrderQuery = useOrderByPreOrderIdQuery(order?.preOrderId ? { preOrderId: order.preOrderId } : null);
  const orderEditor = useSelector(selectOrderEditor);
  const senderDetailsQuery = useCustomerByCompanyIdQuery((orderEditor?.sender?.company?.id) ? { companyId: orderEditor.sender.company.id }  : null );
  const carrierDetailsQuery = useCustomerByCompanyIdQuery((order?.carrier?.company?.id) ? { companyId: order.carrier.company.id }  : null );
  const receiverDetailsQuery = useCustomerByCompanyIdQuery((orderEditor?.receiver?.company?.id) ? { companyId: orderEditor.receiver.company.id }  : null );
  const LDMFromOthers = useCalculateLDM(ordersInPreOrderQuery?.data);
  const estimatedLDM = round((parseFloat(order?.loadingMeter) + (parseFloat(LDMFromOthers) - parseFloat(order.originalLoadingMeter))), 10);
  const warehousesQuery  = useListWarehouses("ALL");
  const [ updateOrder, { isLoading, validationError }] = useUpdateOrder(order);
  const dispatch = useDispatch();

  /*
    * Callbacks 
  */
  const updateForm = useCallback((payload) => {
    dispatch(changeOrderEditorForm(payload));
  }, [dispatch]);

  const updatePreOrder = useCallback((value) => {
    dispatch(changeOrderEditorPreOrder(value));
  }, [dispatch]);

  const updateSender = useCallback((value) => {
    dispatch(changeOrderEditorSender(value));
  }, [dispatch])

  const updateCarrier = useCallback((value) => {
    dispatch(changeOrderEditorCarrier(value));
  }, [dispatch]);

  const updateReceiver = useCallback((value) => {
    dispatch(changeOrderEditorReceiver(value));
  }, [dispatch]);

  const updateQuantity = useCallback((value) => {
    dispatch(changeOrderEditorQuantity({
      quantity: value,
      size: order.size,
      support: order.support
    }))
  }, [order.size, order.support, dispatch]);

  const updateSize = useCallback((value) => {
    dispatch(changeOrderEditorSize(value))
  }, [dispatch]);

  const addPalletInfo = useCallback((value) => {
    dispatch(changeOrderEditorPalletInfo({ value, opType: "ADD", prev: order.palletInfo }))
  }, [dispatch]);

  const removePalletInfo = useCallback((value) => {
    dispatch(changeOrderEditorPalletInfo({ value, opType: "REMOVE", prev: order.palletInfo }))
  }, [dispatch]);

  const updateCustomer = useCallback((value) => {
    dispatch(changeOrderEditorCustomer(value))
  }, [dispatch]);

  const updateCheckpoint = useCallback((payload) => {
    if(!payload?.opType) {
      console.error("OpType property missing", payload);
      return;
    }

    const target = operationTypeToCompany[payload.opType];    
    dispatch(changeOrderEditorCheckpoint({
      ...payload.value,
      company: order[target] || null,
      opType: payload.opType,
    }));
  }, [dispatch]);

  const updateTrades = useCallback((value) => {
    updateForm({
      name: "trades",
      value: order?.trades?.includes(value)
        ? order.trades.filter(trade => trade !== value)
        : order.trades.concat(value)
    })
  }, [dispatch, order.trades]);


  // Gestione file da rivedere in ottica docs
  const addFile = useCallback(({ docIndex, value }) => {
      dispatch(addFileToOrderEditorThunk({
        docs: order.docs,
        docIndexToSelect: docIndex,
        file: value,
      }))
  }, [dispatch, order.docs]);

  const removeFile = useCallback(({ value, docIndex }) => {
    if(order?.docs?.length > 0) {
      dispatch(removeOrderEditorFile({
        docs: order.docs,
        files: order.docs[docIndex].files,
        docIndexToSelect: docIndex ,
        fileIndexToRemove: value
      })) 
    }
  }, [dispatch, order.docs]);

  const restoreFile = useCallback(({ value, docIndex }) => {
    if(order?.docs?.length > 0) {
      dispatch(restoreOrderEditorFile({
        docIndexToSelect: docIndex,
        indexToRestore: value
      })) 
    }
  }, [dispatch, order.docs]);

  const reset = useCallback(() => {
    dispatch(resetOrderEditor());
  }, [dispatch]);

  /*
    * Reset effect 
  */

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex gap-2 flex-col md:flex-row h-full">
        <aside className="relative rounded-lg flex-1 my-2 overflow-hidden">
          <SafeCol id="OrderEditorContainer--left">

            { currentCompanyRole === "CARRIER" && (
              <OrderEditorStatus
                order={order}
                updateForm={updateForm}
              />
            )}

            <OrderEditorSender
              order={order}
              sendersQuery={sendersQuery}
              senderDetailsQuery={senderDetailsQuery}
              setSenderSearchable={setSenderSearchable}
              updateSender={updateSender}
              updatePickupCheckpoint={(value) => updateCheckpoint({ value, opType: "pickup" })}
              updateForm={updateForm}
              editable={currentCompanyRole === "CARRIER"}
              companyType={currentCompanyRole}
              warehousesQuery={warehousesQuery}
            />

            { preOrderDetails && (
              <OrdersInPreOrder
                order={order}
                selectedPreOrder={preOrderDetails}
                ordersInPreOrderQuery={ordersInPreOrderQuery}
                companyType={currentCompanyRole}
              />
            )}
          </SafeCol>
        </aside>

        {/* Content */}
        <section className="relative flex-1 lg:flex-2 bg-base-200">
          <SafeCol id="OrderEditorContainer--center">
            <div className='px-4'>
              <div className="relative w-full h-[250px] mt-2 mb-4 rounded-lg overflow-hidden">
                <PickupDeliveryMap
                  pickup={order.pickupCheckpoint?.name && order.pickupCheckpoint}
                  depot={order?.depotCheckpoint?.name && order.depotCheckpoint}
                  delivery={order?.deliveryCheckpoint?.name && order.deliveryCheckpoint}
                />
              </div>

              { order.shipmentType === "GROUPAGE" && (
                <OrderEditorCarrier
                  order={order}
                  carriersQuery={carriersQuery}
                  warehousesQuery={warehousesQuery}
                  updateCarrier={updateCarrier}
                  setCarrierSearchable={setCarrierSearchable}
                  carrierDetailsQuery={carrierDetailsQuery}
                  companyType={currentCompanyRole}
                  updateDepotCheckpoint={(value) => updateCheckpoint({ value, opType: "depot" })}
                  updateForm={updateForm}
                  editable={currentCompanyRole === "SENDER"}
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
                companyType={currentCompanyRole}
              />

              <h2 className="title-5 my-4 uppercase text-gray-500 dark:text-gray-600">
                Dettagli ordine
              </h2>

              <UdcCompiler
                order={{ ...order, selectedPreOrder: preOrderDetails }}
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
          <span className="text-sm">Modifica ordine / { COMPANY_TYPES[currentCompanyRole]} </span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={reset}
          />

          <Button
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text={"Aggiorna ordine"}
            loading={isLoading}
            onClick={updateOrder}
          />
        </div>
      </footer>

      <OrderAttachmentsFloatingWindow
        docs={order?.docs}
        title={`Editor allegati n. doc ${order?.docs?.[attachments - 1]?.number}`}
        attachments={attachments}
        showAttachments={showAttachments}
        addFile={addFile}
        removeFile={removeFile}
        restoreFile={restoreFile}
      />
    </div>
  )
}

export default OrderEditorContainer

