import { FiUsers } from "react-icons/fi";
import ContactsList from "../../../contacts/components/list/ContactsList";




export default function StorekeepersList({ contacts }) {
  console.log("Contacts", contacts);

  return (
    <div>
      <div className="flex items-start">
        <FiUsers className="text-3xl m-2"/>
        <div className="mt-2">
          <h3 className="title-4">Referenti</h3>
          { contacts?.length <= 0
            ? <p className="text-base text-gray-400 dark:text-gray-500">Nessun referente</p>
            : <ContactsList
                contacts={contacts}
                listType="WAREHOUSE"
                isFetching={null}
                selectedContact={null}
              />
          }
        </div>

      </div>
    </div>
  )
}