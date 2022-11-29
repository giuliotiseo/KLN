import OrderCompanyPicker from "./OrderCompanyPicker";
import OrderRangeDatePicker from "./OrderRangeDatePicker";
import OrderCheckpointPicker from "./OrderCheckpointPicker";

const OrderDeliveryCompiler = ({
  order,
  customersQuery,
  receiverDetailsQuery,
  setReceiverSearchable,
  updateDeliveryCheckpoint,
  updateReceiver,
  updateForm = (value) => console.log('Default callback in OrderPickupForCarrierForm', value),
}) => {
  const [{ items: customers, isLoading, isFetching, refetch }, pagination ] = customersQuery;
  const {
    data: receiverDetails, 
    isFetching: isFetchingReceiverDetails,
    isLoading: isLoadingReceiverDetails,
    refetch: refetchReceiverDetails
  } = receiverDetailsQuery;

  return (
    <section>
      <h2 className="title-5 my-4 uppercase text-gray-500 dark:text-gray-600">
        3. Informazioni destinatario
      </h2>  
      <div className='w-full bg-base-100 mt-2 mr-4 mb-4 rounded-md'>
        <OrderCompanyPicker
          customers={customers}
          summaryTitle="Destinatario selezionato"
          pickerTitle="Seleziona destinatario"
          listType={"ALL"}
          loading={isLoading || isFetching}
          refetch={refetch}
          pagination={pagination}
          callback={updateReceiver}
          searchCompany={(value) => setReceiverSearchable(value)}
          selectedCustomer={order?.receiver}
          editable={updateReceiver ? true : false}
        />
      </div>

      <div className="flex gap-4">
        { order?.receiver?.id && (
          <div className='w-full bg-base-100 rounded-md flex-1'>
            <OrderCheckpointPicker
              company={order.receiver}
              warehouses={receiverDetails?.warehouses || []}
              loading={isLoading || isFetching || isLoadingReceiverDetails || isFetchingReceiverDetails}
              refetch={refetchReceiverDetails}
              callback={updateDeliveryCheckpoint}
              editable={true}
              title="Seleziona punto di consegna"
              summaryTitle="Punto di consegna "
              selectedWarehouse={order?.deliveryCheckpoint}
            />
          </div>
        )}

        { order?.deliveryCheckpoint?.extId && <section className="bg-base-100 rounded-md flex-1">
          <OrderRangeDatePicker
            checkpoint={order.deliveryCheckpoint}
            dateStartValue={order?.deliveryDateStart}
            dateStartName={"deliveryDateStart"}
            dateEndValue={order?.deliveryDateEnd}
            dateEndName={"deliveryDateEnd"}
            updateForm={updateForm}
            pickupDateEnd={order?.deliveryDateEnd}
            windowTypeToCheck="SCARICO"
            windowsToShow={["SCARICO"]}
            title = "Data e orario di consegna"
          />
        </section> }
      </div>

    </section>
  )
}

export default OrderDeliveryCompiler;