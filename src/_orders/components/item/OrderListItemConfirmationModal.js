import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// Components
import ActionButton from '../../../globals/components/buttons/ActionButton';
import AbsoluteModal from '../../../globals/components/layout/AbsoluteModal';
// Thunks
import { importLogsIntoCompanyThunk } from '../../../app/thunks/companyThunks';
import { deleteOrderThunk } from '../../../app/thunks/ordersThunks';

// Modal settings -----------------------------------------------------------------------------------------------
export default function OrderListItemConfirmationModal({ order, operation, modal, setModal, queryFrom }) {
  const [ loading, setLoading ] = useState(false);
  const [ motivation, setMotivation ] = useState(`${order.name} rimosso a causa di un errore di compilazione`)
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const modalSettings = {
    "delete": {
      title: `Stai per cancellare ${order.stamp}, indica le motivazioni in basso`,
      hideHeading: true,
      message: "Accertati di eseguire l'operazione solo se vi sono stati degli errori irreversibili",
      messageStyle: "alert-danger",
      buttons: [{
        type: 'button',
        text: "Cancella ordine",
        fn: (id) => executeDeleteOrder(id),
        styles: "btn--center btn-wide mt-4 btn-outline-danger--bold"
      }] 
    }
  }

  useEffect(() => {
    setLoading(false);
  }, [modal]);

  if(!operation) return null;

  const executeDeleteOrder = async (order) => {
    const tempOrder = order;
  
    // Elimina definitivamente il veicolo
    await dispatch(deleteOrderThunk({ order, queryFrom }));
  
    // Inserisci i log dentro company
    await dispatch(importLogsIntoCompanyThunk({
      action: 'Cancellazione ordine',
      subject: `${tempOrder.name}`
    }));

    if(location.pathname.includes("details")) {
      navigate(`/orders?from=${queryFrom}&status=pending`);
    }
  }

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
              loading={loading}
              onClick={() => {
                setLoading(true);
                btn.fn(order);
              }}
            />
        ))}
      </div>
    </AbsoluteModal>
  </>
}