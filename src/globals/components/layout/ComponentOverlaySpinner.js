import Spinner from "./Spinner";

const ComponentOverlaySpinner = ({ message = "", className = ""}) => {
  return (
    <div className={`absolute flex flex-col left-0 top-0 items-center justify-center flex-1 h-full w-full bg-base-100 ${className}`}>
      <Spinner className="h-10 w-10 text-primary-200 dark:text-primary-300" />
      { message && <p className="text-lg text-center mt-2">{message}</p>}
    </div>
  )
}

export default ComponentOverlaySpinner;