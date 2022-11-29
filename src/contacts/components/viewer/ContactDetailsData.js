import { useSelector } from 'react-redux';
import { useListContacts, useListEmployees } from '../../hooks';
import { Link } from 'react-router-dom';
import SafeArea from '../../../globals/components/layout/SafeArea';
import SafeCol from '../../../globals/components/layout/SafeCol';
import Scrollbar from '../../../globals/components/layout/Scrollbar';
import ContactEmployeesList from '../form/ContactEmployeesList';
import ContactWindowsData from './ContactWindowsData';
import ContactsListLayout from "../../layout/ContactsListLayout";
import { selectCurrentCompany } from '../../../company/slices/companySlice';
import { CONTACT_TYPE_DESCRIPTION } from '../../libs/helpers';
import { selectContactsListLimit, selectContactsListSearchable } from '../../slices/contactsListSlice';

// Main component ------------------------------------------------------------------------------------------------------
function ContactDetailsData({ contact }) {
  const [{ items: employees, isLoading: isLoadingEmployees, isFetching: isFetchingEmployees, refetch: refetchEmployees }, paginationEmployees ] = useListEmployees("ALL");
  const [{ items: contacts, isLoading: isLoadingContacts, isFetching: isFetchingContacts, refetch }, pagination ] = useListContacts("ALL");
  const { windows, employee, type } = contact;
  const { name } = useSelector(selectCurrentCompany);
  const searchable = useSelector(selectContactsListSearchable);
  const limit = useSelector(selectContactsListLimit);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 px-2 h-full">
      <div className="col-span-1 lg:col-span-2 py-4">
        <SafeArea>
          <SafeCol>
            <section>
              <ContactWindowsData
                windows={windows["GENERICO"]}
                className="mt-2 mx-2"
                title="Turni di lavoro"
              />
            </section>

            <section className='relative h-full'>
              <h2 className='title-3 m-4 mb-0'>Relazioni</h2>
              <Scrollbar>
                { employee
                  ? <div className="mx-4">
                      <p className="label whitespace-normal">
                        Dipendenti di <b>{name}</b>
                      </p>
                      <div className="bg-base-100 px-4 py-2 rounded-md">
                        <ContactEmployeesList
                          employees={employees}
                          listType={contact.type}
                          isFetching={isLoadingEmployees || isFetchingEmployees}
                          refetchEmployees={refetchEmployees}
                        />
                      </div>
                    </div>
                  : <div className="mx-4">
                    <p className="label whitespace-normal">Azienda cliente associata al contatto</p>
                    <div className="bg-base-100 px-4 py-2 rounded-md">
                      <Link
                        to={`/customers/view?id=${contact.jobId}`}
                        className="font-bold text-lg text-primary-200 hover:text-primary-300 dark:text-primary-300 dark:hover:text-primary-200"
                      >
                        { contact.jobName }
                      </Link>
                    </div>
                  </div>
                }
              </Scrollbar>
            </section>

          </SafeCol>
        </SafeArea>
      </div>

      <div className="col-span-1 lg:col-span-2 py-4">
        <SafeArea>
          <SafeCol>
            <section>
              <h2 className='title-3 ml-2'>Rubrica contatti</h2>
              <ContactsListLayout
                contacts={contacts}
                listType={"ALL"}
                pagination={pagination}
                searchable={searchable}
                limit={limit}
                refetch={refetch}
                isLoading={isLoadingContacts}
                isFetching={isFetchingContacts}
                selectedContact={contact.id}
              />
            </section>
          </SafeCol>
        </SafeArea>
      </div>
    </div>
  )
}

export default ContactDetailsData
