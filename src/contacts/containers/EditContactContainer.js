import { useState, useCallback, useEffect, useReducer, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Components
import FullSpinner from '../../globals/components/spinners/FullSpinner';
import SectionWrap from '../../globals/components/layout/SectionWrap';
import SectionTop from '../../globals/components/layout/SectionTop';
import SafeArea from '../../globals/components/layout/SafeArea';
import SafeCol from '../../globals/components/layout/SafeCol';
import ContactCheckpointCompiler from '../components/checkpoint/ContactCheckpointCompiler';
import ContactReferencesCompiler from '../components/create/ContactReferencesCompiler';
import ContactRegistryCompiler from '../components/create/ContactRegistryCompiler';
import ContactAvatarPicker from '../components/ContactAvatarPicker';
import { SmallTitle } from '../../globals/components/typography/titles';
import ContactsList from '../components/ContactsList';
import FiltersContacts from '../components/FiltersContacts';
import Modal from '../../globals/components/layout/Modal';
import ContactEditorListItem from '../components/ContactEditorListItem';
// State reducers
import { initialState, customContactFormLogic } from '../libs/reducers';
// Store
import { nextSearchContactsThunk, searchContactsThunk, trackingContactLocationThunk, updateContactThunk } from '../../app/thunks/contactsThunks';
import { selectCompanyInfo, selectTenant } from '../../company/slices/companyInfoSlice';
import { insertContactInSelected, selectContactFromAllLists, selectContactsFiltersNextToken, selectContactsList, selectContactsListStatus, selectContactsQueryOptions, selectSelectedContact } from '../slices/listContactsSlice';
// Api
import { fetchContact } from '../api/fetch';
// Icons
import { FiCheck } from 'react-icons/fi';
// Hooks
import { useDataFinder } from '../../globals/libs/hooks';
// Helpers
import { CONTACT_TYPES_SCOPE } from '../libs/helpers';
import { handleTrackingLocation } from '../api/update';
import useFormReducer from '../../globals/hooks/useFormReducer';
import { resetContactEditor } from '../slices/contactEditorSlice';

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function EditContactContainer() {
  const [ contactForm, setContactForm ] = useState("COMPANY");
  const [ loading, setLoading ] = useState(false);
  const [ isChanging, setIsChanging ] = useState(false);
  const [ confirmationModal, setConfirmationModal ]= useState(false);
  const [ contact, updateContactState ] = useFormReducer(customContactFormLogic, initialState);
  const selectedContact = useSelector(selectSelectedContact);
  const contacts = useSelector(selectContactsList);
  const nextToken = useSelector(selectContactsFiltersNextToken);
  const status = useSelector(selectContactsListStatus);
  const queryOptions = useSelector(selectContactsQueryOptions);
  const tag = useSelector(selectTenant);
  const company = useSelector(selectCompanyInfo);
  const [ inputContact, getContactStatus ] = useDataFinder({
    queryStringKey: "id", 
    selector: selectContactFromAllLists, 
    primaryKey: "id",
    query: fetchContact,
  });

  const dispatch = useDispatch();
  const isInit = useRef(false);

  // // Update timestamp to notify changes in avatar data
  function handleChangeAvatar(file) {
    if(file) {
      updateForm({ target: { type: "object", name: "contactAvatarFile", value: {
        ...file, 
        timestamp: Date.now().toString() 
      }}});
    } else {
      updateForm({ target: { 
        type: "object",
        name: "contactAvatarFile",
        value: null
      }});
    }
  }
  
  /* 
    * Callbacks 
  */
  //  Global form init
  const updateForm = useCallback(({ target: { value, name, type } }) => {
    customContactFormLogic({ name, type, value, updateContactState });
  }, []);

  const initContactsList = useCallback(() => {
    if(Object.keys(contacts)?.length <= 0) {
      dispatch(searchContactsThunk({ tenant: tag, queryOptions, nextToken: undefined }));
    }
    
    isInit.current = true;
  }, [dispatch, queryOptions, tag, contacts]);

  // Dispatch filtering operation (for list)
  const runQuery = useCallback((queryOption) => {
    dispatch(searchContactsThunk({ 
      queryOptions: queryOption 
        ?  { ...queryOptions, [queryOption.key]: queryOption.value }
        : { ...queryOptions }, 
      tenant: tag,
      nextToken: undefined
    }));
  }, [dispatch, queryOptions, tag]);

  const runUpdate = useCallback(async () => {
    await dispatch(updateContactThunk({
      type: CONTACT_TYPES_SCOPE[contact.type],
      contact: contact,
      prevContact: inputContact,
      merge: false
    }));

    setLoading(false);
  }, [contact, dispatch, inputContact]);

  /* 
    * Effects 
  */
  // Reset on change contact form
  useEffect(() => {
    dispatch(insertContactInSelected(inputContact));
    if(inputContact?.type) {
      setContactForm(() => CONTACT_TYPES_SCOPE[inputContact.type])
    }
  }, [inputContact, dispatch]);

  useEffect(() => {
    if(selectedContact) {
      updateForm({ target: { type: "override", name: "edit", value: selectedContact }})
    }
  }, [selectedContact, updateForm]);

  // Initialize filtered list
  useEffect(() => {
    if(tag && !isInit.current) initContactsList();
  }, [tag, initContactsList]);

  // Reset on close
  useEffect(() => {
    return () => dispatch(resetContactEditor())
  }, []);

  // Save function
  function saveContactChanges() {
    setLoading(true);
    if(isChanging) {
      setConfirmationModal(true);
      return null;
    } else {
      runUpdate();
    }
  }

  // Button save config
  const btn_save = {
    onClick: () => saveContactChanges(),
    text: "Conferma modifiche",
    icon: () => <FiCheck />,
    loading: loading,
  }
    
  if(getContactStatus === 'loading') return <FullSpinner />

  return (
    <SectionWrap className="bg-transparent dark:bg-transparent">
      <SectionTop
        title={`Editor contatti`}
        // icon={() => <FiEdit className="w-8 h-auto mr-4"/>}
        icon={null}
        backPath="/contacts"
        filters={null}
        action={btn_save}
      />
      <SafeArea className="grid grid-cols-3 grid-rows-3">
        {/* Left */}
        <div className="relative col-span-3 row-span-2 md:row-span-3 md:col-span-1">
          <SafeCol id="contact-creator-left">
            <ContactAvatarPicker
              size="w-28 h-28"
              avatar={null}
              username={null}
              contactAvatarFile={contact.contactAvatarFile}
              setContactAvatarFile={handleChangeAvatar}
            />
                      
            <div className='bg-base-100 mr-4 mb-4 px-4 py-4 mt-6 rounded-md'>
              <ContactRegistryCompiler
                contact={contact}
                contactForm={contactForm}
                updateForm={updateForm}
              />
            </div>

            <div className='bg-base-100 mr-4 mb-4 px-4 py-4 mt-6 rounded-md'>
              <ContactReferencesCompiler
                contact={contact}
                contactForm={contactForm}
                updateForm={updateForm}
                fromPath={false}
                companyName={company.name}
              />
            </div>

            { contactForm === "COMPANY" && (
              <div className='bg-base-100 mr-4 mb-4 mt-6 rounded-md'>
                <ContactCheckpointCompiler
                  checkpoints={contact.checkpoints}
                  updateForm={updateForm}
                  setIsChanging={setIsChanging}
                  setModalAddress={({ address, index }) => handleTrackingLocation(address, index, contact, dispatch)}
                  titleStyles="sticky top-0 rounded-t-md p-4"
                  contentStyles="px-4"
                />
              </div>
            )}
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
                  next={() => dispatch(nextSearchContactsThunk({ tenant: company.tag, nextToken }))}
                  listItemRender={(c_id, contactItem) => ( 
                    <ContactEditorListItem
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

        <Modal
          title={"Sei sicuro?"}
          message={"Non hai confermato le informazioni nell'editor dei punti di interesse, pertanto tutte le modifiche saranno perse"}
          messageStyle={'alert-danger'}
          closeModal={() => {
            setConfirmationModal(false)
            setLoading(false)
          }}
          showModal={confirmationModal}
          size={500}
          confirm={runUpdate}
        >
          <ContactCheckpointCompiler
            checkpoints={contact.checkpoints}
            editEnabled={false}
          />
        </Modal>
      </SafeArea>
    </SectionWrap>
  )
}