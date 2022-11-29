import ClipLoader from "react-spinners/ClipLoader";

const ScreenSpinner = ({ loading, color }) => {
  return (
    <div className="fixed flex left-0 top-0 items-center justify-center flex-1 h-screen w-screen bg-light-300 dark:bg-dark-200">
      <ClipLoader color={color} loading={loading} size={50} />
    </div>
  )
}

export default ScreenSpinner;