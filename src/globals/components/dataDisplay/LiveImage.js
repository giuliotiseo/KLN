import DefaultButton from "../buttons/DefaultButton";
import LiveEmptyBox from "./LiveEmptyBox";
import { SmallTitle } from "../typography/titles";
import { FiTrash, FiCamera } from "react-icons/fi";

const LiveImage = ({
  image,
  dropCallback,
  removeCallback,
  uploadText = "Carica una foto",
  loadedText = "Immagine caricata: "
}) => {
  return image 
  ? <div className="inline-block relative">
      <SmallTitle styles="my-2">{loadedText}</SmallTitle>
      <img
        src={`${image.fileUrl}`}
        className="max-w-full h-auto rounded-md mt-4 border border-zinc-200 dark:border-zinc-800"
      />
      <DefaultButton
        onClick={() => removeCallback(null)}
        icon={<FiTrash />}
        className="absolute text-lg right-0 top-0 translate-x-1/2 text-red-600 border border-red-600 p-1 rounded-full bg-base-100 hover:bg-red-100 dark:hover:bg-red-900"
      />
    </div>
  : <LiveEmptyBox
      maxFiles={1}
      accept="image/*"
      className="mt-4"
      callback={dropCallback}
      >
      <FiCamera className="text-2xl" />
      <SmallTitle>
        { uploadText }
      </SmallTitle>
    </LiveEmptyBox>
}
export default LiveImage;