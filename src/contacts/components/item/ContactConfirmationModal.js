import { useState, useEffect } from 'react';
// Components
import ActionButton from '../../../globals/components/buttons/ActionButton';
import ActionButtonLink from '../../../globals/components/buttons/ActionButtonLink';
import Modal from '../../../globals/components/layout/Modal';
import ContactInfoDetail from './ContactInfoDetail';
// Api
import { CONTACT_TYPES_SCOPE, CONTACT_TYPE_DESCRIPTION, remoteSignature } from '../../libs/helpers';
import store from '../../../app/store';
import { importLogsIntoCompanyThunk } from '../../../app/thunks/companyThunks';
import { deleteContactThunk, sendInviteToContactThunk, synchronizeContactThunk } from '../../../app/thunks/contactsThunks';
// Modal settings -----------------------------------------------------------------------------------------------
const modalSettings = {
  "delete": {
    title: "Sei sicuro?",
    hideHeading: true,
    message: "Rimuovendo il contatto non potrai più recuperarne le informazioni",
    messageStyle: "alert-danger",
    buttons: [{
      type: 'button',
      text: "Elimina contatto",
      fn: (contact, callback) => executeDelete(contact, callback),
      styles: "btn--center btn-wide mt-4 btn-outline-danger--bold"
    }] 
  },
  "sync": {
    title: "Sei sicuro?",
    hideHeading: true,
    messageStyle: "alert-danger",
    message: "Alcuni dati potranno essere sovrascritti in seguito alla sincronizzazione",
    buttons: [{
      type: 'button',
      text: "Conferma sincronizzazione",
      fn: (contact, callback) => executeSync(contact, callback),
      styles: "btn--center btn-wide btn-primary" 
    }]
  },
  "invite": {
    title: "Sei sicuro?",
    hideHeading: true,
    messageStyle: "alert-info",
    message: "Ricorda: l'invito è rivolto ai dipendenti a cui vuoi dare il permesso di accedere alla tua piattaforma aziendale e ai clienti per permettere loro di effettuare ordini",
    buttons: [{
      type: 'button',
      text: "Conferma l'invio",
      fn: (contact, callback) => executeInvite(contact, callback),
      styles: "btn--center btn-wide btn-primary" 
    }]
  },
  "detail": {
    title: null,
    hideHeading: false,
    buttons: [
      {
        type: 'link',
        text: "Modifica",
        to: (contact, tenant) => `/contacts/edit/${CONTACT_TYPES_SCOPE[contact.type].toLowerCase()}?id=${contact.id}-c-${remoteSignature}-${tenant}`,
        styles:"btn--center btn-primary mr-1 flex-1 font-bold"
      },
      {
        type: 'button',
        text: "Elimina contatto",
        fn: (contact, setModal) => executeDelete(contact),
        styles: "btn--center flex-1 btn-outline-danger--bold"
      }
    ]
  },
}

// Helpers functions -----------------------------------------------------------------------------------------------
// Run delete
const executeDelete = async (contact, setModal) => {
  setModal(false);
  const dispatch = store.dispatch;
  const tempContact = contact;

  // Elimina definitivamente il contatto
  await dispatch(deleteContactThunk({ contact }));

  // Inserisci i log dentro company
  await dispatch(importLogsIntoCompanyThunk({
    action: 'Rimozione contatto dalla rubrica',
    subject: `${tempContact.name}, ${CONTACT_TYPE_DESCRIPTION[tempContact.type].toLowerCase()}, ${ CONTACT_TYPES_SCOPE[tempContact.type] === 'USER' ? tempContact.email : tempContact.vatNumber }`
  }));
}

// Send invite
const executeInvite = async (contact, callback) => {
  const dispatch = store.dispatch;
  await dispatch(sendInviteToContactThunk({ contact }));
  callback(null);
}

// Syncing
const executeSync = async(contact, callback) => {
  const dispatch = store.dispatch;
  await dispatch(synchronizeContactThunk({ contact }));
  callback(null);
}

// Main component -----------------------------------------------------------------------------------------------
function ContactConfirmationModal({ contact, operation, modal, setModal, myCompany, size = 320 }) {
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [modal]);

  if(!operation) return null;
  return <>
    <Modal
      title={modalSettings[operation].title}
      message={modalSettings[operation].message}
      messageStyle={modalSettings[operation].messageStyle}
      closeModal={() => setModal(false)}
      showModal={modal}
      size={size}
    >
      <ContactInfoDetail contact={contact} hideHeading={modalSettings[operation].hideHeading} />
      <div className="flex">
        {modalSettings[operation].buttons.map((btn, index) => (
          btn.type === 'button' 
          ? <ActionButton
              key={index}
              text={btn.text}
              styles={btn.styles}
              loading={loading}
              onClick={() => {
                setLoading(true);
                btn.fn(contact, setModal, myCompany);
              }}
            />
          : <ActionButtonLink
              key={index}
              text={btn.text}
              styles={btn.styles}
              loading={loading}
              to={() => btn.to(contact, myCompany.tag)}
            />
        ))}
      </div>
      {/* <div className="mt-4 text-center">
        <Link className="text-primary-200 dark:text-primary-300 opacity-60 hover:opacity-100 dark:hover:opacity-100" to={`/contacts/detail?id=${contact.id}`}>Vedi dettaglio</Link>
      </div> */}
    </Modal>
  </>
}

export default ContactConfirmationModal;