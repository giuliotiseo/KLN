import { FiRefreshCw } from "react-icons/fi";
import SimpleBar from "simplebar-react";
import Button from "../buttons_v2/Button";
import Spinner from "../layout/Spinner";
import Pagination from "../lists_v2/Pagination";

export default function DropdownComboBox({
  data,
  onClick,
  dropdownLabel,
  focusIndex,
  clickOutsideRef,
  isFetching = false,
  pagination,
  refetch = null,
}) {

  if(!data && !isFetching) return (
    <div ref={clickOutsideRef} className="absolute top-full h-10 rounded-md w-full bg-light-200 dark:bg-dark-200 z-10 shadow-lg">
      <div className="flex">
        <p className="text-sm m-2 opacity-70">Nessun risultato trovato</p>
        <Button text="Aggiorna" className="btn-ghost text-xs" onClick={refetch} icon={<FiRefreshCw className="text-sm" />} />
      </div>
    </div>
  )

  return (
    <div ref={clickOutsideRef} className="absolute top-full h-32 w-full bg-light-200 dark:bg-dark-200 z-10 shadow-lg rounded-md">
      { data?.length > 0 && !isFetching
        ? <SimpleBar style={{ height: '100%'}}>
            <div className="bg-base-100 rounded-full mx-2 sticky top-0 flex items-center">
              { refetch && <Button className="ml-2 btn-ghost text-xs" onClick={refetch} icon={<FiRefreshCw className="text-sm" />} /> }

              <h5 className="w-full text-xs font-bold text-dark-100 dark:text-light-300 opacity-40 uppercase my-2 mx-2">
                { dropdownLabel }
              </h5>

              { pagination && (
                <Pagination
                  goBack={pagination.goBack}
                  goNext={pagination.goNext}
                  page={pagination.page}
                  nextToken={pagination.nextToken}
                  previousTokens={pagination.previousTokens}
                  className="text-xs"
                />
              )}
            </div>
            <ul>
              { data.map((elem, index) => {
                return (
                  <li
                    key={index} 
                    className={`p-2 text-xs cursor-pointer hover:bg-light-100 dark:hover:bg-dark-100 ${index === focusIndex ? 'border border-secondary-200 dark:border-secondary-200 border-opacity-50 dark:border-opacity-50 bg-light-200 dark:bg-dark-200 rounded-md' : ''}`}
                    onClick={() => onClick(elem)}>
                    {elem.text}
                  </li>
                )
              })}
            </ul>
          </SimpleBar>
        : isFetching && <div className="my-2 flex items-center">
          <Spinner className = "h-4 w-4 ml-1 text-primary-200 dark:text-primary-300"/>
          <h5 className="text-xs mb-2 font-bold text-dark-100 dark:text-light-300 opacity-40 uppercase my-2 mx-2">
            Ricerca in corso...
          </h5>
        </div>
      }

      { !isFetching && data?.length <= 0 && <p className="text-sm mt-4 ml-4 text-gray-500 dark:text-gray-400">Nessun risultato</p>}
    </div>
  )
}