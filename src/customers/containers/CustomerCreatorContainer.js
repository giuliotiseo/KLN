import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import useCreateCustomer from "../hooks/useCreateCustomer";
import useFormReducer from "../../globals/hooks/useFormReducer";
import usePrompt from "../../globals/hooks/useUnsafeReactRouter";
import CustomerDetailsFields from '../components/form/CustomerDetailsFields';
import CustomerRegistryFields from '../components/form/CustomerRegistryFields';
import CustomerSearchVatNumber from '../components/form/CustomerSearchVatNumber';
import Button from "../../globals/components/buttons_v2/Button";
import PageSpinner from "../../globals/components/layout/PageSpinner";
import { BiReset } from "react-icons/bi";
import { FiCheck, FiTerminal } from "react-icons/fi";
import { customerInitialState } from '../libs/constants';
import { customCustomerFormLogic } from '../libs/helpers';
import { clearCustomerCreator, selectCustomerCreatorSelectedCustomer, selectCustomerCreatorStatus } from '../slices/customerCreatorSlice';

export default function CustomerCreatorContainer() {
  const [ form, showForm ] = useState(false);
  const [ customer, updateForm ] = useFormReducer(customerInitialState, customCustomerFormLogic);
  const status = useSelector(selectCustomerCreatorStatus);
  const selectedCustomer = useSelector(selectCustomerCreatorSelectedCustomer);
  const [ createCustomer, { isLoading, validationError }] = useCreateCustomer();
  const dispatch = useDispatch();

  // In case of dirty exit
  // const isDirty = () => {
  //   return !isLoading && (customer?.name || customer?.vatNumber || customer?.city || customer?.address);
  // }

  // usePrompt("Sei sicuro di voler uscire da questa pagina?", isDirty());

  // Effects
  useEffect(() => {
    return () => {
      dispatch(clearCustomerCreator());
      updateForm({ type: "reset", name: "reset", value: null });
    }
  }, [dispatch]);

  useEffect(() => {
    if(selectedCustomer) {
      updateForm({ type: "custom", name: "override", value: selectedCustomer })
    }
  }, [selectedCustomer, updateForm]);

  useEffect(() => {
    if(status === "manual-compiling") {
      showForm(true);
    }
  }, [status]);

  // create function
  if(!form) {
    return <div className='h-full mt-4 w-full'>
      <CustomerSearchVatNumber
        vatNumber={customer.vatNumber}
        updateForm={updateForm}
        showForm={showForm}
      />
    </div>
  }

  if(isLoading) return <PageSpinner message="Creazione cliente in corso" />

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        <aside className="relative pr-2 rounded-lg flex-1">
          <CustomerRegistryFields
            selectedCustomer={selectedCustomer}
            customer={customer}
            updateForm={updateForm}
            validationError={validationError}
          />
        </aside>

        {/* Content */}
        <section className="relative flex-3 bg-base-200">
          <CustomerDetailsFields
            customer={customer}
            warehouses={selectedCustomer?.warehouses || []}
            updateForm={updateForm}
          />
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Creazione cliente</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={() => updateForm({ type: "reset", name: "reset", value: null })}
          />

          <Button
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text="Salva il cliente"
            onClick={() => createCustomer(customer)}
          />
        </div>
      </footer>
    </div>
  )
}
