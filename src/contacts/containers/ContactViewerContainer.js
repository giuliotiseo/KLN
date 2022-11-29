import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useContactByIdQuery, useDeleteContactMutation } from "../api/contacts-api-slice";
import Button from "../../globals/components/buttons_v2/Button";
import DeleteContactDialog from "../components/viewer/DeleteContactDialog";
import LinkButton from "../../globals/components/buttons_v2/LinkButton";
import PageSpinner from "../../globals/components/layout/PageSpinner";
import ContactRegistryData from "../components/viewer/ContactRegistryData";
import ContactDetailsData from "../components/viewer/ContactDetailsData";
import { BiReset } from "react-icons/bi";
import { FiCheck, FiTerminal } from "react-icons/fi";
import { toast } from "react-toastify";
import { resetContactsList } from "../slices/contactsListSlice";

export default function ContactViewerContainer() {
  const [ deleteDialog, setDeleteDialog ] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { data, isLoading, isFetching } = useContactByIdQuery({ id });
  const [ deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Delete callback function
  const handleDeleteContact = useCallback(async () => {
    try {
      await deleteContact(id);
      toast.success("Contatto eliminato dalla rubrica");
      navigate("/contacts");
    } catch(err) {
      toast.error("Abbiamo riscontrato un errore durante l'eliminazione del contatto");
      console.error(err);
    }
  }, [id]); 

  useEffect(() => {
    return () => dispatch(resetContactsList())
  }, []);

  const dialogDeleteButtons = [{ text: "Conferma", disabled: isDeleting, onClick: handleDeleteContact }];

  if(!data || isLoading || isFetching) return <PageSpinner message="Ricerca contatto in corso" />

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex flex-col lg:flex-row h-full">
        <aside className="relative pr-2 rounded-lg flex-1">
          <ContactRegistryData contact={data} />
        </aside>

        {/* Content */}
        <section className="relative flex-3 bg-base-200">
          <ContactDetailsData contact={data} />
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Visualizzazione contatto</span>
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
            to={`/contacts/edit?id=${id}`}
          />
        </div>
      </footer>

      <DeleteContactDialog
        open={deleteDialog}
        close={() => setDeleteDialog(false)}
        topMessage="Perderai tutti i dati di questo contatto"
        buttons={dialogDeleteButtons}
        contact={data}
        loading={isDeleting}
      />

    </div>
  )
}
