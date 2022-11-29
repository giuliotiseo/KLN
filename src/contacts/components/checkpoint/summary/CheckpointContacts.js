import { useSelector } from "react-redux";
import { TinyTitle } from "../../../../globals/components/typography/titles";
import InlineSpinner from "../../../../globals/components/spinners/InlineSpinner";
import ContactAvatar from "../../ContactAvatar";
// Helpers
import { selectStatusContactsList } from "../../../slices/listContactsSlice";
// Icons
import { FiUploadCloud } from "react-icons/fi";

export default function ({ checkpoint, runCreateContact, allContactsIds, styles = "" }) {
  const status = useSelector(selectStatusContactsList);

  const handleCreateContactOnTheFly = (c) => {
    runCreateContact({ ...c, type: "WAREHOUSE" }, true, true)
  }

  return (
    <section className={styles}>
      <TinyTitle styles="block">Referenti</TinyTitle>
      { <div className="flex flex-col mt-2">{checkpoint?.contacts?.map(c => (
          <div
            key={c.contactId} data-tip={c.name}
            className="flex items-start mb-2"
          >
            <ContactAvatar avatar={c.avatar} size="w-8 h-8" styles="mt-1" type={"WAREHOUSE"} />
            <div className="ml-1">
              <p>{c?.name}</p>
              <p>{c?.email} - {c?.phone}</p>
              { !allContactsIds.filter(id => id.includes(c.email)).length > 0 && status !== "pending" && ( 
                <button
                  data-tip="Importa in rubrica"
                  onClick={() => handleCreateContactOnTheFly(c)}
                  className="text-base inline-flex mt-2 text-primary-100 hover:text-primary-300 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  <FiUploadCloud />
                </button>
              )}

              { status === "pending" && (
                <InlineSpinner loading={status === "pending"} />
              )}
            </div>
          </div>
        ))}
      </div> }
    </section>
  )
}