import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { resetCustomersList } from '../../../slices/customersListSlice';
import useListWarehouses from '../../../../warehouses/hooks/useListWarehouses';
import WarehousePicker from '../../../../globals/components/pickers/WarehousePicker';

function CheckpointThirdCompanyWarehouseSelector({
  checkpoint,
  dispatch
}) {
  const [{
    items: warehouses,
    isLoading,
    isFetching,
    refetch
  }, pagination ] = useListWarehouses("ALL", checkpoint.thirdCompany.id);

  const dispatchStore = useDispatch();

  const handleSelectWarehouse = useCallback((value) => {
    if(checkpoint?.warehousesId === value.id) {
      dispatch({ type: "import_warehouse", value: null })
    } else {
      dispatch({ type: "import_warehouse", value })
    }
  }, [checkpoint]);

  useEffect(() => {
    dispatch({ type: "import_warehouse", value: null });
  }, [checkpoint.thirdCompany.id])

  useEffect(() => {
    return () => dispatchStore(resetCustomersList());
  }, []);

  return (
    <section className='my-4 py-4 border-b border-t border-light-50 dark:border-dark-50'>
      <h4 className="title-4">Selezione punto di interesse</h4>
      { checkpoint?.thirdCompany?.id && (
        <div className='mt-4'>
          <WarehousePicker
            warehouses={warehouses}
            loading={isLoading || isFetching}
            pagination={pagination}
            selectedWarehouse={{...checkpoint, id: checkpoint.warehouseId }}
            callback={handleSelectWarehouse}
            refetch={refetch}
            editable={true}
          />
        </div>
      )}
    </section>
  )
}

export default CheckpointThirdCompanyWarehouseSelector
