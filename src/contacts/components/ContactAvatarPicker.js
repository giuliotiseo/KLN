// Components
import ContactAvatar from './ContactAvatar';
import { AiOutlineClear } from 'react-icons/ai';
import { FiCamera } from 'react-icons/fi';

export default function ContactAvatarPicker({ type, containerStyle, styles, size, contactAvatarFile, setContactAvatarFile, disabled  = false }) {
  const handleChangeAvatar = (file) => {
    if(!file) return null;
    const filename = file.name;
    const fileType = file.name.split(".").pop();
    const newFile = {
      fileUrl: URL.createObjectURL(file),
      file,
      filename,
      fileType,
      messageType: file.type.substr(0, file.type.indexOf('/')).toUpperCase()
    }

    setContactAvatarFile(newFile);
  }

  return (
    <div className={`flex flex-col items-center w-full justify-center ${containerStyle}`}>
      <div className="relative">
        <label
          onClick={(e) => disabled && e.preventDefault()}
          htmlFor={`avatar-picker`}
          id="avatar-picker-label"
          className={`relative group ${disabled ? 'cursor-default' : 'cursor-pointer'} ${size}`}
        > 
          <div className="relative">
            <ContactAvatar
              readyAvatar={contactAvatarFile}
              styles={styles}
              size={size}
              type={type}
            />
          
            { !disabled && (
              <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-base-100 border rounded-full flex items-center justify-center">
                <FiCamera className="text-lg" />
              </div>
            )}
          </div>

          { contactAvatarFile && !disabled && (
            <div className={`flex flex-col items-center justify-center absolute top-0 left-0 translate-x-0  rounded-full bg-dark-300 opacity-0 hover:opacity-100 bg-opacity-50 ${size}`}>
              <button onClick={() => setContactAvatarFile(null)} className="text-4xl opacity-50 hover:opacity-100">
                <AiOutlineClear className="text-light-300" />
              </button>
            </div>
          )}
        </label>

        <input 
          className="hidden"
          type="file" 
          id={`avatar-picker`}
          onChange={(e) => handleChangeAvatar(e.target.files[0])}
        />

      </div>
    </div>
  )
}