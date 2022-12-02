import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SafeCol from '../../globals/components/layout/SafeCol'
import WarehouseNavigation from '../components/WarehouseNavigation';
import WarehouseBasicConfiguration from '../components/WarehouseBasicConfiguration';
import WarehouseAccessConfig from '../components/WarehouseAccessConfig';
import WarehouseScopeConfig from '../components/WarehouseScopeConfig';
import WarehouseAutomationConfig from '../components/WarehouseAutomationConfig';
import WarehouseAssetConfig from '../components/WarehouseAssetConfig';
import TextEditor from '../../globals/components/dataEntry/TextEditor';
import { selectSubscribeWarehouse, changeSubscribeWarehouse, selectSelectedSubcribeWarehouse, changeSubscribeLocationWarehouse, selectSubscribeWarehousesList, addSubscribeWarehouse, changeSubscribeSelectedWarehouse, removeSubscribeWarehouse, copyPasteSubscribeWindow, updateSubscribeWindow, addSubscribeWindow } from '../slices/subscribeSlice';
import { windowOppositeTypes } from '../../customers/libs/constants';
import Button from '../../globals/components/buttons_v2/Button';
import InputBoundNumber from '../../globals/components/dataEntry_v2/InputBoundNumber';
import CheckpointTradeSelector from '../../customers/components/checkpoint/summary/CheckpointTradeSelector';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

function SubscribeWarehouseContainer() {
  const warehousesListToSubscribe = useSelector(selectSubscribeWarehousesList); 
  const selectedWarehouse = useSelector(selectSelectedSubcribeWarehouse);
  const warehouseToSubscribe = useSelector(selectSubscribeWarehouse);
  
  // Callbacks
  const dispatch = useDispatch();
  const updateForm = useCallback((data) => {
    dispatch(changeSubscribeWarehouse({ data, index: selectedWarehouse }));
  }, []);
    
  const updateFormLocation = useCallback((data) => {
    dispatch(changeSubscribeLocationWarehouse({ data }));
  }, []);

  const updateFormWindowBasic = useCallback((data) => {
    dispatch(updateSubscribeWindow(data));
  }, []);

  const updateFormWindowDates = useCallback((data) => {
    dispatch(updateSubscribeWindow(data));
  }, []);

  const {
    name,
    type,
    location,
    specialization,
    maxLength,
    windows,
    scope,
    tools,
    automationLevel,
    trades,
    cargoBay,
    containerUnloading,
    note
  } = warehouseToSubscribe;

  return (
    <SafeCol id="CustomerRegistryFields">
      <WarehouseNavigation
        warehouses={warehousesListToSubscribe}
        addWarehouse={() => dispatch(addSubscribeWarehouse())}
        changeSelected={(index) => dispatch(changeSubscribeSelectedWarehouse(index))}
        removeWarehouse={(index) => dispatch(removeSubscribeWarehouse(index))}
        selectedWarehouse={selectedWarehouse}
      />


      <div className='grid grid-cols-1 lg:grid-cols-3 mr-3 gap-4 md:gap-8 mb-6'>
        <section className='col-span-1'>
          <WarehouseBasicConfiguration
            name={name}
            location={location}
            type={type}
            specialization={specialization}
            updateForm={updateForm}
            updateFormLocation={updateFormLocation}
          />
        </section>

        <section className='col-span-1'>
          <h2 className='title-3 mb-2'>Proprietà di accesso</h2>
          <WarehouseAccessConfig
            maxLength={maxLength}
            windows={windows}
            callback={updateForm}
            copyPaste={windowType => dispatch(copyPasteSubscribeWindow(windowOppositeTypes[windowType] ))}
            addWindow={(windowType) => dispatch(addSubscribeWindow(windowType))}
            updateWindow={payload => payload?.type === "windows_time"
              ? updateFormWindowDates(payload)
              : updateFormWindowBasic(payload)}
          />
        </section>

        <section className='col-span-1'>
          <h2 className='title-3 mb-2'>Caratteristiche deposito</h2>

          <WarehouseScopeConfig
            scope={scope}
            changeScope={(value) => updateForm({ name: "scope", value })}
          />
          
          <WarehouseAutomationConfig
            automationLevel={automationLevel}
            changeAutomationLevel={(value) => updateForm({ name: "automationLevel", value })}
          />

          <WarehouseAssetConfig
            tools={tools}
            changeTools={(value) => updateForm({ name: "tools", value })}
          />

          <h4 className="title-3 mt-8">Dettagli punto di interesse</h4>
          <CheckpointTradeSelector
            selectedTrades={trades || []}
            label="Ambito di utilizzo"
            setSelectedTrades={(trade) => updateForm({ name: "trades", value: trades?.includes(trade)
              ? trades.filter(t => t !== trade)
              : trades.concat(trade) })
            }
          />

          <InputBoundNumber
            label="Numero baie di carico"
            error="Valore non ammesso"
            inputValue={cargoBay}
            showZero={true}
            onChange={value => updateForm({ name: "cargoBay", value })}
            min={0}
            max={99}
          />

          <Button
            icon={containerUnloading ? <FiCheckSquare className='mr-2 opacity-100 text-primary-200 dark:text-primary-300' /> : <FiSquare className='mr-2' />}
            text={<div className='flex items-center text-left'>Disponibilità scarico container</div>}
            className={`
              text-lg flex items-center pl-0 py-0 mt-8
              ${ containerUnloading ? 'opacity-100' : 'opacity-70 hover:opacity-100 transition-opacity duration-200'}
            `}
            onClick={() => updateForm({ name: "containerUnloading", value: !containerUnloading })}
          />

          <div className="my-4">
            <TextEditor
              content={note}
              onSaveTextEditor={(content) => updateForm({ name: "note", value: content })} 
              label="Note punto di interesse"
              actionButtonPosition="INTERNAL"
              showList={true}
              controlled={true}
            />
          </div>
        </section>
      </div>
    </SafeCol>
  )
}

export default SubscribeWarehouseContainer;
