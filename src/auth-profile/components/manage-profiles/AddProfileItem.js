import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

export default function AddProfileItem() {
  return (
    <Link to="add-profile">
      <div className="m-4">
        <div className="flex flex-col hover:bg-light-100 dark:hover:bg-dark-100 items-center justify-center p-2 mx-auto w-[200px] h-[200px] text-gray-500 shadow-xl border-4 border-dotted border-gray-800 dark:border-gray-600 border-opacity-50">
          <FiPlus className="text-6xl text-gray-800 dark:text-gray-600 opacity-50" />
        </div>
      </div>
    </Link>
  )
}