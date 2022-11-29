import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import { SmallParagraph } from "../../globals/components/typography/paragraphs";
import ContactAvatar from "./ContactAvatar";
import RemoteOptions from "./item/RemoteOptions";
import LocalOptions from "./item/LocalOptions";
import ContactConfirmationModal from "./item/ContactConfirmationModal";
import RemoteProfileDetail from "./item/RemoteProfileDetail";
// Helpers
import { CONTACT_TYPES_SCOPE, CONTACT_TYPE_DESCRIPTION, findContactInContacts, findTagInContacts } from "../libs/helpers";
// Selectors
import { selectCompanyInfo } from "../../company/slices/companyInfoSlice";
// Api
import { selectAllContactsIds, selectAllContactsTags } from "../slices/allContactsSlice";
import { createContactThunk } from "../../app/thunks/contactsThunks";
import { formatDate } from "../../globals/libs/helpers";

// Main component -----------------------------------------------------------------------------------------------
export default function ContactListItem({ contact, origin, disabledOptions = false }) {
  const [ modal, setModal ] = useState(false);
  const [ remoteProfileDetail, setRemoteProfileDetail ] = useState(false);
  const myCompany = useSelector(selectCompanyInfo);
  const allContactsIds = useSelector(selectAllContactsIds)
  const allContactsTags = useSelector(selectAllContactsTags);
  const dispatch = useDispatch();

  async function runCreateContact(contact, fromRemote, enabledToast) {
    if(fromRemote) {
      dispatch(createContactThunk({
        type: CONTACT_TYPES_SCOPE[contact.type], 
        contact: { ...contact, tenant: myCompany.tag }, 
        enabledToast,
        fromRemote
      }));

      setRemoteProfileDetail(false);
    }
  }

  const handleModal = () => {
    if(CONTACT_TYPES_SCOPE[contact.type] === "USER") {
      if(findContactInContacts(allContactsIds, contact)) {
        setModal('detail');
      } else {
        setRemoteProfileDetail(true);
      }
    }

    if(CONTACT_TYPES_SCOPE[contact.type] === "COMPANY") {
      if(findTagInContacts(allContactsTags, contact) || allContactsIds.includes(contact.id)) {
        setModal('detail');
      } else {
        setRemoteProfileDetail(true);
      }
    }
  }

  return (
    <>
      <li className={`flex list__item cursor-pointer`}>
        <div onClick={handleModal} className="flex flex-1 p-4">
          <ContactAvatar 
            avatar={contact.avatar}
            size="w-12 h-12 mr-3"
            type={contact.type}
          />

          <div>
            <span className="block text-base md:text-lg">{contact.name}</span>
            { origin === 'remote' && !disabledOptions
              ? <RemoteOptions contact={contact} />
              : <span className="block text-sm text-primary-200 dark:text-primary-300">
                {CONTACT_TYPE_DESCRIPTION[contact.type]}
                { CONTACT_TYPES_SCOPE[contact.type] === 'USER'
                  ? contact?.job && ` presso ${contact.job}`
                  : contact?.job && ` settore ${contact.job.toLowerCase()}`
                }
              </span>
            }
          </div>
        </div>

        { origin === 'local' && !disabledOptions && (
          <LocalOptions
            contact={contact}
            setModal={setModal}
          />
        )}

        { contact.invited && (
          <SmallParagraph styles="absolute right-4 bottom-2 opacity-50">
            Invitato il {formatDate(contact.invited)}
          </SmallParagraph>
        )}
      </li>

      {/* Modals */}
      <ContactConfirmationModal
        contact={contact}
        operation={modal}
        modal={modal}
        setModal={setModal}
        myCompany={myCompany}
        size={720}
      />

      <RemoteProfileDetail
        contact={contact}
        modal={remoteProfileDetail}
        setModal={setRemoteProfileDetail}
        runCreateContact={runCreateContact}
        allContactsIds={allContactsIds}
      />
    </>
  )
}