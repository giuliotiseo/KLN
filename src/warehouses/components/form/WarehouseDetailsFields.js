import useListEmployees from '../../../contacts/hooks/useListEmployees';
import SafeCol from '../../../globals/components/layout/SafeCol';
import Scrollbar from '../../../globals/components/layout/Scrollbar';
import Spinner from '../../../globals/components/layout/Spinner';
import WarehouseBasicConfiguration from './WarehouseBasicConfiguration';
import WarehouseAccessConfig from './WarehouseAccessConfig';
import ContactsPicker from '../../../contacts/components/form/ContactsPicker';
import WarehouseScopeConfig from '../../../subscribe/components/WarehouseScopeConfig';
import WarehouseAssetConfig from '../../../subscribe/components/WarehouseAssetConfig';
import WarehouseAutomationConfig from '../../../subscribe/components/WarehouseAutomationConfig';
import TextEditor from '../../../globals/components/dataEntry_v2/TextEditor';

const WarehouseDetailsFields = ({
  warehouse,
  validationError,
  copyPaste,
  addWindow,
  updateForm,
  updateLocation,
  updateWindow,
  removeWindow = null,
  updateWarehouseContacts
}) => {
  const [{ items: storekeepers, isLoading, isFetching, refetch }, pagination ] = useListEmployees("WAREHOUSE");
  const loadingStorekeepers = isLoading || isFetching;

  if(!warehouse || Object.keys(warehouse).length <= 0) return <div className='flex w-full h-full items-center justify-center'>
    <Spinner />
  </div>

  return (
    <SafeCol id="WarehouseDetailsFields">
      <div className='my-2 ml-2 mr-4'>
        <section className="mb-4 p-4 bg-base-100 rounded-md">
          <WarehouseBasicConfiguration
            name={warehouse.name}
            location={warehouse.location}
            type={warehouse.type}
            specialization={warehouse.specialization}
            status={warehouse.status}
            updateForm={updateForm}
            validationError={validationError}
            updateFormLocation={updateLocation}
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 p-4 bg-base-100 rounded-md">
            <h3 className='title-3'>Proprietà di accesso</h3>
            <WarehouseAccessConfig
              maxLength={warehouse.maxLength}
              windows={warehouse.windows}
              callback={updateForm}
              copyPaste={windowType => copyPaste(windowType)}
              addWindow={(windowType) => addWindow(windowType)}
              removeWindow={removeWindow}
              updateWindow={updateWindow}
            />
          </div>
          
          <div className="col-span-1">
            <div className='p-4 bg-base-100 rounded-md'>
              <h2 className='title-3 mb-2'>Caratteristiche deposito</h2>

              <WarehouseScopeConfig
                scope={warehouse.scope}
                changeScope={(value) => updateForm({ name: "scope", value })}
              />
              
              <WarehouseAutomationConfig
                automationLevel={warehouse.automationLevel}
                changeAutomationLevel={(value) => updateForm({ name: "automationLevel", value })}
              />

              <WarehouseAssetConfig
                tools={warehouse.tools}
                changeTools={(value) => updateForm({ name: "tools", value })}
              />

              <div className="my-4">
                <TextEditor
                  content={warehouse.note}
                  onSaveTextEditor={(content) => updateForm({ name: "note", value: content })} 
                  label="Note punto di interesse"
                  actionButtonPosition="INTERNAL"
                  showList={true}
                  controlled={true}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="p-4 rounded-md">
          <h3 className='title-3'>Associa un referente</h3>
          <div className='relative h-full'>
            <Scrollbar>
              <div className="mt-4">
                <p className="label whitespace-normal">
                  Magazzinieri presenti in rubrica
                </p>
                <div className="bg-base-100 px-4 pt-1 pb-3 rounded-md">
                  <ContactsPicker
                    title={null}
                    storekeepers={storekeepers}
                    refreshList={refetch}
                    isLoading={loadingStorekeepers}
                    pagination={pagination}
                    className="mt-2"
                    initialContactIds={warehouse?.contactIds || []}
                    callback={({ value }) => updateWarehouseContacts(value)}
                  />
                </div>
              </div>
            </Scrollbar>
          </div>
        </section>
      </div>
    </SafeCol>
  )
}

export default WarehouseDetailsFields
