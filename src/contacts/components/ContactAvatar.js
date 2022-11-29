import { useState, useEffect, useCallback } from 'react';
import { Storage } from 'aws-amplify';
// Assets
import { UserIcon } from '../../globals/assets/icons';import { FiBriefcase } from 'react-icons/fi';
import { CONTACT_TYPES_SCOPE } from '../libs/helpers';
import { useIsMountedRef } from '../../globals/libs/hooks';
import InlineSpinner from '../../globals/components/spinners/InlineSpinner';

export default function ContactAvatar({ avatar, type, readyAvatar = null, styles, size }) {
  const [ avatarUrl, setAvatarUrl ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const isMountedRef = useIsMountedRef(true); // utils for cleanup component

  const avatarRenderer = useCallback(async (key, identityId, extension) => {
    let url = null;
    try {
      // Storage config object
      const configs = { level: 'public', identityId: identityId, cacheControl: 'max-age', download: false };
      // Get file from S3 Storage
      url = await Storage.get(key, configs);
      setAvatarUrl(url);
      isMountedRef.current = false;
    } catch(e) { 
      console.error('Impossibile ottenere avatar', e)
      isMountedRef.current = false;
    };
  }, [isMountedRef]);

  useEffect(() => {
    setLoading(true);
    // If is loaded on ddb
    if(isMountedRef.current && readyAvatar && (readyAvatar.key, readyAvatar.identityId)) {
      avatarRenderer(readyAvatar.key, readyAvatar.identityId);
    }

    else if(isMountedRef.current && avatar && (avatar.key, avatar.identityId)) {
      avatarRenderer(avatar.key, avatar.identityId, avatar.extension);
    }
    setLoading(false);

    return () => isMountedRef.current = false;
  }, [isMountedRef, readyAvatar, avatar, avatarRenderer ]);

  if(loading) {
    return (
      <>
        <div className={`inline-flex items-center justify-center bg-primary-200 rounded-full ${size}`}>
          <InlineSpinner color="#FFF" loading={loading} />
        </div>
      </>
    )
  }

  // This is in case of local upload file (tipically of create mode)
  if(readyAvatar && readyAvatar?.fileUrl) {
    return (
      <>
        <div className={`${styles}`}>
          <div 
            className={`rounded-full block bg-cover bg-center ${size}`}
            style={{ backgroundImage: `url(${readyAvatar?.fileUrl})`}} 
          />
        </div>
      </>
    )
  }

  // This is in case of a remote avatar (tipically for edit mode)
  else if(readyAvatar && !readyAvatar?.fileUrl) {
    return (
      <>
        <div className={`relative ${styles}`}>
          <InlineSpinner color="#FFF" loading={loading} />
          <div 
            className={`rounded-full block bg-cover bg-center ${size}`}
            style={{ backgroundImage: `url(${avatarUrl})`}} 
          />
        </div>
      </>
    )
  } 

  return (
    <div className={`${styles}`}>
      { avatar && avatar.key
        ? <div
            className={`rounded-full block bg-cover bg-center border-2 border-primary-200 ${size}`}
            style={{ backgroundImage: `url(${avatarUrl})`}} 
          />
        : type === 'COMPANY' || CONTACT_TYPES_SCOPE[type] === 'COMPANY'
          ? <div className={`inline-flex items-center justify-center bg-primary-200 rounded-full ${size}`}>
              <FiBriefcase className={`h-auto block text-light-300 w-2/3 mx-auto`} />
            </div>
          : <UserIcon 
            className={`fill-current h-auto block bg-primary-200 p-2 rounded-full text-light-300 ${size}`} 
          />
      }
    </div>
  )
}