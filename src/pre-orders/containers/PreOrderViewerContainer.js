import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { usePreOrderByIdQuery } from '../api/pre-orders-api-slice';
import useDeletePreOrder from '../hooks/useDeletePreOrder';
// Components
import SimpleMap from '../../globals/components/layout/SimpleMap';
import PreOrderViewerContent from '../components/viewer/PreOrderViewerContent';
import Button from '../../globals/components/buttons_v2/Button';
import DeletePreOrderDialog from '../components/viewer/DeletePreOrderDialog';
import PageSpinner from '../../globals/components/layout/PageSpinner';
import LinkButton from '../../globals/components/buttons_v2/LinkButton';
import { FiCheck, FiTerminal } from 'react-icons/fi';
import { BiReset } from 'react-icons/bi';
// Actions
import { selectCurrentCompany } from '../../company/slices/companySlice';
import { toast } from 'react-toastify';
import { isAllowedToDeletePreOrder, isAllowedToEditPreOrder } from '../libs/helpers';

function PreOrderViewerContainer() {
  const [ deleteDialog, setDeleteDialog ] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { data: preOrder, isLoading, isFetching } = usePreOrderByIdQuery({ id });
  const [ deletePreOrder, { isLoading: isDeleting }] = useDeletePreOrder();
  const currentCompany = useSelector(selectCurrentCompany);
  const currentRole = currentCompany.id === preOrder?.carrierId ? 'CARRIER' : 'SENDER';
  const isAllowedToDelete = isAllowedToDeletePreOrder(preOrder, currentCompany);
  const isAllowedToEdit = isAllowedToEditPreOrder(preOrder, currentCompany);

  /*
    * Callbacks 
  */
  const handleDeletePreOrder = useCallback(async () => {
    if(isAllowedToDelete) {
      try {
        await deletePreOrder(preOrder);
      } catch(err) {
        console.error(err);
      }
    } else {
      toast.error(`Non puoi eliminare un pre-ordine accettato. Richiedi la modifica dello stato a ${preOrder.carrierName}`);
    }
  }, [isAllowedToDelete, preOrder]); 

  const dialogDeleteButtons = [{ text: "Conferma", disabled: isDeleting, onClick: handleDeletePreOrder }];
  if(!preOrder || isLoading || isFetching) return <PageSpinner message="Ricerca pre-ordine in corso" />

  return (
    <div className="flex flex-col h-full w-full">      
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <aside className="relative rounded-lg flex-1 my-2 overflow-hidden">
          <SimpleMap
            lat={preOrder?.checkpoint?.location?.coordinate?.[0]}
            lng={preOrder?.checkpoint?.location?.coordinate?.[1]}
            onClick={() => console.log("Nessuna operazione consentita")}
          />
        </aside>

        {/* Content */}
        <section className="relative flex-1 lg:flex-2 bg-base-200">
          <PreOrderViewerContent
            preOrder={preOrder}
            currentRole={currentRole}
          />
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Dettagli pre-ordine</span>
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

          { isAllowedToEdit && (
            <LinkButton
              className="btn-primary ml-auto"
              icon={<FiCheck />}
              text="Modifica"
              to={`/pre-orders/edit?id=${id}`}
            />
          )}
        </div>
      </footer>

      <DeletePreOrderDialog
        open={deleteDialog}
        close={() => setDeleteDialog(false)}
        topMessage="Perderai tutti i dati di questo pre-ordine"
        buttons={dialogDeleteButtons}
        preOrder={preOrder}
        loading={isDeleting}
      />
    </div>
  )
}

export default PreOrderViewerContainer
