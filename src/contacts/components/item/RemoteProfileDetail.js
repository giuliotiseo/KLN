import Modal from "../../../globals/components/layout/Modal";
import { findContactInContacts } from "../../libs/helpers";
import ContactInfoDetail from "./ContactInfoDetail";

const RemoteProfileDetail = ({ contact, modal, setModal, allContactsIds, runCreateContact }) => {
  const isContact = findContactInContacts(allContactsIds, contact);
  
  return <>
    <Modal
      title={null}
      closeModal={() => setModal(false)}
      showModal={modal}
      size={720}
      confirmText="Aggiungi alla rubrica"
      confirm={() => runCreateContact(contact, true, true)}
    >
      <ContactInfoDetail
        contact={contact}
        hideHeading={false} 
        isContact={isContact ? true : false}
      />
    </Modal>
  </>
}

export default RemoteProfileDetail;