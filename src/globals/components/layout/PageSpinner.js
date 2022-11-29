import Spinner from "./Spinner";

const PageSpinner = ({ message = "", className = ""}) => {
  return (
    <div className={`fixed flex flex-col left-0 top-0 items-center justify-center flex-1 h-screen w-screen bg-base-100 ${className}`}>
      <Spinner />
      { message && <p className="text-lg text-center mt-2">{message}</p>}
    </div>
  )
}

export default PageSpinner;