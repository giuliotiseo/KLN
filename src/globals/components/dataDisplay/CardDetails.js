import Button from "../buttons_v2/Button";
import { FiX } from "react-icons/fi";

const CardDetails = ({
  header,
  clear,
  children,
  footer,
  className = "",
  contentClassName = "p-4"
}) => {
  return (
    <div className={`bg-base-100 rounded-md ${className}`}>
      <header className="flex w-full justify-between items-center px-4 py-2 border-b border-light-50 dark:border-dark-200">
        { header }
        { clear && (
          <Button
            icon={<FiX />}
            onClick={clear}
            className="bg-light-300 dark:bg-dark-300 hover:bg-light-200 dark:hover:bg-dark-200 flex items-center justify-center w-[40px] h-[40px] text-center p-1 rounded-full ml-2"
          />
        )}
      </header>

      <main className={contentClassName}>
        { children }
      </main>

      { footer && <footer className="py-2 px-4 border-t border-light-50 dark:border-dark-200">
        { footer }
      </footer> }
    </div>
  )
}

export default CardDetails;