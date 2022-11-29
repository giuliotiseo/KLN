// Components
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
// Helpers
import { CONTACT_TYPES_SCOPE, CONTACT_TYPE_DESCRIPTION, findContactInContacts, findTagInContacts } from "../../libs/helpers";
// Icons
import { FiCheckSquare, FiTriangle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectAllContactsIds, selectAllContactsTags } from "../../slices/allContactsSlice";

const RemoteOptions = ({ contact }) => {
  const allContactsIds = useSelector(selectAllContactsIds);
  const allContactsTags = useSelector(selectAllContactsTags);
  console.log("Contact", contact);
  const isContact = CONTACT_TYPES_SCOPE[contact.type] === "USER" 
    ? findContactInContacts(allContactsIds, contact)
    : findTagInContacts(allContactsTags, contact);

  console.log("Is contact", isContact);

  return (
    <div className="flex items-center">
        <SmallParagraph styles="flex items-center">
          <span className="mr-2 block text-sm opacity-50">
            {CONTACT_TYPE_DESCRIPTION[contact.type]}
            { CONTACT_TYPES_SCOPE[contact.type] === 'USER'
              ? contact?.job && ` presso ${contact.job}`
              : contact?.job && ` settore ${contact.job.toLowerCase()}`
            }
          </span>

          {!isContact
            ? (
              <span className="flex items-center">
                <FiTriangle className="text-amber-400" />
                <span className="ml-1">
                  Non presente in rubrica
                </span>
              </span>
            )
            : (
              <span className="flex items-center">
                  <FiCheckSquare className="text-success-300 dark:text-success-200" />
                  <span className="ml-1">In rubrica</span>
              </span>
            )}
        </SmallParagraph>
    </div>
  )
}

export default RemoteOptions;