import DownloadButton from "../../../globals/components/buttons/DownloadButton";
import { SmallTitle } from "../../../globals/components/typography/titles";

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
export default ({ data }) => {
  return (
    <section className="bg-base-100 p-4 rounded-md">
      <SmallTitle styles="mb-4">Altri allegati</SmallTitle>
      {data?.length > 0 
        ? <ul className="pt-4 border-t border-light-100 dark:border-dark-100">
            { data.map(item => <AttachmentItem item={item} key={item.key} />)}
          </ul>
        : <p className="italic">Nessun allegato caricato</p>
      }
    </section>
  )
}