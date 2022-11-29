import React from 'react'
import { useSelector } from 'react-redux';
import useListCustomers from '../../../customers/hooks/useListCustomers';
import useListEmployees from '../../hooks/useListEmployees';
import { selectCurrentCompany } from '../../../company/slices/companySlice';
import InputCheckbox from '../../../globals/components/dataEntry_v2/InputCheckbox';
import InputEmail from '../../../globals/components/dataEntry_v2/InputEmail'
import InputPhone from '../../../globals/components/dataEntry_v2/InputPhone';
import WindowCompiler from '../../../globals/components/dataEntry_v2/WindowCompiler';
import SafeCol from '../../../globals/components/layout/SafeCol';
import ContactCustomersList from './ContactCustomersList';
import ContactEmployeesList from './ContactEmployeesList';
import Scrollbar from '../../../globals/components/layout/Scrollbar';
import Spinner from '../../../globals/components/layout/Spinner';

const ContactDetailsFields = ({
  contact,
  updateForm,
  updateWindows,
  updateJob,
  updateEmployee,
  validationError
}) => {
  const { name } = useSelector(selectCurrentCompany);
  const [{ items: customers, isLoading: isLoadingCustomers, isFetching: isFetchingCustomers, refetch: refetchCustomers }, paginationCustomers ] = useListCustomers("ALL");
  const [{ items: employees, isLoading: isLoadingEmployees, isFetching: isFetchingEmployees, refetch: refetchEmployees }, paginationEmployees ] = useListEmployees(contact?.type || "ALL");
  const { email, phone } = contact;

  const loadingCustomers = isLoadingCustomers || isFetchingCustomers;
  const loadingEmployees = isLoadingEmployees || isFetchingEmployees;

  if(!contact || Object.keys(contact).length <= 0) return <div className='flex w-full h-full items-center justify-center'>
    <Spinner />
  </div>

  return (
    <SafeCol id="CustomerRegistryFields">
      <div className='m-4'>
        <section className="mb-4">
          <h3 className='title-3 mb-4'>Dati di contatto</h3>
          <InputEmail
            id="email"
            label="Indirizzo email *"
            className="w-full mb-2"
            labelClassName='w-auto min-w-[140px]'
            contentClassName="w-full text-lg"
            inputClassName='bg-light-300 dark:bg-dark-300'
            value={email}
            forceUpperCase={false}
            callback={updateForm}
            disabled={false}
            isError={validationError.includes("email")}
          />

          <InputPhone
            id="phone"
            label="Numero di telefono"
            className="w-full mb-2"
            contentClassName="w-full text-lg"
            labelClassName='w-auto min-w-[140px]'
            inputClassName='bg-light-300 dark:bg-dark-300'
            value={phone}
            forceUpperCase={false}
            callback={updateForm}
            disabled={false}
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1 py-2">
            <div className="mb-4">
              <h3 className='title-3'>Disponibilità</h3>
              <p className="label whitespace-normal mt-2">Indica giorni e orari disponibilità del contatto</p>
            </div>

            { Object.keys(contact.windows).map(type => (
              <div key={type}>
                { contact.windows?.[type] && contact.windows[type].map((win, index) => (
                  <div className='bg-base-100 rounded-md p-4 mb-4' key={index}>
                    <WindowCompiler
                      key={index}
                      title={`Turno di lavoro`}
                      titleClassName="text-sm uppercase font-bold text-secondary-200 dark:text-secondary-300 mb-2"
                      index={index}
                      window={win}
                      days={win?.days || []}
                      dispatchWindows={updateWindows}
                      canDelete={false}
                      className={`py-4 rounded-md ${ index < 1 && 'mb-6'}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          <div className="col-span-1 py-2">
            <div className="mb-4 h-full">
              <h3 className='title-3'>Luogo di lavoro</h3>

              <InputCheckbox
                value={contact.employee}
                label={`Lavora presso ${name}`}
                id={"employee"}
                name="employee"
                checked={contact.employee}
                callback={updateEmployee}
                className="p-2 mt-2 bg-base-100 rounded-md"
              />

              <div className='relative h-full'>
                <Scrollbar>
                  { contact.employee
                    ? <div className="mt-4">
                        <p className="label whitespace-normal">
                          Dipendenti di <b>{name}</b>
                        </p>
                        <div className="bg-base-100 px-4 py-2 rounded-md">
                          <ContactEmployeesList
                            employees={employees}
                            listType={contact.type}
                            isFetching={loadingEmployees}
                            refetchEmployees={refetchEmployees}
                          />
                        </div>
                      </div>
                    : <div className="mt-4">
                      <p className="label whitespace-normal">Associa questo contatto a una delle aziende clienti presenti in rubrica</p>
                      <div className="bg-base-100 px-4 py-2 rounded-md">
                        <ContactCustomersList
                          customers={customers}
                          selectedJobId={contact?.jobId || contact?.job?.id}
                          listType="ALL"
                          isFetching={loadingCustomers}
                          callback={updateJob}
                        />
                      </div>
                    </div>
                  }
                </Scrollbar>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SafeCol>
  )
}

export default ContactDetailsFields
