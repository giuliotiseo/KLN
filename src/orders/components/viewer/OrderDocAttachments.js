import DownloadButton from "../../../globals/components/buttons/DownloadButton";
import CardDetails from "../../../globals/components/dataDisplay/CardDetails";

// Sub component ------------------------------------------------------------------------------------------------------------------------------------------------------------
function AttachmentItem({ item }) {
  if(!item?.filename && !item?.key) return null;
  return (
    <li className="flex justify-between py-2 my-1 first:mt-0 first:pt-0 border-b border-light-50 dark:border-dark-200 last:border-0 last:pb-0">
      <span>{item?.filename || item.key }</span>
      <DownloadButton text="Scarica" data={item} />
    </li>
  )
}

// Main component ------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function OrderDocAttachments({ data }) {
  if(data?.length <= 0) return null;
  return (
    <CardDetails
      header={<h4 className="title-4">Allegati</h4>}
      footer={null}
      clear={false}
    >
      <ul>
        { data.map(item => <AttachmentItem item={item.db_format} key={item.db_format.key} />)}
      </ul>
    </CardDetails>
  )
}