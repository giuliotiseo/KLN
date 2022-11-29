import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OrderRangeDatePicker from '../form/OrderRangeDatePicker'
import OrderCompanyPicker from '../form/OrderCompanyPicker'
import OrderCheckpointPicker from '../form/OrderCheckpointPicker'
import { changeCustomersListLimit, resetCustomersList } from '../../../customers/slices/customersListSlice';

// Main component ----------------------------------------------------------------------------------------------------------------
const OrderEditorCarrier = ({
  order,
  carriersQuery,
  warehousesQuery,
  updateCarrier,
  setCarrierSearchable,
  carrierDetailsQuery,
  updateDepotCheckpoint,
  companyType,
  updateForm,
  editable
}) => {
  // Tutti i clienti vettori
  const [{ items: customers, isLoading, isFetching, refetch }, pagination] = carriersQuery;
  // I dettagli del vettore estratto dalla lista clienti
  const { data: carrierCustomerDetails,  isFetching: isFetchingCarrierCustomerDetails, isLoading: isLoadingCarrierCustomerDetails, refetch: refetchCarrierCustomerDetails } = carrierDetailsQuery;
  // Tutti i magazzini gestiti
  const [{ items: carrierWarehouses, isLoading: isLoadingCarrier, isFetching: isFetchingCarrier, refetch: refetchWarehousesFromCarrier }] = warehousesQuery;
  // Elemeni globali del component
  let warehouses, refetchWarehouses, loadingWarehouses = null;
  // Associazione elementi globali componente sulla base del ruolo dell'azienda
  if(companyType === "CARRIER") {
    warehouses = carrierWarehouses;
    loadingWarehouses = isLoadingCarrier || isFetchingCarrier;
    refetchWarehouses = refetchWarehousesFromCarrier;
  } else {
    loadingWarehouses = isFetchingCarrierCustomerDetails || isLoadingCarrierCustomerDetails;
    refetchWarehouses = refetchCarrierCustomerDetails;
    if(carrierCustomerDetails) {
      warehouses = carrierCustomerDetails.warehouses;
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
    <section>
      <h2 className="title-5 my-4 uppercase text-gray-500 dark:text-gray-600">
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
          searchCompany={setCarrierSearchable}
          selectedCustomer={order?.carrier}
          editable={editable && updateCarrier ? true : false}
          className="mb-4"
        />
      </div>

      <div className="flex gap-4">
        { order?.carrier?.id && (
          <div className='w-full bg-base-100 rounded-md flex-1'>
            <OrderCheckpointPicker
              company={order.carrier}
              warehouses={warehouses}
              loading={isLoading}
              refetch={refetchWarehouses}
              callback={updateDepotCheckpoint}
              editable={true}
              selectedWarehouse={order?.depotCheckpoint}
              title="Seleziona punto di scarico vettore"
              summaryTitle="Scarico vettore selezionato"
            />
          </div>
        )}

        { order?.depotCheckpoint?.extId && <section className="bg-base-100 rounded-md flex-1">
          <OrderRangeDatePicker
            checkpoint={order.depotCheckpoint}
            dateStartValue={order?.depotDateStart}
            dateStartName={"depotDateStart"}
            dateEndValue={order?.depotDateEnd}
            dateEndName={"depotDateEnd"}
            updateForm={updateForm}
            windowsToShow={["SCARICO"]}
            windowTypeToCheck="SCARICO"
            title = "Data e orario scarico vettore"
          />
        </section> }
      </div>
    </section>
  )
}

export default OrderEditorCarrier;
