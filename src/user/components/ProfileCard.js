import { useState } from 'react';
import { useDispatch } from 'react-redux';
// Components
import AvatarPicker from './AvatarPicker';
import { LargeTitle, SmallTitle } from "../../globals/components/typography/titles";
import { LargeParagraph, Paragraph } from '../../globals/components/typography/paragraphs';
import ActionButton from '../../globals/components/buttons/ActionButton';
import Modal from '../../globals/components/layout/Modal';
import Divider from '../../globals/components/layout/Divider';
import SearchPlaces from '../../globals/components/dataEntry/SearchPlaces';
import TextEditor from '../../globals/components/dataEntry/TextEditor';
import FormText from '../../globals/components/dataEntry/FormText';
// Helpers
import { companyTypeDescriptor, roleFinder } from '../../globals/libs/helpers';
// Assets
import { EditIcon, PinIcon, ReloadIcon } from '../../globals/assets/icons';
// Actions
import { changeUserLocation } from '../state/userSlice';
// Thunks
import { updateProfileInfoThunk, updateProfileLocationThunk, updateProfileNoteThunk } from '../state/userThunks';
import InlineSpinner from '../../globals/components/spinners/InlineSpinner';

//  Sub components: Display --------------------------------------------------------------------------------
const DisplayLocation = ({ location, onClick }) => {
  return (
    <div className="flex justify-between items-center border-b dark:border-dark-200 mb-4 pb-1">
      <div className="flex items-center">
        <PinIcon className="w-4 h-auto fill-current text-opacity-50 text-dark-100 dark:text-light-100 dark:text-opacity-50" />
        <span className="inline=block ml-1">
          {location.address}
        </span>
      </div>
      <ActionButton 
        styles="btn--center btn-ghost ml-4 text-sm" 
        text="Cambia" 
        onClick={onClick}
        icon={() => <ReloadIcon className="fill-current w-4 h-auto" />}
        display="flex"
      />
    </div>
  )
}

//  Sub components: Modals --------------------------------------------------------------------------------
function LocationModal({ modal, setModal, location, username }) {
  const dispatch = useDispatch();

  async function handleConfirm() {
    if(location?.address) {
      dispatch(updateProfileLocationThunk({ username, location }));
      setModal(null);
    } else {
      return null;
    }
  }

  return (
    <Modal
      title="Dove ti trovi?"
      message="Aggiorna la tua posizione"
      closeModal={() => setModal(false)}
      showModal={modal}
      confirm={handleConfirm}
    >
     <SearchPlaces 
        label="Cerca un luogo" 
        labelWeight="bold" 
        onClick={(data) => dispatch(changeUserLocation(data))} 
      />
    </Modal>
  )
}

function EditInfoModal ({ modal, setModal, profile }) {
  const [name, setName ] = useState(profile.name);
  const [phone, setPhone ] = useState(profile.phone);
  const dispatch = useDispatch();
  
  return (
    <Modal
      title="Modifica le informazioni"
      closeModal={() => setModal(false)}
      showModal={modal}
      confirm={() => {
        dispatch(updateProfileInfoThunk({ username: profile.username, name, phone }));
        setModal(false);
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">              
          <FormText
            name="name"
            label="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="es: Mario"
          />
        </div>
        <div className="col-span-1">              
          <FormText
            name="phone"
            label="Telefono"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="es: Rossi"
          />
        </div>
      </div>
    </Modal>
  )
}

//  Sub components: Sections --------------------------------------------------------------------------------
const ProfileCardHeader = ({ profile, setModal }) => {
  if(!profile?.role?.company) return <InlineSpinner color="#DDD" loading={true} />
  return (
    <header className="relative flex items-end py-4">
      <AvatarPicker
        size="w-32 h-32"
        avatar={profile.avatar}
        username={profile.username}
      />

      <div className="mb-2">
        <LargeTitle styles="ml-4">
          { profile.name }
        </LargeTitle>
        <div className="px-4">
          <LargeParagraph>
            {profile.role.company.name} - {companyTypeDescriptor(profile.role.company.type)}
          </LargeParagraph>
          <Paragraph>
            <span className="text-primary-200 dark:text-primary-300">Reparto {roleFinder(profile.role.task)}</span>
          </Paragraph>
        </div>
      </div>
      
      <div 
        className="cursor-pointer absolute p-3 text-center top-4 right-4 rounded-full bg-light-100 hover:bg-light-300 dark:bg-dark-100 dark:hover:bg-dark-200" 
        onClick={() => setModal('EDIT_INFO')}
      >
        <EditIcon 
          className="w-5 h-auto fill-current" 
        />
      </div>
    </header>
  )
}

function ProfileCardBody({ profile, setModal }) {
  const dispatch = useDispatch();
  return (
    <article className="grid grid-cols-3 py-4 px-4">
      <div className="col-span-3 md:col-span-2 pr-4">
        {/* Informations */}
        <SmallTitle>Informazioni</SmallTitle>
        { profile.location?.address
          ? <DisplayLocation location={profile.location} onClick={() => setModal('SEARCH_LOCATION')} />
          : <LargeParagraph styles="mb-1">
             <ActionButton
              text="Dove ti trovi?"
              styles="btn--center btn-ghost"
              onClick={() => setModal('SEARCH_LOCATION')}
            />
          </LargeParagraph>
        }

        {/* Featured message */}
        <TextEditor 
          content={profile?.note || null}
          onSaveTextEditor={(content) => dispatch(updateProfileNoteThunk({ username: profile.username, note: content }))} 
          title="Messaggio in evidenza"
        />

      </div>
      <div className="col-span-3 md:col-span-1 mt-4 md:mt-0 md:pl-4">
        <SmallTitle>Contatti</SmallTitle>
        <ul className="mt-1">
          <li><span className="italic">email:</span> <a className="text-primary-200 text-opacity-80 hover:text-opacity-100 dark:text-primary-300 dark:hover:text-opacity-100" href={`mailto:${profile.email}`}>{profile.email}</a></li>
          <li><span className="italic">phone:</span> <a className="text-primary-200 text-opacity-80 hover:text-opacity-100 dark:text-primary-300 dark:hover:text-opacity-100" href={`tel:${profile.phone}`}>{profile.phone}</a></li>
        </ul>
      </div>
    </article>
  )
}

//  Main component --------------------------------------------------------------------------------
export default function ProfileCard({ profile }) {
  const [ modal, setModal ] = useState(false);
  return (
    <div className="bg-base-100 p-4 rounded-md">
      <ProfileCardHeader profile={profile} setModal={setModal} />
      <Divider />
      <ProfileCardBody
        profile={profile}
        setModal={setModal}
      />

      {/* Show modal to find new carrier */}
      { modal === 'EDIT_INFO' && (
        <EditInfoModal
          modal={modal} 
          setModal={setModal}
          profile={profile}
        />
      )}
      { modal === 'SEARCH_LOCATION' && (
        <LocationModal
          modal={modal}
          setModal={setModal}
          location={profile.location}
          username={profile.username}
        />
      )}
    </div>
  )
}