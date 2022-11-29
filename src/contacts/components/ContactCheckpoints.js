import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ContactCheckpointCompiler from "./checkpoint/ContactCheckpointCompiler";
import SearchPlaces from "../../globals/components/dataEntry/SearchPlaces";
import SimpleMap from "../../globals/components/layout/SimpleMap";
import Modal from "../../globals/components/layout/Modal";
import ActionButton from "../../globals/components/buttons/ActionButton";
import { SmallParagraph } from "../../globals/components/typography/paragraphs";
// Thunks
import { trackingContactLocationThunk } from "../../app/thunks/contactsThunks";

function ContactCheckpoints ({ contact, checkpoints, showLabel = true }) {
  const [ modalAddress, setModalAddress ] = useState(false);
  const [ trackingAddress, setTrackingAddress ] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setTrackingAddress(null)
    };
  }, []);

  const confirm = async () => {
    setModalAddress(false);
    await dispatch(trackingContactLocationThunk({ contact, location: trackingAddress, index: modalAddress.index }));
    setTrackingAddress(null);
  }

  return (
    <div>
      { showLabel && (
        <SmallParagraph styles="mt-2 opacity-60">
          Punti di interesse registrati
        </SmallParagraph>
      )}

      { checkpoints && checkpoints?.length > 0 && (
        <div className={`rounded-md bg-base-100`}>
          <ContactCheckpointCompiler
            checkpoints={checkpoints}
            updateForm={null} // compilatore di sola visualizzazione
            editEnabled={false}
            setModalAddress={setModalAddress}
          />
        </div>
      )}

      { modalAddress && (
        <Modal
          title="Rintraccia coordinate"
          closeModal={() => setModalAddress(false)}
          showModal={modalAddress}
          size={720}
          styles="z-100 bg-base-100"
        >
          <SearchPlaces
            inputAddress={modalAddress.address}
            onClick={(data) => setTrackingAddress(data)} 
          />

          { trackingAddress?.coordinate?.lat && trackingAddress?.coordinate?.lng && (
            <>
              <p className="text-sm my-2">Latitudine: {trackingAddress.coordinate.lat}, Longitudine: {trackingAddress.coordinate.lng}</p>
              <div style={{ height: 300 }}>
                <SimpleMap
                  lat={trackingAddress.coordinate.lat}
                  lng={trackingAddress.coordinate.lng}
                />
              </div>

              <ActionButton
                onClick={() => confirm()}
                text="Conferma coordinate"
                styles="btn--center btn-wide btn-primary mt-4"
              />
            </>
          )}
        </Modal>
      )}
    </div>
  )
}

export default ContactCheckpoints;