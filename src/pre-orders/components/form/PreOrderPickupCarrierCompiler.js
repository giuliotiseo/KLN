import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Components
import SafeCol from '../../../globals/components/layout/SafeCol';
import PreOrderSenderPicker from './PreOrderSenderPicker';
import PreOrderCheckpointPicker from './PreOrderCheckpointPicker';
import PreOrderRangeDatePicker from './PreOrderRangeDatePicker';
import Select from '../../../globals/components/dataEntry_v2/Select';
import { GrStatusGoodSmall } from "react-icons/gr";
// Actions
import { changeCustomersListLimit, changeCustomersListName, resetCustomersList } from '../../../customers/slices/customersListSlice';
import { PREORDER_STATUS_DESCRIPTION } from '../../libs/constants';
import { globalStatusColorsText } from '../../../globals/libs/helpers';
import StatusPicker from '../../../globals/components/pickers/StatusPicker';

function PreOrderPickupCarrierCompiler({
  preOrder,
  customersList,
  customerQuery,
  updateForm,
  updateSender,
  updateCheckpoint,
}) {
  const { sender, checkpoint, pickupDateStart, pickupDateEnd } = preOrder;
  const [{ items: customers, isLoading, isFetching, refetch }, pagination ] = customersList;
  const {
    data: selectedCustomer, 
    isLoading: isLoadingCustomer,
    isFetching: isFetchingCustomer,
    refetch: refetchCustomer
  } = customerQuery;
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCustomersListLimit(1000));
    return () => dispatch(resetCustomersList());
  }, []);

  return (
    <SafeCol id="PreOrderPickupCarrierCompiler">
      <div className='my-2 mr-2'>
        <h2 className="title-5 mb-4 uppercase text-gray-500 dark:text-gray-600">
          Info in tempo reale
        </h2>
        <section className="mb-4 p-4 bg-base-100 rounded-md">
          <StatusPicker
            id="status"
            element={preOrder}
            callback={updateForm}
            label="Stato pre-ordine"
            optionsObj={PREORDER_STATUS_DESCRIPTION}
          />
        </section>
              
        <h2 className="title-5 mb-4 uppercase text-gray-500 dark:text-gray-600">
          Informazioni di ritiro
        </h2>

        <section className="mb-4 p-4 bg-base-100 rounded-md">
          <PreOrderSenderPicker
            customers={customers}
            listType={"ALL"}
            loading={isLoading || isFetching}
            refetch={refetch}
            pagination={pagination}
            callback={updateSender}
            searchCompany={(value) => dispatch(changeCustomersListName(value))}
            selectedCustomer={sender}
            editable={updateSender ? true : false}
          />
        </section>

        { sender?.id && (
          <section className="mb-4 p-4 bg-base-100 rounded-md">
            <PreOrderCheckpointPicker
              company={selectedCustomer}
              warehouses={selectedCustomer?.warehouses || []}
              loading={isLoading || isFetching || isLoadingCustomer || isFetchingCustomer}
              refetch={refetchCustomer}
              callback={updateCheckpoint}
              editable={true}
              title="Seleziona punto di interesse"
              selectedWarehouse={checkpoint}
            />
          </section>
        )}

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

export default PreOrderPickupCarrierCompiler
