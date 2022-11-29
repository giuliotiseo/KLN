import { Paragraph } from "../../globals/components/typography/paragraphs";
import { TinyTitle } from "../../globals/components/typography/titles";
import { FiDownload, FiX } from "react-icons/fi";
// Hooks
import DownloadButton from "../../globals/components/buttons/DownloadButton";

// Sub components ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const HeadingAttachmentsList = ({ showAttachments }) => (
  <header className="flex justify-between">
    <TinyTitle styles="mb-2">Lista allegati</TinyTitle>
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
      <Paragraph styles="italic">Nessun allegato trovato</Paragraph>
    </div>
  }

  return (
    <div className="p-2">
      <HeadingAttachmentsList showAttachments={showAttachments} />
      <ul>
        { docs[indexAttachment]?.files.map((file, index) => 
          <li className="flex py-1 border-b" key={file?.timestamp || index}>
            { file?.fileUrl && !remote && (<a className="text-primary-200 dark:text-primary-300 mr-2 inline-block" href={file.fileUrl}>{<FiDownload />}</a>)}
            { file?.key && file?.identityId && remote && <AttachmentItem item={file} />}
            { !remote && (file?.filename || file?.key || "Sconosciuto")}
          </li>
        )}
      </ul>
    </div>
  )
}