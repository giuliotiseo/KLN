import { FiCamera } from 'react-icons/fi';
import { handleChangeFile } from '../../libs/helpers';

const ImagePickerButton = ({
  id,
  liveImage,
  text = "Carica immagine",
  className,
  callback = () => console.log("Default log: <ImagePickerButton />")
}) => (
  <div>
    <label 
      htmlFor={id}
      className={`${!liveImage ? "btn-primary-transparent" : "disabled-item"} ${className}`}
    >                 
      <span className="flex items-center justify-center">
        <FiCamera className="text-lg mr-2" />
      </span>
      <span>{text}</span>
    </label>

    {/* Hide element: */}
    <input 
      id={id}
      className="absolute -top-full hidden"
      type="file" 
      onChange={(e) => handleChangeFile(e.target.files[0], callback)}
      disabled={liveImage}
    />
  </div>
)


export default ImagePickerButton;
