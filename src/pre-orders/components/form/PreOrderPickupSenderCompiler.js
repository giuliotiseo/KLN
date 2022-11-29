import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import SafeCol from '../../../globals/components/layout/SafeCol';
import PreOrderCheckpointPicker from './PreOrderCheckpointPicker';
import PreOrderRangeDatePicker from './PreOrderRangeDatePicker';
import PreOrderCarrierPicker from './PreOrderCarrierPicker';
// Actions
import { changeCustomersListLimit, changeCustomersListName, resetCustomersList } from '../../../customers/slices/customersListSlice';
import { selectCurrentCompany } from '../../../company/slices/companySlice';
// Helpers

function PreOrderPickupSenderCompiler({
  preOrder,
  customersList,
  warehousesList,
  updateForm,
  updateCarrier,
  updateCheckpoint,
  editable = true,
}) {
  const currentCompany = useSelector(selectCurrentCompany);
  const { carrier, checkpoint, pickupDateStart, pickupDateEnd } = preOrder;
  const [{ items: customers, isLoading, isFetching, refetch }, pagination ] = customersList;
  const [{
    items: warehouses,
    isLoading: isLoadingWarehouses,
    isFetching: isFetchingWarehouses,
    refetch: refetchWarehouses
  }] = warehousesList;
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCustomersListLimit(1000));
    return () => dispatch(resetCustomersList());
  }, []);

  return (
    <SafeCol id="PreOrderPickupSenderCompiler">
      <div className='my-2 mr-2'>
        <h2 className="title-5 mb-4 uppercase text-gray-500 dark:text-gray-600">
          Informazioni di ritiro
        </h2>

        <section className="mb-4 bg-base-100 rounded-md">
          <PreOrderCarrierPicker
            customers={customers}
            listType={"CARRIER"}
            loading={isLoading || isFetching}
            refetch={refetch}
            pagination={pagination}
            callback={updateCarrier}
            editable={editable}
            searchCompany={(value) => dispatch(changeCustomersListName(value))}
            selectedCustomer={carrier}
          />
        </section>

        <section className="mb-4 p-4 bg-base-100 rounded-md">
          <PreOrderCheckpointPicker
            company={currentCompany}
            warehouses={warehouses || []}
            loading={isLoading || isFetching || isLoadingWarehouses || isFetchingWarehouses}
            refetch={refetchWarehouses}
            callback={updateCheckpoint}
            editable={true}
            title="Seleziona punto di interesse"
            selectedWarehouse={checkpoint}
          />
        </section>

        
        { checkpoint?.extId && <section className="mb-4 p-4 bg-base-100 rounded-md">
          <PreOrderRangeDatePicker
            checkpoint={checkpoint}
            pickupDateStart={pickupDateStart}
            pickupDateEnd={pickupDateEnd}
            updateForm={updateForm}
          />
        </section> }

      </div>
    </SafeCol>
  )
}

export default PreOrderPickupSenderCompiler
