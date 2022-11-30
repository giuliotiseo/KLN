import { v4 } from "uuid";
import Checkbox from "../../globals/components/dataEntry/Checkbox";
import { SmallParagraph } from "../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../globals/components/typography/titles";
import { CONTACT_TYPE_DESCRIPTION } from "../libs/helpers";
import ContactAvatar from "./ContactAvatar";

export default function ContactsPicker({ initialContactIds = [], title, subtitle, storekeepers, styles, handleSelectedContacts }) {
  const storekeepersList =  Object.keys(storekeepers).map(sk_id => storekeepers[sk_id]);
  return (
    <div className={`${styles}`}>
      <header className="pt-4 pb-2">
        { title && <SmallTitle>{title}</SmallTitle> }
        { subtitle && typeof subtitle === "string"&& <SmallParagraph styles="label">{subtitle}</SmallParagraph> }
        { subtitle && typeof subtitle === "function" && subtitle() }
      </header>
      <ul>
        { storekeepersList?.length > 0 
          ? storekeepersList.map(sk => (
            <li key={sk.id} className={`relative flex border-b border-light-100 dark:border-dark-200 last:border-b-0 hover:bg-light-100 dark:hover:bg-dark-100 dark:hover:bg-opacity-60 cursor-pointer`}>
              <label htmlFor={sk.id} className="flex flex-1 p-4 cursor-pointer">
                <Checkbox
                  key={sk.id}
                  id={sk.id}
                  name={`contactpicker_${v4()}`}
                  label={null}
                  value={sk.id}
                  initialStatus={() => {
                    // Get the part with email to know the status
                    const idParameterStatus = sk.id.includes("-c-") ? sk.id?.split("-c-")[0] : sk.id;
                    const initialParameterIds = initialContactIds.map(id => id.includes("-c-") ? id?.split("-c-")[0] : id)
                    return initialParameterIds.includes(idParameterStatus);
                  }}
                  onChange={(value) => handleSelectedContacts(value)}
                />

                <ContactAvatar
                  avatar={sk.avatar}
                  size="w-12 h-12 mr-3"
                  type={sk.type}
                />

                <div className="text-dark-100 dark:text-light-300">
                  <span className="block text-base md:text-lg">{sk.name}</span>
                  {sk?.job && (
                  <span className="block text-sm text-primary-200 dark:text-primary-300">
                    Reparto {CONTACT_TYPE_DESCRIPTION[sk.type].toLowerCase()} presso {sk.job}
                  </span> )}
                </div>
              </label>
            </li>
          ))
          : <p className="alert-info text-sm px-2">Nessun magazziniere disponibile</p>
        }
      </ul>
    </div>
  )
}