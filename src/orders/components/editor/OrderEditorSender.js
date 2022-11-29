import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeCustomersListLimit, resetCustomersList } from '../../../customers/slices/customersListSlice';
import OrderCheckpointPicker from '../form/OrderCheckpointPicker';
import OrderCompanyPicker from '../form/OrderCompanyPicker';
import OrderRangeDatePicker from '../form/OrderRangeDatePicker';

function OrderEditorSender({
  order,
  sendersQuery,
  senderDetailsQuery,
  setSenderSearchable,
  updateSender,
  updatePickupCheckpoint,
  editable,
  warehousesQuery,
  companyType,
  updateForm = (value) => console.log('Default callback in OrderPickupForCarrierForm', value),
}) {
  // Tutti i clienti mittenti
  const [{ items: customers, isLoading, isFetching, refetch }, pagination ] = sendersQuery;
  // I dettagli del mittente estratto dalla lista clienti
  const { data: senderCustomerDetails, isFetching: isFetchingSenderCustomerDetails, isLoading: isLoadingSenderCustomerDetails, refetch: refetchSenderCustomerDetails } = senderDetailsQuery;
  // Tutti i magazzini gestiti
  const [{ items: senderWarehouses, isLoading: isLoadingSenderWarehouses, isFetching: isFetchingSenderWarehouses, refetch: refetchWarehousesFromSender }] = warehousesQuery;
  // Elemeni globali del component
  let warehouses, refetchWarehouses, loadingWarehouses = null;

  // Associazione elementi globali componente sulla base del ruolo dell'azienda
  if(companyType === "SENDER") {
    warehouses = senderWarehouses;
    loadingWarehouses = isLoadingSenderWarehouses || isFetchingSenderWarehouses;
    refetchWarehouses = refetchWarehousesFromSender;
  } else {
    loadingWarehouses =  isLoadingSenderCustomerDetails || isFetchingSenderCustomerDetails;
    refetchWarehouses = refetchSenderCustomerDetails;
    if(senderCustomerDetails) {
      warehouses = senderCustomerDetails?.warehouses || [];
    } else {
      warehouses = [];
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCustomersListLimit(1000));
    return () => dispatch(resetCustomersList());
  }, []);

  return (
    <div className='my-2'>       
      <h2 className="title-5 mb-4 uppercase text-gray-500 dark:text-gray-600">
        Informazioni mittente
      </h2>

      <OrderCompanyPicker
        customers={customers}
        summaryTitle="Mittente selezionato"
        pickerTitle="Seleziona il mittente"
        listType={"ALL"}
        loading={isLoading || isFetching}
        refetch={refetch}
        pagination={pagination}
        callback={updateSender}
        searchCompany={(value) => setSenderSearchable(value)}
        selectedCustomer={order?.sender}
        editable={editable && updateSender ? true : false}
        className="mb-4"
      />

      { order?.sender?.id && (
        <OrderCheckpointPicker
          company={order.sender}
          warehouses={warehouses}
          loading={loadingWarehouses}
          refetch={refetchWarehouses}
          callback={updatePickupCheckpoint}
          selectedWarehouse={order?.pickupCheckpoint}
          editable={true}
          title="Seleziona punto di ritiro"
          summaryTitle="Punto di ritiro"
        />
      )}

      { order?.pickupCheckpoint?.extId && <section className="mb-4 bg-base-100 rounded-md">
        <OrderRangeDatePicker
          checkpoint={order.pickupCheckpoint}
          dateStartValue={order?.pickupDateStart}
          dateStartName={"pickupDateStart"}
          dateEndValue={order?.pickupDateEnd}
          dateEndName={"pickupDateEnd"}
          updateForm={updateForm}
          pickupDateEnd={order?.pickupDateEnd}
          windowTypeToCheck="CARICO"
          windowsToShow={["CARICO"]}
          title = "Data e orario di ritiro"
        />
      </section> }
    </div>
  )
}

export default OrderEditorSender
