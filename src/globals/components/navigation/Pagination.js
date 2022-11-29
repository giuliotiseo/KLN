import ActionButton from "../buttons/ActionButton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ControlledSelector from "../dataEntry/ControlledSelector";

export default function Pagination({ limit, nextToken, previousToken, changePage, changeLimit, styles }) {  
  return (
    <div className={`flex items-center ${styles}`}>
      { limit && (
        <div className="text-sm flex items-center pl-4 py-2 text-md border-r border-light-50 dark:border-dark-100">
          <label className="whitespace-nowrap mr-2">Mostra risultati: </label>
          <ControlledSelector
            id="contact-limit"
            value={limit}
            onChange={changeLimit}
            styles="mr-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </ControlledSelector>
        </div>
      )} 

      { previousToken && previousToken.length !== 0 && (
        <ActionButton
          icon={() => <FiChevronLeft />}
          styles="text-2xl bg-light-200 dark:bg-dark-200 hover:bg-light-100 dark:hover:bg-dark-200"
          onClick={() => changePage('BACK')}
        />
      )}

            
      { nextToken && (
        <ActionButton 
          icon={() => <FiChevronRight />}
          styles="text-2xl bg-light-200 dark:bg-dark-200 hover:bg-light-100 dark:hover:bg-dark-200"
          onClick={() => changePage('NEXT')}
        />
      )}
    </div>
  )
}