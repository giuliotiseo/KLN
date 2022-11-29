import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useListCustomers from '../../customers/hooks/useListCustomers';
import useListWarehouses from '../../warehouses/hooks/useListWarehouses';
import useCreatePreOrder from '../hooks/useCreatePreOrder';
import Button from '../../globals/components/buttons_v2/Button';
import PreOrderPickupSenderCompiler from '../components/form/PreOrderPickupSenderCompiler';
import PreOrderDetailsCompiler from '../components/form/PreOrderDetailsCompiler';
import { FiCheck, FiTerminal } from 'react-icons/fi';
import { BiReset } from 'react-icons/bi';
// Actions
import { changePreOrderCreatorForm, selectPreOrderCreator, resetPreOrderCreator, changePreOrderCreatorCarrier, changePreOrderCreatorCheckpoint, changePreOrderCreatorTrades, removePreOrderCreatorFile } from '../slices/preOrderCreatorSlice';
import { selectCurrentCompany } from '../../company/slices/companySlice';
import { addFileToPreOrderCreatorThunk } from '../api/pre-orders-thunks';

function PreOrderCreatorSenderContainer() {
  const preOrder = useSelector(selectPreOrderCreator);
  const currentCompany = useSelector(selectCurrentCompany);
  const customersList = useListCustomers("CARRIER");
  const warehousesList = useListWarehouses("ALL");
  const [ createPreOrder, { isLoading, validationError }] = useCreatePreOrder();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  /*
    * Callbacks 
  */
  const updateForm = useCallback((payload) => {
    dispatch(changePreOrderCreatorForm(payload));
  }, [preOrder]);
  
  const updateCarrier = useCallback((value) => {
    dispatch(changePreOrderCreatorCarrier(value));
  }, [preOrder.carrier]);
  
  const updateCheckpoint = useCallback((value) => {
    dispatch(changePreOrderCreatorCheckpoint(value));
  }, [preOrder.checkpoint]);

  const updateTrades = useCallback((value) => {
    dispatch(changePreOrderCreatorTrades(value))
  }, [preOrder.trades]);

  const addFile = useCallback((file) => {
    dispatch(addFileToPreOrderCreatorThunk(file))
  }, [preOrder.files]);

  const removeFile = useCallback((indexToRemove) => {
    if(preOrder?.files?.length > 0) {
      dispatch(removePreOrderCreatorFile({ indexToRemove })) 
    }
  }, [preOrder.files]);

  const handleCreatePreOrder = useCallback(() => {
    createPreOrder({ ...preOrder, sender: currentCompany });
  }, [preOrder, currentCompany])

  const reset = useCallback(() => {
    dispatch(resetPreOrderCreator());
  }, [preOrder]);

  /*
    * Reset effect 
  */

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex gap-2 flex-col md:flex-row h-full">
        <aside className="relative rounded-lg flex-1 my-2 overflow-hidden">
          <PreOrderPickupSenderCompiler
            preOrder={preOrder}
            customersList={customersList}
            warehousesList={warehousesList}
            validationError={validationError}
            updateForm={updateForm}
            updateCarrier={updateCarrier}
            updateCheckpoint={updateCheckpoint}
          />
        </aside>

        {/* Content */}
        <section className="relative flex-1 lg:flex-2 bg-base-200">
          <PreOrderDetailsCompiler
            preOrder={preOrder}
            validationError={validationError}
            updateForm={updateForm}
            updateTrades={updateTrades}
            addFile={addFile}
            removeFile={removeFile}
          />
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Compilazione pre-ordine</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={reset}
          />

          <Button
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text={pathname.includes("carrier") ? `Registra pre-ordine` : `Invia pre-ordine` }
            loading={isLoading}
            onClick={handleCreatePreOrder}
          />
        </div>
      </footer>
    </div>
  )
}

export default PreOrderCreatorSenderContainer
