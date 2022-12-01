import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCustomerByCompanyIdQuery } from '../../customers/api/customers-api-slice';
import useUpdatePreOrder from '../hooks/useUpdatePreOrder';
import useListCustomers from '../../customers/hooks/useListCustomers';
import useListWarehouses from '../../warehouses/hooks/useListWarehouses';
// Components
import Button from '../../globals/components/buttons_v2/Button';
import PreOrderPickupCarrierCompiler from '../components/form/PreOrderPickupCarrierCompiler';
import PreOrderDetailsCompiler from '../components/form/PreOrderDetailsCompiler';
import PreOrderPickupSenderCompiler from '../components/form/PreOrderPickupSenderCompiler';
import { FiCheck, FiTerminal } from 'react-icons/fi';
import { BiReset } from 'react-icons/bi';
// Actions
import { changePreOrderEditorCarrier, changePreOrderEditorCheckpoint, changePreOrderEditorForm, changePreOrderEditorSender, removePreOrderEditorFile, resetPreOrderEditor, restorePreOrderEditorFile } from '../slices/preOrderEditorSlice';
import { selectCurrentCompany } from '../../company/slices/companySlice';
import { addFileToPreOrderEditorThunk } from '../api/pre-orders-thunks';
import { isAllowedToEditPreOrder } from '../libs/helpers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function PreOrderEditorContainer({ preOrder, oppositeCompanyRole, currentCompanyRole, }) {
  const currentCompany = useSelector(selectCurrentCompany);
  const customersList = useListCustomers(oppositeCompanyRole.toUpperCase());
  const warehousesList = useListWarehouses("ALL");
  const navigate = useNavigate();
  const customerQuery = useCustomerByCompanyIdQuery(
    preOrder?.[oppositeCompanyRole]?.companyId || preOrder?.[oppositeCompanyRole]?.id 
    ? { ownerCompanyId: preOrder?.[oppositeCompanyRole]?.companyId || preOrder.sender.id } 
    : null
  );

  const [ updatePreOrder, { isLoading, validationError }] = useUpdatePreOrder(preOrder);
  const dispatch = useDispatch();

  /*
    * Callbacks 
  */
  const updateForm = useCallback((payload) => {
    dispatch(changePreOrderEditorForm(payload));
  }, [dispatch]);

  const updateSender = useCallback((value) => {
    dispatch(changePreOrderEditorSender(value));
  }, [dispatch])

  const updateCarrier = useCallback((value) => {
    dispatch(changePreOrderEditorCarrier(value));
  }, [dispatch])

  const updateCheckpoint = useCallback((value) => {
    dispatch(changePreOrderEditorCheckpoint({
      checkpoint: value || null,
      sender: preOrder.sender
    }))
  }, [dispatch])

  const updateTrades = useCallback((value) => {
    updateForm({
      name: "trades",
      value: preOrder?.trades?.includes(value)
        ? preOrder.trades.filter(trade => trade !== value)
        : preOrder.trades.concat(value)
    })
  }, [preOrder.trades]);

  const addFile = useCallback((file) => {
    dispatch(addFileToPreOrderEditorThunk({
      files: preOrder.files,
      file,
    }))
  }, [preOrder.files]);

  const removeFile = useCallback((indexToRemove) => {
    if(preOrder?.files?.length > 0) {
      dispatch(removePreOrderEditorFile({
        files: preOrder.files,
        indexToRemove
      })) 
    }
  }, [preOrder.files]);

  const restoreFile = useCallback((indexToRestore) => {
    if(preOrder?.files?.length > 0) {
      dispatch(restorePreOrderEditorFile({
        files: preOrder.files,
        indexToRestore
      })) 
    }
  }, [preOrder.files]);


  const reset = useCallback(() => {
    dispatch(resetPreOrderEditor());
  }, [preOrder]);
  

  /*
    * Reset effect 
  */
  useEffect(() => {
    if(preOrder && currentCompany) {
      const isAllowedToEdit = isAllowedToEditPreOrder(preOrder, currentCompany);
      if(!isAllowedToEdit) {
        toast.error('Siamo spiacenti ma non hai il permesso di accedere al pre-ordine');
        navigate('/pre-orders');
      }
    }
  }, [preOrder, currentCompany]);


  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex gap-2 flex-col md:flex-row h-full">
        <aside className="relative rounded-lg flex-1 my-2 overflow-hidden">
          { currentCompanyRole === "carrier" && (
            <PreOrderPickupCarrierCompiler
              preOrder={preOrder}
              customersList={customersList}
              customerQuery={customerQuery}
              validationError={validationError}
              updateForm={updateForm}
              updateSender={(currentCompany.id === preOrder.carrierId) && updateSender}
              updateCheckpoint={updateCheckpoint}
            />
          )}

          { currentCompanyRole === "sender" && (
            <PreOrderPickupSenderCompiler
              preOrder={preOrder}
              customersList={customersList}
              warehousesList={warehousesList}
              validationError={validationError}
              updateForm={updateForm}
              updateCarrier={updateCarrier}
              updateCheckpoint={updateCheckpoint}
              editable={(preOrder?.status === "PENDING" || preOrder?.status === "REJECTED") ? true : false}
            />
          )}
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
            restoreFile={restoreFile}
          />
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Modifica pre-ordine</span>
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
            text={"Aggiorna pre-ordine"}
            loading={isLoading}
            onClick={updatePreOrder}
          />
        </div>
      </footer>
    </div>
  )
}

export default PreOrderEditorContainer
