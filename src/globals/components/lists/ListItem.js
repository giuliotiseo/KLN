import { Link } from "react-router-dom";
import Checkbox from "../dataEntry/Checkbox";
import { globalStatusColorsBorder } from "../../libs/helpers";

const ListItem = ({
  item,
  title = "Nome elemento",
  topTitle = "",
  aside,
  children,
  path = "/",
  multiselect,
  selectedIds,
  setSelectedIds,
  dropdown = null,
  confirmationModal = null,
  forcedStatus = null,
  dropdownClassName = ""
}) => {
  if(!item) return null;
  return (
    <li className="relative flex items-start shadow-md bg-base-100 rounded-lg mb-2">
      { multiselect && (
        <Checkbox
          id={item.id}
          name={`${item.id}`}
          label={null}
          value={selectedIds.includes(item.id)}
          initialStatus={selectedIds.includes(item.id)}
          controlled={true}
          onChange={() => {
            selectedIds.includes(item.id)
              ? setSelectedIds(prev => prev.filter(id => id !== item.id))
              : setSelectedIds(prev => prev.concat(item.id));
          }}
        /> 
      )}

      <section className="flex-1 rounded-lg overflow-hidden">        
        <div className="flex flex-col w-full">
          <div className={`border-l-4 ${globalStatusColorsBorder?.[forcedStatus || item?.status] || ""} flex p-4 flex-col md:flex-row items-start`}>
            { aside && (
              <aside className="flex flex-row md:flex-col mb-4 md:mb-0 justify-start md:justify-center items-center mr-2">
                { aside }
              </aside>
            )}

              <div className="w-full">
                <header className="ml-2">
                  { topTitle && <div className="text-xs uppercase text-gray-400 dark:text-gray-500">{topTitle}</div>}
                  { title && (
                    <h3 className='inline-flex items-center text-lg md:text-xl uppercase'>
                      { path
                        ? <Link to={path} className="mr-2 flex-1 hover:text-primary-200 dark:text-primary-300 transition-colors">
                          <span>{title}</span>
                        </Link>
                        : <span>{title}</span>
                      }
                    </h3>
                  )}
                </header>
                
                <section className="mx-2 w-full">
                  { children }
                </section>
              </div>
          </div>
        </div>
      </section>

      {/* List item dropdown */}
      { dropdown && <div className={`mt-4 mr-4 ${dropdownClassName}`}>
        { dropdown }
      </div> }

      {/* Modal to show up on trigger */}
      { confirmationModal && confirmationModal }
    </li>
  )
}

export default ListItem;