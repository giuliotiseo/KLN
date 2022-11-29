import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SubscribeHeader from '../components/SubscribeHeader';
import { resetSubscribeSlice } from '../slices/subscribeSlice';

const SubscribeGreetingsContainer = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(resetSubscribeSlice());
  }, []);

  return (
    <div className="px-16 min-h-screen flex flex-col items-center">
      <SubscribeHeader />
      <section className='flex flex-col flex-1 h-full justify-center container mx-auto text-left'>
        <h1 className='title-1'>Fantastico!</h1>
        <p className='text-lg mb-4'>Grazie per aver scelto di partecipare alla raccolta contatti di KLN - Key Logistic Network</p>
        <div className="text-left">
          <p>Abbiamo aggiunto la tua azienda nei nostri sistemi.</p>
          <p>Grazie al vostro supporto i nostri sviluppatori potranno testare la piattaforma prima di passare alla fase di produzione</p>
          <p>Non appena l'applicazione sarà pronta, invieremo una comunicazione sull'email da te fornita.</p>
        </div>

        <div className="mt-8">
          <p>A presto,</p>
          <p>Il team di KLN - Key Logistic Network</p>
        </div>
      </section>
    </div>
  )
}

export default SubscribeGreetingsContainer
