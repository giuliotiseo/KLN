import ClipLoader from "react-spinners/ClipLoader";

const FullSpinner = ({ loading, color = "#33a593" }) => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-light-300 dark:bg-dark-300">
      <ClipLoader color={color} loading={loading} size={50} />
    </div>
  )
}

export default FullSpinner;