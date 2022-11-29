import { useSelector } from "react-redux";
import { useCustomerByIdQuery } from "../api/customers-api-slice";
import { selectCustomerEditor } from "../slices/customerEditorSlice";

export default function useCustomerToEdit(id) {
  const { data: selectedCustomer, isFetching, isLoading } = useCustomerByIdQuery({ id });
  const editorCustomer = useSelector(selectCustomerEditor);
  const customerToRender = {
    ...selectedCustomer,
    ...editorCustomer,
    relationships: editorCustomer?.relationships || selectedCustomer?.relationships,
    emails: editorCustomer?.emails || selectedCustomer?.emails,
    phones: editorCustomer?.phones || selectedCustomer?.phones,
  }

  return {
    customer: customerToRender,
    isLoading: isLoading || isFetching,
  }
}