import DownloadButton from "../../../globals/components/buttons_v2/DownloadButton";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner"

export default ({
  raw_image = null,
  src,
  orderStamp = "",
  stamp = "",
  loading
}) => {
  if(loading) return <InlineSpinner />
  if(!src) return null;
  return (
    <div className="text-center mb-4">
      <img
        src={src}
        alt={`Assegno ${stamp} per ordine ${orderStamp}`}
        className="block mx-auto w-full max-w-full p-2 border-4 border-dotted bg-base-100"
      />

      { raw_image && (
        <DownloadButton
          text="Scarica foto"
          data={raw_image}
          containerClassName="text-center mt-4"
          buttonClassName="btn btn-primary inline-flex mx-auto text-light-300 dark:text-light-300"
        />
      )}
    </div>
  )
}