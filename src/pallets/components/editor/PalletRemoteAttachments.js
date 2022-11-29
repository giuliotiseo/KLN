import { useEffect } from "react";
import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import LiveFiles from "../../../globals/components/dataDisplay/LiveFiles";
import LiveImage from "../../../globals/components/dataDisplay/LiveImage";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";
import { Paragraph } from "../../../globals/components/typography/paragraphs";
import { useGetUrlFile } from "../../../globals/libs/hooks";

// Sub components -------------------------------------------------------------------------------------------------------------------
const PalletCompilerContentHeader = () => <Paragraph styles="font-bold py-2">
  Caricamento allegati
</Paragraph>

// Sub component -------------------------------------------------------------------------------------------------------------------
function RemoteImage({ image, removeImage, addImage }) {
  const { fileUrl, setData, isLoading } = useGetUrlFile(image?.db_format || null);

  useEffect(() => {
    // Se rimuovo l'immagine caricata online:
    if(image.hasOwnProperty("keyToRemove") && image?.online) {
      setData(null);
    } else {
      setData(image.db_format);
    }
  }, [image, image?.online]);

  const imageToRender = {
    ...image.raw_format,
    fileUrl: image.raw_format?.fileUrl 
      ? image.raw_format.fileUrl
      : fileUrl 
        ? fileUrl 
        : null
  };
  
  if(isLoading) return <InlineSpinner />
  
  return (
    <LiveImage
      image={imageToRender?.fileUrl ? imageToRender : null}
      dropCallback={(payload) => addImage(payload)}
      removeCallback={removeImage}
      showEmptyBox={true}
    />
  )
}

// Main component -------------------------------------------------------------------------------------------------------------------
export default function PalletRemoteAttachments({
  addFile = () => console.log("Add file with <PalletRemoteAttachments />"),
  addImage = () => console.log("Add image with <PalletRemoteAttachments />"),
  removeImage = () => console.log("Remove image with <PalletRemoteAttachments />"),
  removeFile  = () => console.log("Remove file with <PalletRemoteAttachments />"),
  image = null,
  files = [],
}) {

  // console.log("Files in component", files);
  return (
    <CardDetails
      className="mb-4"
      header={<PalletCompilerContentHeader />}
    >
      {/* Content */}
      <section className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <RemoteImage
            image={image}
            removeImage={removeImage}
            addImage={addImage}
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