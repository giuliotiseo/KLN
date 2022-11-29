import Dropzone from "react-dropzone"
import ActionButton from "./ActionButton";
import { FiPlus } from "react-icons/fi";

const AddFileButton = ({
  maxFiles = 10,
  maxSize = 4000000,
  onChange,
  text = "Aggiungi file"
}) => {
  return (
    <Dropzone
      onDrop={onChange}
      maxFiles={maxFiles}
      maxSize={maxSize}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps({ className: "" })}>
          <input {...getInputProps()} />
          <ActionButton
            styles="btn-primary mt-4"
            text={text}
            icon={() => <FiPlus />}
          />
        </div>
      )}
    </Dropzone>
  )
}

export default AddFileButton;