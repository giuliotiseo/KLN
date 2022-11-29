import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Storage } from 'aws-amplify';
// Assets
import { UserIcon } from '../../globals/assets/icons';
import { selectAvatar } from '../state/userSlice';

export default function Avatar({ localAvatar = null, styles, size }) {
  const [ avatarUrl, setAvatarUrl ] = useState(null);
  const avatar = useSelector(selectAvatar);

  // Get the avatar URL from S3
  const avatarRenderer = useCallback(async (key, identityId, extension) => {
    // Storage config object
    const configs = { level: 'public', cacheControl: 'max-age', identityId: identityId, download: false };
    // Get file from S3 Storage
    const url = await Storage.get(key, configs);
    setAvatarUrl(url);
  }, [])

  // Trigger side effects when avatar changes
  useEffect(() => {
    if(avatar && (avatar.key, avatar.identityId)) avatarRenderer(avatar.key, avatar.identityId, avatar.extension);
  }, [avatar, avatarRenderer])

  // In case of an Avatar Picker control this Avatar component
  if(localAvatar) {
    return (<>
      <div className={`${styles}`}>
        <div 
          className={`rounded-full mr-3 block bg-cover bg-center ${size}`}
          style={{ backgroundImage: `url(${localAvatar.fileUrl})`}} 
        />
      </div>
    </>
    )
  }

  return (
    <div className={`${styles}`}>
      { avatar && avatar.key
        ? <div
            className={`rounded-full mr-3 block bg-cover bg-center border-4 border-primary-200 ${size}`}
            style={{ backgroundImage: `url(${avatarUrl})`}} 
          />
        : <UserIcon 
            className={`fill-current h-auto block bg-primary-200 p-2 rounded-full mr-3 text-light-300 ${size}`} 
          />
      }
    </div>
  )
}