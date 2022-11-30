import { FiRefreshCcw } from "react-icons/fi";
import Button from "../../../globals/components/buttons_v2/Button";
import InputCheckbox from "../../../globals/components/dataEntry_v2/InputCheckbox";
import Avatar from "../../../globals/components/layout/Avatar";
import Spinner from "../../../globals/components/layout/Spinner";
import Pagination from "../../../globals/components/lists_v2/Pagination";

export default function ContactsPicker({
  initialContactIds = [],
  title = null,
  subtitle,
  storekeepers,
  className,
  callback = () => console.log("Default handle selected contact in <ContactsPicker />"),
  refreshList,
  isLoading,
  pagination
}) {
  const { goBack, goNext, page, nextToken, previousTokens } = pagination;
  return (
    <div className={`w-full ${className}`}>
      { title && <header>
        { title && <h3 className="title-3">{title}</h3> }
        { subtitle && typeof subtitle === "string"&& <p className="label">{subtitle}</p> }
        { subtitle && typeof subtitle === "function" && subtitle() }
      </header> }

      <div className="w-full">
        <div className="sticky top-0 bg-base-100 flex flex-wrap gap-2 justify-between p-2 border-b border-light-100 dark:border-dark-100">
          <Button
            icon={<FiRefreshCcw />}
            text="Aggiorna elenco"
            onClick={refreshList}
            className="btn-ghost"
          />

          <Pagination
            goBack={goBack}
            goNext={goNext}
            page={page}
            nextToken={nextToken}
            previousTokens={previousTokens}
            className="bg-base-100 border bg-base-100 rounded-full"
          />
        </div>

        { isLoading
          ? <div className="p-2">
              <Spinner className="h-5 w-5 text-primary-200 dark:text-primary-300" />
            </div>
          : <ul className="w-full">
            { storekeepers?.length > 0 
              ? storekeepers.map(sk => (
                <li key={sk.id} className={`
                  text-left w-full p-2 rounded-md relative flex border-b border-light-100 dark:border-dark-200 last:border-b-0 cursor-pointer
                  ${initialContactIds.includes(sk.id)
                    ? ' bg-secondary-200 text-light-100'
                    : ' bg-trabsparent text-dark-50 dark:text-light-100 hover:bg-light-100 dark:hover:bg-dark-100 dark:hover:bg-opacity-60'
                  }
                `}>
                  <Avatar
                    name={`${sk.name} ${sk.surname}`}
                    size={35}
                    src={sk?.avatar}
                  />

                  <div className="flex flex-col w-full">
                    <InputCheckbox
                      key={sk.id}
                      id={sk.id}
                      name={sk.id}
                      className="w-full"
                      inputClassName="w-full flex-col items-start"
                      label={<div className="flex flex-col justify-start px-2 w-full">
                        <p className="text-left">{sk.name} {sk.surname}</p>
                        { sk?.jobName && (
                          <span className="block text-xs text-opacity-50 text-left">
                            {sk.jobName}
                          </span>
                        )}
                      </div>}
                      value={sk}
                      callback={callback}
                      checked={initialContactIds.includes(sk.id)}
                      hideInput={true}
                    />
                  </div>
                </li>
              ))
              : <p className="alert-info text-sm px-2">Nessun magazziniere disponibile</p>
            }
          </ul>
        }

      </div>
    </div>
  )
}