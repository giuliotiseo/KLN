import { useState } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Components
import FullSpinner from '../../globals/components/spinners/FullSpinner';
import SectionWrap from '../../globals/components/layout/SectionWrap';
import SectionTop from '../../globals/components/layout/SectionTop';
import SafeArea from '../../globals/components/layout/SafeArea';
import SafeCol from '../../globals/components/layout/SafeCol';
import ActionButtonLink from '../../globals/components/buttons/ActionButtonLink';
import ContactsList from '../components/ContactsList';
import FiltersContacts from '../components/FiltersContacts';
import ContactDetailsViewer from '../components/detail/ContactDetailsViewer';
import ContactReferencesViewer from '../components/detail/ContactReferencesViewer';
import ContactAvatar from '../components/ContactAvatar';
import ContactConfirmationModal from '../components/item/ContactConfirmationModal';
import ContactCheckpointCompiler from '../components/checkpoint/ContactCheckpointCompiler';
import { SmallTitle } from '../../globals/components/typography/titles';
// Store
import { nextSearchContactsThunk, searchContactsThunk } from '../../app/thunks/contactsThunks';
import { selectCompanyInfo, selectTenant } from '../../company/slices/companyInfoSlice';
import {
  insertContactInSelected,
  selectContactFromAllLists,
  selectContactsFiltersNextToken,
  selectContactsList,
  selectContactsListStatus,
  selectContactsQueryOptions,
  selectSelectedContact
} from '../slices/listContactsSlice';
// Api
import { fetchContact } from '../api/fetch';
// Icons
import { FiEdit, FiEye, FiPlus } from 'react-icons/fi';
// Hooks
import { useDataFinder } from '../../globals/libs/hooks';
// Helpers
import { CONTACT_TYPES_SCOPE } from '../libs/helpers';
import CopyTagOnClipboard from '../../company/components/CopyTagOnClipboard';

// Sub component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const ContactDetailsViewerListItem = ({ contact, selected }) => {
  if(!contact) return null;
  return (
    <li className='flex items-center border-b border-light-50 dark:border-dark-300 hover:bg-light-200 dark:hover:bg-dark-200'>
      {selected?.id === contact?.id && <FiEye />}
      <Link
        to={`/contacts/details?id=${contact.id}`}
        className={`
          block text-left py-2 px-1
          ${selected?.id === contact?.id ? 'font-bold' : ''}
        `}
      >
        {contact.name}
      </Link>
    </li>
  )
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ContactDetailsContainer() {
  const [ modal, setModal ] = useState(false);
  const contacts = useSelector(selectContactsList);
  const nextToken = useSelector(selectContactsFiltersNextToken);
  const status = useSelector(selectContactsListStatus);
  const queryOptions = useSelector(selectContactsQueryOptions);
  const tag = useSelector(selectTenant);
  const contact = useSelector(selectSelectedContact);
  const myCompany = useSelector(selectCompanyInfo);
  const [ inputContact, getContactStatus ] = useDataFinder({
    queryStringKey: "id", 
    selector: selectContactFromAllLists, 
    primaryKey: "id",
    query: fetchContact,
  });
  
  const dispatch = useDispatch();
  const isInit = useRef(false);
  
  /* 
    * Callbacks 
  */

  const initContactsList = useCallback(() => {
    if(Object.keys(contacts)?.length <= 0) {
      dispatch(searchContactsThunk({ tenant: tag, queryOptions, nextToken: undefined }));
    }

    isInit.current = true;
  }, [contacts, dispatch, queryOptions, tag]);

  /* 
    * Effects 
  */
  // Reset on change contact form
  // Initialize filtered list
  useEffect(() => {
    if(tag && !isInit.current) initContactsList();
  }, [tag, initContactsList]);

  useEffect(() => {
    dispatch(insertContactInSelected(inputContact));
  }, [inputContact]);
    
  if(getContactStatus === 'loading') return <FullSpinner />

  // Button save config
  const btn_path = inputContact 
    ? {
      text: "Modifica",
      icon: () => <FiEdit />,
      to: `/contacts/edit/${CONTACT_TYPES_SCOPE[inputContact?.type]?.toLowerCase()}?id=${inputContact.id}` 
    }
    : null;

  // Dispatch filtering operation (for list)
  const runQuery = (queryOption) => {
    dispatch(searchContactsThunk({ 
      queryOptions: queryOption 
        ?  { ...queryOptions, [queryOption.key]: queryOption.value }
        : { ...queryOptions }, 
      tenant: tag,
      nextToken: undefined
    }));
  };

  return (
    <SectionWrap className="bg-transparent dark:bg-transparent">
      <SectionTop
        title={`Dettagli contatto`}
        // icon={() => <FiEdit className="w-8 h-auto mr-4"/>}
        icon={null}
        backPath="/contacts"
        filters={null}
        link={btn_path}
      >
        <ActionButtonLink
          text={"Nuovo"}
          styles={`btn-primary mr-2`}
          to={`/contacts/create`}
          icon={() => <FiPlus />}
        />
      </SectionTop>
      <SafeArea className="grid grid-cols-3 grid-rows-3">
        {/* Left */}
        <div className="relative col-span-3 row-span-2 md:row-span-3 md:col-span-1">
          <SafeCol id="contact-creator-left">
            { contact 
              ? <>
                <ContactAvatar
                  readyAvatar={contact.avatar}
                  size="w-28 h-28"
                  type={contact.type}
                />

                { contact?.tag && (
                  <div className="mt-4">
                    <p className="label">Codice cliente</p>
                    <CopyTagOnClipboard inputTag={contact.tag} />
                  </div>
                )}
                          
                <div className='bg-base-100 mr-4 mb-4 px-4 py-4 mt-6 rounded-md'>
                  <ContactDetailsViewer
                    contact={contact}
                    viewerType={CONTACT_TYPES_SCOPE[contact.type]}
                    forceHideSurname={true}
                  />
                </div>

                <div className='bg-base-100 mr-4 mb-4 px-4 py-4 mt-6 rounded-md'>
                  <ContactReferencesViewer
                    contact={contact}
                    viewerType={CONTACT_TYPES_SCOPE[contact.type]}
                  />
                </div>

                { CONTACT_TYPES_SCOPE[contact.type] === "COMPANY" && (
                  <div className='bg-base-100 mr-4 mb-4 mt-6 rounded-md'>
                    <ContactCheckpointCompiler
                      checkpoints={contact.checkpoints}
                      titleStyles="sticky top-0 rounded-t-md p-4"
                      contentStyles="px-4"
                      editEnabled={false}
                    />
                  </div>
                )}

                <div>
                  <button
                    onClick={() => setModal("delete")}
                    className="btn btn-outline-danger"
                  >
                    Elimina definitivamente
                  </button>
                </div>
              </>
              : <p className='text-lg mt-4 bg-base-100 mr-4 mb-4 px-4 py-4 rounded-md'>Seleziona un contatto</p>
            }
          </SafeCol>
        </div>

        {/* Right */}
        <div className="relative col-span-3 row-span-2 md:row-span-3 md:col-span-2">
          <SafeCol id="contact-creator-right">
            <div className='relative bg-base-100 mr-4 mb-4 px-4 py-4 rounded-md'>
              <SmallTitle>Lista contatti</SmallTitle>
              <div className='sticky top-0 bg-base-100 z-50'>
                <FiltersContacts
                  queryOptions={queryOptions}
                  runQuery={runQuery}
                  contacts={contacts}
                  refresh={initContactsList}
                />
              </div>

              <div className='pl-4'>
                <ContactsList
                  listType="filtered"
                  contacts={contacts}
                  loading={status === "loading"}
                  next={() => dispatch(nextSearchContactsThunk({ tenant: tag, nextToken }))}                  listItemRender={(c_id, contactItem) => ( 
                    <ContactDetailsViewerListItem
                      key={c_id}
                      contact={contactItem}
                      selected={contact}
                    />
                  )}
                />
              </div>
            </div>
          </SafeCol>
        </div>
      </SafeArea>

      {/* Modals */}
      <ContactConfirmationModal
        contact={contact}
        operation={modal}
        modal={modal}
        setModal={setModal}
        myCompany={myCompany}
        size={720}
      />
    </SectionWrap>
  )
}