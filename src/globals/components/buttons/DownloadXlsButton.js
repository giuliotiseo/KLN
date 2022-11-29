import InlineSpinner from "../spinners/InlineSpinner";
import { downloadExcel } from "../../libs/helpers";

const DownloadXlsButton = ({
  headings,
  dataType,
  title,
  subject,
  author,
  data,
  text,
  loading = false,
  icon,
  styles,
  sheetNames = ["download-excel"],
  customColFormatSetup = null
}) => {
  return (
    <button 
      className={`btn ${styles}`}
      // onClick={() => console.log('Leggo data: ', data)}
      onClick={() => downloadExcel({
        title,
        subject,
        author,
        data,
        headings,
        dataType,
        sheetNames,
        customColFormatSetup
      })}
    >
      <InlineSpinner color="#DDD" loading={loading} />
      { icon && <span>{ icon() }</span> }
      <span className="ml-1">{ text }</span>
    </button>
  )
}

export default DownloadXlsButton;