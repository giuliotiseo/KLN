import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useListCustomers from '../../../hooks/useListCustomers';
import InputCheckbox from '../../../../globals/components/dataEntry_v2/InputCheckbox'
import InputText from '../../../../globals/components/dataEntry_v2/InputText';
import CustomerPicker from '../../../../globals/components/pickers/CustomerPicker';
import { changeCustomersListSearchable, resetCustomersList } from '../../../slices/customersListSlice';
import ReactTooltip from 'react-tooltip';
import { selectCurrentCompany } from '../../../../company/slices/companySlice';

function CheckpointThirdCompanySelector({
  checkpoint,
  dispatch
}) {
  const [ thirdCompany, setThirdCompany ] = useState(checkpoint?.thirdCompany?.id ? true : false);
  const [ searchable, setSearchable ] = useState("");
  const currentCompany = useSelector(selectCurrentCompany);
  const [{ items: customers, isLoading, isFetching, refetch }, pagination ] = useListCustomers("ALL");
  const dispatchCustomersList = useDispatch();

  const handlePressEnter = useCallback((searchable) => {
    pagination.reset();
    dispatchCustomersList(changeCustomersListSearchable(searchable));
  }, [searchable]);

  const handleThirdCompany = useCallback(() => {
    dispatch({ type: "change_checkpoint", name: "thirdCompany", value: null })
    setThirdCompany(prev => !prev);
  }, [checkpoint.thirdCompany]);

  const handleChangeCompany = useCallback((value) => {
    if(checkpoint?.thirdCompany?.id === value.id) {
      dispatch({ type: "change_checkpoint", name: "thirdCompany", value: null })
    } else {
      dispatch({ type: "change_checkpoint", name: "thirdCompany", value })
    }
  }, [checkpoint.thirdCompany]);

  useEffect(() => {
    return () => dispatchCustomersList(resetCustomersList());
  }, []);

  const currentCompanyForThirdParty = {
    ...currentCompany,
    label: 'La tua azienda',
    company: currentCompany
  }

  return (
    <section className='my-4 py-4 border-b border-t border-light-50 dark:border-dark-50'>
      <h4 className="title-4">Gestione proprietà</h4>
      <InputCheckbox
        value={thirdCompany}
        label={'Punto di interesse gestito da terze parti?'}
        id={'third-party'}
        checked={thirdCompany}
        name="roleIds"
        className='ml-1'
        callback={handleThirdCompany}
      />

      { thirdCompany && (
        <div className='mt-4'>
          <InputText
            label="Cerca nome azienda"
            value={searchable}
            onPressEnter={() => handlePressEnter(searchable)}
            placeholder="Cerca cliente per nome"
            className='w-full flex-col mb-2'
            contentClassName='w-full'
            inputClassName="flex-1 w-full bg-light-300 border-none"
            callback={({ value }) => setSearchable(value)}
          />

          <CustomerPicker
            customers={[currentCompanyForThirdParty].concat(customers.filter(customer => customer?.company?.owner !== "NOT_OWNED"))}
            listType={"ALL"}
            title=""
            loading={isLoading || isFetching}
            refetch={refetch}
            pagination={pagination}
            selectedCustomer={checkpoint?.thirdCompany || null}
            callback={handleChangeCompany}
          />

          <p className="text-right text-sm text-secondary-200 dark:text-secondary-300">
            <span data-tip="Possono essere selezionate dalla piattaforma solo le aziende gestite o la tua azienda">
              Non trovi il cliente?
            </span>
          </p>

          <ReactTooltip place="left" className="w-[200px] text-center z-50" />
        </div>
      )}
    </section>
  )
}

export default CheckpointThirdCompanySelector
