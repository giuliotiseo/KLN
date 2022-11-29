import { useState } from 'react';
// Components
import Divider from '../../globals/components/layout/Divider';
import ProfileCardHeader from './ProfileCardHeader';
import ProfileCardBody from './ProfileCardBody';
import EditInfoModal from './EditInfoModal';
import EditPasswordModal from './EditPasswordModal';

//  Main component --------------------------------------------------------------------------------
export default function ProfileCard({ profile }) {
  const [ modal, setModal ] = useState(false);
  return (
    <div className="bg-base-100 p-4 rounded-md">
      <ProfileCardHeader
        profile={profile}
        setModal={setModal}
      />

      <Divider />

      <ProfileCardBody
        profile={profile}
        setModal={setModal}
      />

      {/* Show modal to find new carrier */}
      { modal === 'EDIT_INFO' && (
        <EditInfoModal
          modal={modal} 
          close={() => setModal(false)}
          profile={profile}
        />
      )}

      { modal === 'EDIT_PASS' && (
        <EditPasswordModal
          modal={modal} 
          close={() => setModal(false)}
          profile={profile}
        />
      )}
    </div>
  )
}