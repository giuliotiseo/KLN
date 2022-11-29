import { useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCustomerByIdQuery, useDeleteCustomerMutation } from "../api/customers-api-slice";
import Button from "../../globals/components/buttons_v2/Button";
import LinkButton from "../../globals/components/buttons_v2/LinkButton";
import PageSpinner from "../../globals/components/layout/PageSpinner";
import CustomerRegistryData from "../components/viewer/CustomerRegistryData";
import CustomerDetailsData from "../components/viewer/CustomerDetailsData";
import DeleteCustomerDialog from "../components/viewer/DeleteCustomerDialog";
import { BiReset } from "react-icons/bi";
import { FiCheck, FiTerminal } from "react-icons/fi";
import { toast } from "react-toastify";

export default function CustomerViewerContainer() {
  const [ deleteDialog, setDeleteDialog ] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { data, isLoading, isFetching } = useCustomerByIdQuery({ id });
  const [ deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation();
  const navigate = useNavigate();

  // Delete callback function
  const handleDeleteCustomer = useCallback(async () => {
    try {
      await deleteCustomer(id);
      toast.success("Cliente eliminato dalla rubrica");
      navigate(-1);
    } catch(err) {
      toast.error("Abbiamo riscontrato un errore durante l'eliminazione del cliente");
      console.error(err);
    }
  }, [id]); 

  const dialogDeleteButtons = [{ text: "Conferma", disabled: isDeleting, onClick: handleDeleteCustomer }];

  if(isLoading || isFetching) return <PageSpinner message="Ricerca cliente in corso" />

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        <aside className="relative pr-2 rounded-lg flex-1">
          <CustomerRegistryData customer={data} />
        </aside>

        {/* Content */}
        <section className="relative flex-3 bg-base-200">
          <CustomerDetailsData customer={data} />
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Visualizzazione cliente</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Elimina"
            onClick={() => setDeleteDialog(true)}
          />

          <LinkButton
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text="Modifica"
            to={`/customers/edit?id=${id}`}
          />
        </div>
      </footer>

      <DeleteCustomerDialog
        open={deleteDialog}
        close={() => setDeleteDialog(false)}
        topMessage="Perderai tutti i dati di questo cliente"
        buttons={dialogDeleteButtons}
        customer={data}
        loading={isDeleting}
      />

    </div>
  )
}
