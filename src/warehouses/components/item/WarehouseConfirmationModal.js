import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Components
import ActionButton from '../../../globals/components/buttons/ActionButton';
import Modal from '../../../globals/components/layout/Modal';
import { SmallTitle } from '../../../globals/components/typography/titles';
import LocationItem from '../../../globals/components/layout/LocationItem';
import WarehouseFeaturesList from '../detail/WarehouseFeaturesList';
// Thunks
import { deleteWarehouseThunk } from '../../../app/thunks/warehousesThunks';
import { importLogsIntoCompanyThunk } from '../../../app/thunks/companyThunks';
// Helpers
import { WAREHOUSE_BUILDING_TYPE } from '../../libs/helpers';

// Modal settings -----------------------------------------------------------------------------------------------
function WarehouseConfirmationModal({ warehouse, operation, modal, setModal }) {
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();

  const modalSettings = {
    "delete": {
      title: "Rimuovendo il magazzino non potrai più recuperarlo!",
      hideHeading: true,
      message: "Accertati di eseguire questa operazione se vi sono stati degli errori nella compilazione, altrimenti se intendi semplicemente oscurare questo magazzino ai clienti si consiglia di aggiornare lo stato a 'Non disponibile' per non perdere tutte le info presenti",
      messageStyle: "alert-danger",
      buttons: [{
        type: 'button',
        text: "Elimina magazzino",
        fn: (warehouseId) => executeDelete(warehouseId),
        styles: "btn--center btn-wide mt-4 btn-outline-danger--bold"
      }] 
    }
  }

  useEffect(() => {
    setLoading(false);
  }, [modal]);

  if(!operation) return null;

  const executeDelete = async (warehouseId) => {
    const tempWarehouse = warehouse;
  
    // Elimina definitivamente il magazzino
    await dispatch(deleteWarehouseThunk({ id: warehouseId }));
  
    // Inserisci i log dentro company
    await dispatch(importLogsIntoCompanyThunk({
      action: 'Rimozione magazzino',
      subject: `${tempWarehouse.name} (${WAREHOUSE_BUILDING_TYPE[tempWarehouse.type].toLowerCase()})`
    }));
  }

  return <>
    <Modal
      title={modalSettings[operation].title}
      message={modalSettings[operation].message}
      messageStyle={modalSettings[operation].messageStyle}
      closeModal={() => setModal(false)}
      showModal={modal}
      size={500}
    >
      
      <div className="mt-2">
        <SmallTitle>{warehouse.name}</SmallTitle>
        <div className="mt-2">
          <LocationItem location={warehouse.location} />
        </div>
      </div>

      <div className="mt-2">
        <WarehouseFeaturesList
          type={warehouse.type}
          scope={warehouse.scope}
          specialization={warehouse.specialization}
        />
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
                btn.fn(warehouse.id);
              }}
            />
        ))}
      </div>

    </Modal>
  </>
}

export default WarehouseConfirmationModal;