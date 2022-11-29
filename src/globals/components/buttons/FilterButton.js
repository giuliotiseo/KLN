import { RiFilterLine, RiFilterOffLine } from "react-icons/ri";

export default function FilterButton({
  onClick,
  open = false,
  text,
  className = ""
}) {
  return (
    <button onClick={onClick} className={`flex font-bold bg-primary-200 dark:bg-primary-300 text-center items-center justify-center rounded-full min-w-[40px] min-h-[40px] ${className}`}>
      { open 
        ? <RiFilterOffLine className="text-lg text-light-100 dark:text-light-100" />
        : <RiFilterLine className="text-lg text-light-100 dark:text-light-100" />
      }
      { (text && text !== '') && <span className="ml-2">{ text }</span> }
    </button>
  )
}