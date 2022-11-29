import LiveEmptyBox from "./LiveEmptyBox";
import { SmallTitle } from "../typography/titles";
import { FiX, FiPaperclip } from "react-icons/fi";
import AddFileButton from "../buttons/AddFileButton";
import Button from "../buttons_v2/Button";
import { FaTrashRestoreAlt } from "react-icons/fa";

// Helper functions ------------------------------------------------------------------------------------------------------------------
const handleDrop = (files, callback) => {
  for(let file of files) {
    callback(file);
  }
}

// Main component ------------------------------------------------------------------------------------------------------------------
const LiveFiles = ({
  files = [],
  className = "",
  removeCallback = (list) => console.log("Remove from list", list),
  dropCallback,
  uploadText = "Carica allegati",
  loadedText = "Altri allegati: ",
  restoreFile = () => console.log("Default restore file"),
  dropZoneHeight = null,
}) => files?.length > 0
  ? (
    <div className={className}>
      { loadedText && <SmallTitle styles="my-2">{loadedText}</SmallTitle> }
      { files && files.map((file, index) => {
        return (
          <div className="flex items-center mb-2" key={file.raw_format.fileUrl || file.db_format.key}>
            { !file.hasOwnProperty("keyToRemove") && (
              <button
                className="hover:text-secondary-200 dark:hover:text-secondary-300"
                onClick={() => removeCallback(index)}
              >
                <FiX />
              </button>
            )}
            <div className={`italic ml-2`}>
              {file?.keyToRemove && file?.keyToRemove === file?.db_format?.key
                ? <Button
                    icon={<FaTrashRestoreAlt className="text-sm" />}
                    className="btn-ghost inline-block mr-1"
                    onClick={() => restoreFile(index)}
                  />
                  : null
              }

              <p className={`inline-block
                ${file?.keyToRemove && file?.keyToRemove === file?.db_format?.key
                  ? 'line-through text-zinc-400 dark:text-zinc-700 opacity-70'
                  : 'text-secondary-200 dark:text-secondary-300'
                }
              `}>{ file.raw_format.filename }</p>
            </div>
          </div>
        )}
      )}

      <AddFileButton
        onChange={files => handleDrop(files, dropCallback)}
        text="Aggiungi allegato"
      />
    </div>
  )
  : (
    <LiveEmptyBox
      className="mt-4"
      maxFiles={10}
      callback={dropCallback}
      inputHeight={dropZoneHeight}
    >
      <FiPaperclip className="text-2xl" />
      <SmallTitle>
        { uploadText }
      </SmallTitle>
    </LiveEmptyBox>
  )
export default LiveFiles;