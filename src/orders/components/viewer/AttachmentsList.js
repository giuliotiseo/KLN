import { FiDownload, FiX } from "react-icons/fi";
import DownloadButton from "../../../globals/components/buttons_v2/DownloadButton";

// Sub components ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const HeadingAttachmentsList = ({ showAttachments }) => (
  <header className="flex justify-between">
    <h4 className="title-3 mb-2">Lista allegati</h4>
    <button onClick={() => showAttachments(false)}><FiX /></button>
  </header>
)

function AttachmentItem({ item }) {
  if(!item?.filename && !item?.key) return null;
  
  return (
    <span className="flex justify-between py-2 my-1 first:mt-0 first:pt-0 border-b border-light-50 dark:border-dark-200 last:border-0 last:pb-0">
      <DownloadButton text={`Scarica ${item?.filename || item.key }`} data={item} />
    </span>
  )
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function AttachmentsList({ docs, indexAttachment, showAttachments, remote = false }) {
  if(!docs || docs?.[indexAttachment]?.files?.length <= 0) {
    return <div className="p-2">
      <HeadingAttachmentsList showAttachments={showAttachments} />
      <p className="italic">Nessun allegato trovato</p>
    </div>
  }

  return (
    <div className="p-2">
      <HeadingAttachmentsList showAttachments={showAttachments} />
      <ul>
        { docs[indexAttachment]?.files.map((file, index) => 
          <li className="flex py-1 border-b" key={file?.raw_format?.timestamp || index}>
            { file?.raw_format?.fileUrl && !remote && (<a className="text-primary-200 dark:text-primary-300 mr-2 inline-block" href={file?.raw_format?.fileUrl} download={true}>{<FiDownload />}</a>)}
            { file?.raw_format?.key && file?.raw_format?.identityId && remote && <AttachmentItem item={file?.db_format} />}
            { !remote && (file?.raw_format?.filename || file?.raw_format?.key || "Sconosciuto")}
          </li>
        )}
      </ul>
    </div>
  )
}