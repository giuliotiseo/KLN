import { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeCustomersListLimit, resetCustomersList } from '../../../customers/slices/customersListSlice';
import InputCheckbox from '../../../globals/components/dataEntry_v2/InputCheckbox';
import OrderCheckpointPicker from './OrderCheckpointPicker';
import OrderCompanyPicker from './OrderCompanyPicker';
import OrderRangeDatePicker from './OrderRangeDatePicker';

function OrderDepotForSenderCompiler({
  order,
  customersQuery,
  customerDetailsQuery,
  setCarrierSearchable,
  updateCarrier,
  updateDepotCheckpoint,
  updateForm = (value) => console.log('Default callback in OrderDepotForSenderCompiler', value),
}) {
  const [ checkpointCompiler, setCheckpointCompiler ] = useState(false);
  const [{ items: customers, isLoading, isFetching, refetch }, pagination ] = customersQuery;
  const {
    data: carrierDetails, 
    isFetching: isFetchingCarrierDetails,
    isLoading: isLoadingCarrierDetails,
    refetch: refetchCarrierDetails
  } = customerDetailsQuery;

  const dispatch = useDispatch();

  const handleCheckpointCompilerVisibility = useCallback(() => {
    updateDepotCheckpoint(null);
    setCheckpointCompiler(prev => !prev);
  }, []);

  useEffect(() => {
    dispatch(changeCustomersListLimit(1000));
    return () => dispatch(resetCustomersList());
  }, []);

  return (
    <div className='my-2 mr-2'>       
      <h2 className="title-5 mb-4 uppercase text-gray-500 dark:text-gray-600">
        2. Informazioni vettore
      </h2>

      <div className='w-full bg-base-100 mt-2 mr-4 mb-4 rounded-md'>
        <OrderCompanyPicker
          customers={customers}
          summaryTitle="Vettore selezionato"
          pickerTitle="Seleziona il vettore"
          listType={"ALL"}
          loading={isLoading || isFetching}
          refetch={refetch}
          pagination={pagination}
          callback={updateCarrier}
          searchCompany={(value) => setCarrierSearchable(value)}
          selectedCustomer={order?.carrier}
          editable={order?.selectedPreOrder ? false : true}
        />
      </div>

      { order?.carrier?.id && order?.shipmentType === "GROUPAGE" && (
        <InputCheckbox
          value={checkpointCompiler}
          label={'Imposta info scarico vettore'}
          id={'checkpointCompiler'}
          checked={checkpointCompiler}
          name="roleIds"
          className='m-2'
          callback={handleCheckpointCompilerVisibility}
        />
      )}

      { order?.carrier?.id && order?.shipmentType === "GROUPAGE" && checkpointCompiler && (
        <div className='w-full bg-base-100 mt-2 mr-4 mb-4 rounded-md'>
          <OrderCheckpointPicker
            company={order.carrier}
            warehouses={carrierDetails?.warehouses || []}
            loading={isLoading || isFetching || isLoadingCarrierDetails || isFetchingCarrierDetails}
            refetch={refetchCarrierDetails}
            callback={updateDepotCheckpoint}
            editable={true}
            title="Seleziona punto di scarico vettore"
            selectedWarehouse={order?.depotCheckpoint}
          />
        </div>
      )}

      { order?.depotCheckpoint?.extId && <section className="mb-4 bg-base-100 rounded-md">
        <OrderRangeDatePicker
          checkpoint={order.depotCheckpoint}
          dateStartValue={order?.depotDateStart}
          dateStartName={"depotDateStart"}
          dateEndValue={order?.depotDateEnd}
          dateEndName={"depotDateEnd"}
          updateForm={updateForm}
          windowTypeToCheck="SCARICO"
          windowsToShow={["SCARICO"]}
          title = "Data e orario scarico vettore"
        />
      </section> }
    </div>
  )
}

export default OrderDepotForSenderCompiler
