import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectCurrentCompany } from '../../../company/slices/companySlice';
import { changeCustomersListLimit, resetCustomersList } from '../../../customers/slices/customersListSlice';
import PreOrderCargoType from '../../../pre-orders/components/form/PreOrderCargoType';
import useListWarehouses from '../../../warehouses/hooks/useListWarehouses';
import OrderCheckpointPicker from './OrderCheckpointPicker';
import OrderRangeDatePicker from './OrderRangeDatePicker';
import OrderSubjectCompiler from './OrderSubjectCompiler';

function OrderPickupForSenderForm({
  order,
  updateTrades,
  updatePickupCheckpoint,
  updateForm = (value) => console.log('Default callback in OrderPickupForSenderForm', value),
}) {
  const currentCompany = useSelector(selectCurrentCompany);
  const [{
    items: warehouses, 
    isLoading: isLoadingWarehouses,
    isFetching: isFetchingWarehouses, 
    refetch: refetchWarehouses
  }] = useListWarehouses("ALL");

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

      <div className='w-full bg-base-100 mt-2 mr-4 mb-4 rounded-md'>
        <OrderCheckpointPicker
          company={currentCompany}
          warehouses={warehouses}
          loading={isLoadingWarehouses || isFetchingWarehouses}
          refetch={refetchWarehouses}
          callback={updatePickupCheckpoint}
          editable={true}
          title="Seleziona punto di ritiro"
          selectedWarehouse={order?.pickupCheckpoint}
        />
      </div>


      { order?.pickupCheckpoint?.extId && <section className="mb-4 bg-base-100 rounded-md">
        <OrderRangeDatePicker
          checkpoint={order.pickupCheckpoint}
          dateStartValue={order?.pickupDateStart}
          dateStartName={"pickupDateStart"}
          dateEndValue={order?.pickupDateEnd}
          dateEndName={"pickupDateEnd"}
          updateForm={updateForm}
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

export default OrderPickupForSenderForm
