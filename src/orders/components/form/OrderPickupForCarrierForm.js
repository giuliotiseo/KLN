import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeCustomersListLimit, resetCustomersList } from '../../../customers/slices/customersListSlice';
import PreOrderCargoType from '../../../pre-orders/components/form/PreOrderCargoType';
import OrderCheckpointPicker from './OrderCheckpointPicker';
import OrderCompanyPicker from './OrderCompanyPicker';
import OrderRangeDatePicker from './OrderRangeDatePicker';
import OrderSubjectCompiler from './OrderSubjectCompiler';

function OrderPickupForCarrierForm({
  order,
  customersQuery,
  senderDetailsQuery,
  setSenderSearchable,
  updateSender,
  updateTrades,
  updatePickupCheckpoint,
  updateForm = (value) => console.log('Default callback in OrderPickupForCarrierForm', value),
}) {
  const [{ items: customers, isLoading, isFetching, refetch }, pagination ] = customersQuery;
  const {
    data: senderDetails, 
    isFetching: isFetchingSenderDetails,
    isLoading: isLoadingSenderDetails,
    refetch: refetchSenderDetails
  } = senderDetailsQuery;

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
        editable={updateSender ? true : false}
        className="mb-4"
      />

      { order?.sender?.id && (
        <OrderCheckpointPicker
          company={order.sender}
          warehouses={senderDetails?.warehouses || []}
          loading={isLoading || isFetching || isLoadingSenderDetails || isFetchingSenderDetails}
          refetch={refetchSenderDetails}
          callback={updatePickupCheckpoint}
          editable={true}
          title="Seleziona punto di ritiro"
          selectedWarehouse={order?.pickupCheckpoint}
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

      <h2 className="title-5 mb-4 mt-4 uppercase text-gray-500 dark:text-gray-600">
        Informazioni di carico
      </h2>

      <section className="mb-4 p-4 bg-base-100 rounded-md">
        <PreOrderCargoType
          trades={order.trades}
          perishable={order.perishable}
          updateForm={updateForm}
          updateTrades={updateTrades}
        />
      </section>

      <section className="mb-4 p-4 bg-base-100 rounded-md">
        <OrderSubjectCompiler
          shipmentType={order.shipmentType}
          updateForm={updateForm}
        />
      </section>



    </div>
  )
}

export default OrderPickupForCarrierForm
