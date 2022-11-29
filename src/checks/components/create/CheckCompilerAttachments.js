import CardDetails from "../../../globals/components/dataDisplay/CardDetails"
import LiveFiles from "../../../globals/components/dataDisplay/LiveFiles";
import LiveImage from "../../../globals/components/dataDisplay/LiveImage";
import { Paragraph } from "../../../globals/components/typography/paragraphs"

// Sub components -------------------------------------------------------------------------------------------------------------------
const CheckCompilerContentHeader = () => <Paragraph styles="font-bold py-2">
  Caricamento allegati
</Paragraph>

// Main component -------------------------------------------------------------------------------------------------------------------
export default function CheckCompilerAttachments({
  files,
  image,
  addImage,
  removeImage,
  addFile,
  removeFile,
}) {
  return (
    <CardDetails
      className="mb-4"
      header={<CheckCompilerContentHeader />}
    >
      {/* Content */}
      <section className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <LiveImage
            image={image?.raw_format}
            dropCallback={(image) => addImage(image)}
            removeCallback={removeImage}
            showEmptyBox={true}
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