import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// Components
import Avatar from './Avatar';
import ActionButton from '../../globals/components/buttons/ActionButton';
// Assets
import { FiCamera } from 'react-icons/fi';
// Thunks
import { updateAvatarThunk } from '../state/userThunks';

export default function AvatarPicker({ avatar, username, styles, size }) {
  const [ newAvatarFile, setNewAvatarFile ] = useState(null);
  const [ filename, setFilename ] = useState('');
  const dispatch = useDispatch();

  // Trick to update continuosly the avatar image by clear the input
  useEffect(() => {
    setFilename('');
  }, [avatar]);

  useEffect(() => {
    setNewAvatarFile(null);
  }, [avatar])

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

    setNewAvatarFile(newFile);
  }

  return (
    <>
      <label 
        htmlFor={`avatar-picker`}
        id="avatar-picker-label"
        className={`relative cursor-pointer group ${size}`}
      >            
        <Avatar 
          localAvatar={newAvatarFile}
          styles={styles}
          size={size}
        />
                  
        <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-base-100 border rounded-full flex items-center justify-center">
          <FiCamera className="text-lg" />
        </div>
      </label>

      <input 
        className="hidden"
        type="file" 
        id={`avatar-picker`}
        value={filename}
        onChange={(e) => handleChangeAvatar(e.target.files[0])}
      />

      { newAvatarFile && (
        <div className="flex absolute right-0 bottom-5">
          <ActionButton
            text="Salva"
            onClick={() => dispatch(updateAvatarThunk({ file: newAvatarFile, username }))}
            styles="btn--center btn-primary flex-1 my-1 mr-1"
          />
          
          <ActionButton
            text="Annulla"
            onClick={() => setNewAvatarFile(null)}
            styles="btn--center btn-ghost flex-1"
          />
        </div>
      )}
    </>
  )
}