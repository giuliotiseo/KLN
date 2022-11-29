import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import usePrompt from "../../globals/hooks/useUnsafeReactRouter";
import useUpdateCustomer from "../hooks/useUpdateCustomer";
import useCustomerToEdit from "../hooks/useCustomerToEdit";
import CustomerDetailsFields from '../components/form/CustomerDetailsFields';
import CustomerRegistryFields from '../components/form/CustomerRegistryFields';
import Button from "../../globals/components/buttons_v2/Button";
import PageSpinner from "../../globals/components/layout/PageSpinner";
import Spinner from "../../globals/components/layout/Spinner";
import { BiReset } from "react-icons/bi";
import { FiCheck, FiTerminal } from "react-icons/fi";
import { changeCustomerEditorForm, resetCustomerEditor } from "../slices/customerEditorSlice";

export default function CustomerEditorContainer() {
  const [ searchParams ] = useSearchParams();
  const id = searchParams.get('id');
  const { customer, isLoading: isFetchingCustomer } = useCustomerToEdit(id);
  const [ updateCustomer, { isLoading, validationError }] = useUpdateCustomer(customer);
  const dispatch = useDispatch();

  // In case of dirty exit
  const isDirty = () => {
    return customer?.name || customer?.vatNumber || customer?.city || customer?.address;
  }

  usePrompt("Sei sicuro di voler uscire da questa pagina?", isDirty());

  // Effects
  useEffect(() => {
    return () => {
      // reset slice data
      dispatch(resetCustomerEditor());
    }
  }, []);

  const updateForm = useCallback((payload) => {
    dispatch(changeCustomerEditorForm({
      ...payload,
      customer
    }))
  }, [customer]);

  if(isFetchingCustomer) return <div>
    <Spinner />
  </div>

  if(isLoading) return <PageSpinner message="Aggiornamento cliente in corso" />

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        <aside className="relative pr-2 rounded-lg flex-1">
          <CustomerRegistryFields
            customer={customer}
            updateForm={updateForm}
            validationError={validationError}
            enabledEdit={false}
          />
        </aside>

        {/* Content */}
        <section className="relative flex-3 bg-base-200">
          <CustomerDetailsFields
            customer={customer}
            updateForm={updateForm}
            validationError={validationError}
          />
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Modifica cliente</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Ripristina"
            onClick={() => console.log("Resetta")}
          />

          <Button
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text="Salva le modifiche"
            onClick={() => updateCustomer(customer)}
          />
        </div>
      </footer>
    </div>
  )
}
