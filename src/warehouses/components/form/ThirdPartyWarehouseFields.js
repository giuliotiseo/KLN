import { useDispatch } from 'react-redux';
import useListCustomers from '../../../customers/hooks/useListCustomers';
import useListWarehouses from '../../hooks/useListWarehouses';
import InputText from '../../../globals/components/dataEntry_v2/InputText';
import SafeCol from '../../../globals/components/layout/SafeCol';
import CustomerPicker from '../../../globals/components/pickers/CustomerPicker';
import CustomerWarehousesPicker from './CustomerWarehousesPicker';
import SelectedLinkedCompany from './SelectedLinkedCompany';
import ThirdPartyWarehouseSummary from './ThirdPartyWarehouseSummary';
import { changeWarehouseCreatorLinkedCompany, changeWarehouseCreatorLinkedWarehouse } from '../../slices/warehouseCreatorSlice';

function ThirdPartyWarehouseFields({ warehouse, updateForm }) {
  const { linkedCompany, linkedWarehouse } = warehouse;
  const [{ items: customers, isLoading, isFetching, refetch }, pagination ] = useListCustomers("ALL");
  const [{
    items: warehouses,
    isLoading: isLoadingWarehouses,
    isFetching: isFetchingWarehouse,
    refetch: refetchWarehouse
  }, paginationWarehouses ] = useListWarehouses("ALL", linkedCompany?.id);
  
  const dispatch = useDispatch();

  return (
    <div className='grid grid-cols-2 gap-4 mt-2 ml-4 h-full'>
      <section className="col-span-1 relative">
        <SafeCol>
          <div className="pr-4">
            { !linkedCompany 
              ? <CustomerPicker
                  customers={customers}
                  listType={"ALL"}
                  loading={isLoading || isFetching}
                  refetch={refetch}
                  pagination={pagination}
                  callback={(value) => dispatch(changeWarehouseCreatorLinkedCompany(value))}
                />
              : <SelectedLinkedCompany
                  linkedCompany={linkedCompany}
                  loading={isLoading || isFetching}
                  callback={() => dispatch(changeWarehouseCreatorLinkedCompany(null))}
                />
            }

            <div className="mt-4">
              { linkedCompany && (
                <CustomerWarehousesPicker
                  warehouses={warehouses}
                  loading={isLoadingWarehouses || isFetchingWarehouse}
                  refetch={refetchWarehouse}
                  pagination={paginationWarehouses}
                  callback={(value) => dispatch(changeWarehouseCreatorLinkedWarehouse(value))}
                  editable={true}
                  title="Aggancia uno dei magazzini del cliente"
                  selectedWarehouse={linkedWarehouse}
                />
              )}
            </div>
          </div>
        </SafeCol>
      </section>

      <section className="col-span-1 relative">
        { linkedCompany && linkedWarehouse && (
          <SafeCol>
            <div className="pr-4 mb-4">
              <h2 className="title-3 mb-2">Personalizza punto di interesse</h2>          
              <div className='bg-base-100 rounded-md p-4'>
                <InputText
                  id="name"
                  label="Nome personalizzato del magazzino"
                  value={warehouse.name}
                  className="w-full flex-col"
                  contentClassName="w-full"
                  inputClassName="text-left pr-6"
                  placeholder="Nome del magazzino"
                  callback={updateForm}
                />
              </div>

              <ThirdPartyWarehouseSummary
                warehouse={linkedWarehouse}
              />
            </div>
          </SafeCol>
        )}
      </section>
      
    </div>
  )
}

export default ThirdPartyWarehouseFields
