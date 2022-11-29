import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { FiUsers } from 'react-icons/fi';
import LinkButton from '../../globals/components/buttons_v2/LinkButton';
// import { VscFilePdf } from 'react-icons/vsc';

const src = "https://webinlavorazione.it/video-kdn.webm";

const SubscribeIntroContainer = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/subscribe/intro");
  }, []);

  return (
    <div className='flex-col h-full mr-4'>
      <div className="rounded-md relative text-secondary-300">
        <div className='flex flex-col justify-center relative w-full mb-6 mt-2 rounded-2xl overflow-hidden h-[640px] p-8'>
          <video style={{ objectFit: 'cover' }} className='absolute left-0 top-0 w-full h-full' autoPlay={true} muted={true} controls={false} loop={true} playsInline={true} >
            <source src={src} type="video/webm" />
            Sorry, your browser doesn't support embedded videos.
          </video>

          <div className='top-0 left-0 bottom-0 right-0 absolute w-full h-full bg-gradient-to-r from-secondary-200 to-secondary-100 opacity-50' />

          <div className='text-light-100 max-w-[960px] w-full'>
            <div className='relative'>
              <h1 className='title-1 mt-6 uppercase'>
                Benvenuto su Key Logistic Network
              </h1>
              <h2 className='title-2 mb-6'>
                La chiave per la semplificazione del settore logistico
              </h2>
            </div>

            <p className='text-lg md:text-xl lg:text-2xl opacity-80'>
              Con questo nuovo gestionale avrai l'opportunità di coordinare la tua azienda a livello logistico in modo completo e semplificato.
            </p>

            <div className='flex gap-2 md:gap-4 flex-wrap mt-8'>
              <LinkButton
                className='btn-primary text-base md:text-lg inline-flex whitespace-nowrap'
                text="Partecipa alla raccolta contatti"
                icon={<FiUsers className='text-xl'/>}
                to="/subscribe/registry"
              />
              {/* <LinkButton
                className='btn-light-outline text-base md:text-lg inline-flex whitespace-nowrap'
                text="Scarica il PDF"
                icon={<VscFilePdf className='text-xl'/>}
                to="/subscribe/registry"
              /> */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className='relative text-center mb-[100px] pb-8 text-dark-300'>
        <h3 className='title-1 my-10'>Controlla i processi, accelera le fasi del trasporto</h3>
        <div className='absolute -translate-x-1/2 left-1/2 w-[50px] h-[8px] bg-primary-200' /> 
      </div> */}

      {/* <div className="grid grid-cols-2 gap-8 text-xl text-dark-300">
        <div className="col-span-2 md:col-span-1 my-4">
          <img
            src={'/images/home-3.png'}
            alt={"Boh"}
            className="w-auto h-[450px] mx-auto"
          />
        </div>

        <div className="col-span-2 md:col-span-1 my-4">
          <h2 className='title-2 mt-2 mb-4 uppercase'>Vantaggi</h2>
          Grazie alla piattaforma potrai interagire direttamente con le aziende con cui hai rapporti conoscendo in tempo reale tutte le dinamiche e le vicende legate alla tua spedizione
        </div>

        <div className="col-span-2 md:col-span-1 my-4">
          <h2 className='title-2 mt-2 mb-4 uppercase'>Funzionalità principali</h2>
          <ul className="list-inside list-disc my-4">
            <li>Contabilità pallets certificata con interscambio di informazioni fra le 3 parti (committente - vettore - destinatario)</li>
            <li>Gestionale per la richiesta di ordini e/o di ritiro merci</li>
            <li>Archivio della documentazione immessa con spedizione di riferimento</li>
            <li>Richiesta di spedizione istantanea al vettore</li>
            <li>Gestionale logistico di base per i viaggi</li>
            <li>Database contatti per aziende e contatti aziendali</li>
            <li>Gestione dei veicoli in possesso</li>
            <li>Gestionale degli assegni</li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1 my-4">
          <img
            src={'/images/home-1.png'}
            alt={"Boh"}
            className="w-auto h-[450px] mx-auto"
          />
        </div>

        <div className="col-span-2 md:col-span-1 my-4">
          <img
            src={'/images/home-1.png'}
            alt={"Boh"}
            className="w-auto h-[450px] mx-auto"
          />
        </div>

        <div className="col-span-2 md:col-span-1 my-4">
          <h2 className='title-2 my-2 uppercase'>Side features</h2>
          <p>Inoltre la possibilità di:</p>
          <ul>
            <li>Incorporare un pianificatore logistico</li>
            <li>Istallare un gestionale per allegato fattura, scadenziari e resoconti</li>
            <li>Collegare il proprio gestionale alla pittaforma</li>
          </ul>

          <p>
            Immetti i tuoi dati per richiedere di partecipare alla versione Beta e ricevere
            successivamente un bonus al primo accesso.
          </p>
        </div>
      </div> */}

    </div>
  )
}

export default SubscribeIntroContainer
