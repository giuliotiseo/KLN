import { FiPaperclip } from 'react-icons/fi';
import { handleChangeFile } from '../../libs/helpers';

// Main components ------------------------------------------------------------------------------------------------------------------
const FilesPickerButton = ({
  id = "file-picker-default",
  text = "Carica file",
  className = "",
  callback = () => console.log("Default log: <FilesPickerButton />")
}) => (
  <div className={className}>
    <label  
      htmlFor={`${id}`}
      className="btn-primary-transparent"
    >
      <span className="flex items-center justify-center">
        <FiPaperclip />
      </span>
      <span>{text}</span>
    </label>

    <input 
      className="hidden"
      type="file" 
      id={`${id}`} 
      onChange={(e) => handleChangeFile(e.target.files[0], callback)}
      multiple
    />
  </div>
)

export default FilesPickerButton;