import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
// Components
import { IconText, Paragraph } from "../../../globals/components/typography/paragraphs";
import { LargeTitle, SmallTitle } from "../../../globals/components/typography/titles";
import ContactAvatar from "../ContactAvatar";
import { EditorReader } from "../../../globals/components/dataEntry/TextEditor";
import CopyTagOnClipboard from '../../../company/components/CopyTagOnClipboard';
import ContactCheckpoints from '../ContactCheckpoints';
import SimpleBar from 'simplebar-react';
// Icons
import { FiInfo, FiMail, FiPhone, FiRefreshCw, FiSend } from "react-icons/fi";
// Helpers
import { roleFinder } from "../../../globals/libs/helpers";
import { CONTACT_TYPES_SCOPE, isContactExist } from "../../libs/helpers";
// Thunks
import { sendInviteToContactThunk, synchronizeContactThunk } from '../../../app/thunks/contactsThunks';

function ContactInfoDetail({ contact, hideHeading = false, isContact = true }) {
  const [ loadingSync, setLoadingSync ] = useState(false);
  const [ loadingInvite, setLoadingInvite ] = useState(false);
  const contactScope = CONTACT_TYPES_SCOPE[contact?.type];
  const dispatch = useDispatch();

  const sync = async () => {
    setLoadingSync(true);
    await dispatch(synchronizeContactThunk({ contact }));
    setLoadingSync(false);
  }

  const invite = async () => {
    setLoadingInvite(true);
    await dispatch(sendInviteToContactThunk({ contact }));
    setLoadingInvite(false);
  }

  return (
    <SimpleBar>
      <div className="flex flex-col items-center justify-start">
        {/* Top section */}
        { !hideHeading && (        
          <section className="relative flex items-center justify-center">
            { isContact && (
              <div data-tip="Sincronizza" onClick={!loadingSync ? sync : null} className="absolute -left-10 bg-secondary-200 mr-2 w-8 h-8 rounded-full text-light-300 text-center flex items-center justify-center cursor-pointer opacity-50 hover:opacity-100">
                <IconText styles="mx-auto" icon={() => <FiRefreshCw />} loading={loadingSync} />
              </div>
            )}

            <ContactAvatar
              avatar={contact.avatar}
              size="w-24 h-24"
              type={contactScope}
            />

            {(!contact.sync && Boolean(contact?.employee)) && (
              <div data-tip="Invia un invito" onClick={!loadingInvite ? invite : null} className="absolute -right-1/2 bg-secondary-200 mr-2 w-8 h-8 rounded-full text-light-300 text-center flex items-center justify-center cursor-pointer opacity-50 hover:opacity-100">
                <IconText styles="mx-auto" icon={() => <FiSend />} loading={loadingInvite} />
              </div>
            )}
          </section>
        )}

        {/* Info section */}
        <section className="w-full mb-4">
          <div className="flex flex-col justify-between items-center border-b py-4">
            <LargeTitle styles="mb-2">{contact.name}</LargeTitle>
            { contactScope === 'COMPANY' && contact.tag && <CopyTagOnClipboard inputTag={contact.tag} /> }
          </div>
          <Paragraph styles="opacity-60 mt-2">
            {roleFinder(contact.type)}
            { contactScope === 'USER'
              ? contact?.job && ` presso ${contact.job}`
              : contact?.job && ` settore ${contact.job.toLowerCase()}`
            }
            { contactScope === 'COMPANY' && <span> - P.IVA: {contact.vatNumber}</span>}
          </Paragraph>

          {/* Contacts data */}
          <div className="my-4">
            <SmallTitle styles="flex items-center justify-between">
              <div className="flex items-center">
                <FiInfo className="text-lg mr-1" />
                <span>Contatti</span>
              </div>
            </SmallTitle>
            { !contact?.email || !contact?.phone 
                ? <Paragraph>Contatti aziendali non disponibili</Paragraph>
                : <ul className="flex flex-col chip-neutral">
                { contact.email && <li className="mt-1"><IconText styles="text-base mx-auto" text={contact.email} icon={() => <FiMail />} /></li> }
                { contact.phone && <li className="mt-1"><IconText styles="text-base mx-auto" text={contact.phone} icon={() => <FiPhone />} /></li> }
              </ul>
            }

          </div>

          { contactScope === 'COMPANY' && (
            <div>
              {/* condizione per la compatibilità con i contact che funzionano ancora con Locations */}
              { !contact?.checkpoints && <h4 className="opacity-50 uppercase text-sm font-bold mt-6">Indirizzi</h4> }

              <ContactCheckpoints
                locations={contact.locations}
                checkpoints={contact?.checkpoints}
                showLabel={false}
                disableTracking={true}
              />
            </div>
          )}

          {/* Notes */}
          <EditorReader content={contact.note} styles="text-left border-l-4 border-secondary-200 p-2 mt-4 bg-neutral-200 dark:bg-neutral-100" />
        </section>

        <ReactTooltip />
      </div>
    </SimpleBar>
  )
}

export default ContactInfoDetail;