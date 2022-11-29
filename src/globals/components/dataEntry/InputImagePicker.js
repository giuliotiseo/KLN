import ImagePickerButton from "../buttons/ImagePickerButton";
import LiveImage from "../dataDisplay/LiveImage";

// Main component ------------------------------------------------------------------------------------------------------------------
export default function InputImagePicker({
  id = "default-image-picker",
  liveImage = null,
  callback,
  textButton = "Carica immagine",
  pickerClassName,
}) {
  return (
    <div className="max-w-full">
      <ImagePickerButton
        id={id}
        liveImage={liveImage}
        className={pickerClassName}
        text={textButton}
      />

      <LiveImage
        image={liveImage}
        callback={callback}
      />
    </div>
  )
}