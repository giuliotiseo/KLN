import { useState } from 'react';
// Components
import ActionButton from '../../../globals/components/buttons/ActionButton';
import AbsoluteModal from '../../../globals/components/layout/AbsoluteModal';
// Api
import { useRemoveCheckMutation } from '../../api/checks-api-slice';

// Modal settings -----------------------------------------------------------------------------------------------
export default function CheckListItemConfirmationModal({ check, name, operation, modal, setModal }) {
  const [ removeCheck, { isLoading: isDeleting } ] = useRemoveCheckMutation();
  const [ motivation, setMotivation ] = useState(`${name} rimosso a causa di un errore di compilazione`)

  const modalSettings = {
    "delete": {
      title: `Stai per cancellare ${name}, indica le motivazioni in basso`,
      hideHeading: true,
      message: "Accertati di eseguire l'operazione solo se vi sono stati degli errori irreversibili",
      messageStyle: "alert-danger",
      buttons: [{
        type: 'button',
        text: "Cancella assegno",
        fn: (id) => removeCheck(id),
        styles: "btn--center btn-wide mt-4 btn-outline-danger--bold"
      }] 
    }
  }

  if(!operation) return null;

  return <>
    <AbsoluteModal
      title={modalSettings[operation].title}
      message={modalSettings[operation].message}
      messageStyle={modalSettings[operation].messageStyle}
      closeModal={() => setModal(false)}
      showModal={modal}
      size={320}
    >
      <div className="mt-2">
        <input
          id="motivation-input"
          type="text"
          value={motivation}
          onChange={({ target: { value }}) => setMotivation(value)}
          placeholder="Inserisci una motivazione"
          className="input w-full"
        />
      </div>

      <div className="flex">
        { modalSettings[operation].buttons.map((btn, index) => (
          <ActionButton
            key={index}
            text={btn.text}
            styles={btn.styles}
            loading={isDeleting}
            onClick={() => btn.fn(check.id)}
          />
        ))}
      </div>
    </AbsoluteModal>
  </>
}