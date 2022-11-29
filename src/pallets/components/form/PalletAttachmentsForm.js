import CardDetails from "../../../globals/components/dataDisplay/CardDetails"
import LiveFiles from "../../../globals/components/dataDisplay/LiveFiles";
import LiveImage from "../../../globals/components/dataDisplay/LiveImage";
import { TinyTitle } from "../../../globals/components/typography/titles";

// Sub components -------------------------------------------------------------------------------------------------------------------
const PalletAttachmentsFormHeader = () => <TinyTitle styles="py-2">
  Caricamento allegati
</TinyTitle>

// Main component -------------------------------------------------------------------------------------------------------------------
export default function PalletAttachmentsForm({
  className,
  files,
  image,
  addImage,
  removeImage,
  addFile,
  removeFile,
}) {
  return (
    <CardDetails
      className={`mb-4 ${className}`}
      header={<PalletAttachmentsFormHeader />}
    >
      {/* Content */}
      <section className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <LiveImage
            image={image?.raw_format}
            dropCallback={(image) => addImage(image)}
            removeCallback={removeImage}
            showEmptyBox={true}
            uploadText="Carica foto del buono pallet"
            loadedText="Buono pallet caricato:"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <LiveFiles
            files={files}
            dropCallback={(file) => addFile(file)}
            removeCallback={(indexToRemove) => removeFile(indexToRemove)}
            showEmptyBox={true}
          />
        </div>
      </section>
    </CardDetails>
  )
}