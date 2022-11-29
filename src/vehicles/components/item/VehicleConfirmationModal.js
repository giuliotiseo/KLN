import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Components
import ActionButton from '../../../globals/components/buttons/ActionButton';
import Modal from '../../../globals/components/layout/Modal';
import { SmallTitle } from '../../../globals/components/typography/titles';
import VehicleFeaturesList from './VehicleFeaturesList';
// Thunks
import { importLogsIntoCompanyThunk } from '../../../app/thunks/companyThunks';
import { deleteVehicleThunk } from '../../../app/thunks/vehiclesThunks';

// Modal settings -----------------------------------------------------------------------------------------------
function VehicleConfirmationModal({ vehicle, operation, modal, setModal }) {
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();

  const modalSettings = {
    "delete": {
      title: "Rimuovendo il veicolo non potrai più recuperarlo!",
      hideHeading: true,
      message: "Accertati di eseguire questa operazione se vi sono stati degli errori nella compilazione, altrimenti se intendi semplicemente oscurare questo veicolo si consiglia di aggiornare lo stato a 'Non disponibile' per non perdere tutte le info attualmente presenti",
      messageStyle: "alert-danger",
      buttons: [{
        type: 'button',
        text: "Elimina veicolo",
        fn: (licensePlate) => executeDelete(licensePlate),
        styles: "btn--center btn-wide mt-4 btn-outline-danger--bold"
      }] 
    }
  }

  useEffect(() => {
    setLoading(false);
  }, [modal]);

  if(!operation) return null;

  const executeDelete = async (licensePlate) => {
    const tempVehicle = vehicle;
  
    // Elimina definitivamente il veicolo
    await dispatch(deleteVehicleThunk({ licensePlate }));
  
    // Inserisci i log dentro company
    await dispatch(importLogsIntoCompanyThunk({
      action: 'Rimozione veicolo',
      subject: `${tempVehicle.brand} ${tempVehicle.model} targato ${tempVehicle.licensePlate}`
    }));
  }

  return <>
    <Modal
      title={modalSettings[operation].title}
      message={modalSettings[operation].message}
      messageStyle={modalSettings[operation].messageStyle}
      closeModal={() => setModal(false)}
      showModal={modal}
      size={320}
    >
      
      <div className="mt-2">
        <SmallTitle>{vehicle.brand} {vehicle.model} ({vehicle.licensePlate})</SmallTitle>
      </div>

      <div className="mt-2">
        <VehicleFeaturesList {...vehicle} />
      </div>

      <div className="flex">
        { modalSettings[operation].buttons.map((btn, index) => (
          <ActionButton
              key={index}
              text={btn.text}
              styles={btn.styles}
              loading={loading}
              onClick={() => {
                setLoading(true);
                btn.fn(vehicle.licensePlate);
              }}
            />
        ))}
      </div>

    </Modal>
  </>
}

export default VehicleConfirmationModal;