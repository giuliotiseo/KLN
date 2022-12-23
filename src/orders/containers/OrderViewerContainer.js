import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useOrderByIdQuery } from '../api/orders-api-slice';
import useDeleteOrder from '../hooks/useDeleteOrder';
// Components
import Button from '../../globals/components/buttons_v2/Button';
import DeleteOrderDialog from '../components/viewer/DeleteOrderDialog';
import PageSpinner from '../../globals/components/layout/PageSpinner';
import LinkButton from '../../globals/components/buttons_v2/LinkButton';
import OrderViewerContent from '../components/viewer/OrderViewerContent';
import OrderViewerBasicData from '../components/viewer/OrderViewerBasicData';
import { FiCheck, FiTerminal } from 'react-icons/fi';
import { BiReset } from 'react-icons/bi';
// Actions
import { selectCurrentCompany } from '../../company/slices/companySlice';
// Helpers
import { toast } from 'react-toastify';
import { companyRolePermissions } from '../libs/helpers';
import AttachmentsList from '../components/viewer/AttachmentsList';

function OrderViewerContainer() {
  const [ deleteDialog, setDeleteDialog ] = useState(false);
  const [ attachments, showAttachments ] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { data: order, isLoading, isFetching } = useOrderByIdQuery({ id });
  const [ deleteOrder, { isLoading: isDeleting }] = useDeleteOrder();
  const { id: currentCompanyId } = useSelector(selectCurrentCompany);
  const { currentCompanyRole, isAllowedToDelete } = companyRolePermissions(order, currentCompanyId);

  /*
    * Callbacks 
  */
  const handleDeleteOrder = useCallback(async () => {
    if(isAllowedToDelete) {
      try {
        await deleteOrder(order);
      } catch(err) {
        console.error(err);
      }
    } else {
      if(currentCompanyRole === "SENDER") {
        toast.error(`Non puoi eliminare un ordine già ritirato. Richiedi l'archiviazione dell'ordine a ${order.carrierName}`);
      }

      if(currentCompanyRole === "CARRIER") {
        toast.error(`Aggiorna lo stato dell'ordine ad "Archiviato" prima di avviare la procedura di eliminazione`);
      }
    }
  }, [currentCompanyRole, order]); 

  const dialogDeleteButtons = [{ text: "Conferma", disabled: isDeleting, onClick: handleDeleteOrder }];
  if(!order || isLoading || isFetching) return <PageSpinner message="Ricerca ordine in corso" />

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        <aside className="relative rounded-lg flex-1 my-2 overflow-hidden">
          <OrderViewerBasicData
            order={order}
            currentCompanyRole={currentCompanyRole}
          />
        </aside>

        {/* Content */}
        <section className="relative flex-1 bg-base-200">
          <OrderViewerContent
            order={order}
            showAttachments={showAttachments}
          />
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Dettagli ordine</span>
        </h5>

        <div className="flex items-center gap-2">
          { isAllowedToDelete && (
            <Button
              className="btn-primary-outline  ml-auto"
              icon={<BiReset />}
              text="Elimina"
              onClick={() => setDeleteDialog(true)}
            />
          )}

          <LinkButton
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text="Modifica"
            to={`/orders/edit?id=${id}`}
          />
        </div>
      </footer>
      
      {/* Fixed window for attachments */}
      <div className={`fixed right-6 bottom-10 transition-all ${attachments ? "pointer-events-all" : "pointer-events-none"}`}>
        <div
          className={`mb-2 z-50 backdrop-blur-lg bg-base-100/30 w-[400px] h-[350px] shadow-xl rounded-md border border-zinc-300 
          ${attachments ? "pointer-events-all opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <AttachmentsList
            docs={order.docs}
            showAttachments={showAttachments}
            indexAttachment={attachments ? attachments - 1 : null}
            remote={true}
          />
        </div>
      </div>

      <DeleteOrderDialog
        open={deleteDialog}
        close={() => setDeleteDialog(false)}
        topMessage="Perderai tutti i dati di questo ordine"
        buttons={dialogDeleteButtons}
        order={order}
        loading={isDeleting}
      />
    </div>
  )
}

export default OrderViewerContainer
