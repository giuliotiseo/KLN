import { ImFilesEmpty } from "react-icons/im";

const EmptyResultPage = ({
  message = "",
  children
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-h-screen flex-1">
      <ImFilesEmpty className="text-4xl text-gray-500 dark:text-gray-700 opacity-50" />
      { message && <p className="text-gray-500 dark:text-gray-700 mt-4 text-lg opacity-50">{message}</p> }
      { children && <div className="my-4">
        { children }
      </div> }
    </div>
  )
}

export default EmptyResultPage;
