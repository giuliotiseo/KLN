import { useSelector } from "react-redux";
import { useContactByIdQuery } from "../api/contacts-api-slice";
import { selectContactEditor } from "../slices/contactEditorSlice";

export default function useContactToEdit(id) {
  const { data: selectedContact, isFetching, isLoading } = useContactByIdQuery({ id });
  const editorContact = useSelector(selectContactEditor);
  const contactToRender = {
    ...selectedContact,
    ...editorContact
  }

  return {
    contact: contactToRender,
    isLoading: isLoading || isFetching,
  }
}