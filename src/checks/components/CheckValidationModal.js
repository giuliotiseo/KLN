import Modal from "../../globals/components/layout/Modal";
import { SmallParagraph } from "../../globals/components/typography/paragraphs";
import { TinyTitle } from "../../globals/components/typography/titles";

// Constants utilities ------------------------------------------------------------------------------------------------------------------------------------------------------------------
const fields_descriptions = {
  iban: "IBAN",
  issuingDate: "Data di emissione",
  pickupDate: "Data di ritiro",
  checkInDate: "Data di registrazione",
  checkOutDate: "Data di uscita",
  checkDeliveryDate: "Data di consegna",
}

// Main component ------------------------------------------------------------------------------------------------------------------------------------------------------------------
const CheckValidationModal = ({
  modal = false,
  setModal = () => console.error("Ooops, setModal not provided"),
  confirm = () => console.log("Confirm function not provided"),
  loading = false,
  validation = null
}) => modal && validation && (
  <Modal
    title={"Intendi proseguire comunque?"}
    message={"Presenza di dati errati o mancanti"}
    messageStyle={'alert-danger'}
    closeModal={() => setModal(false)}
    showModal={modal}
    size={540}
    confirmText="Ignora gli errori e conferma"
    loading={loading}
    confirm={confirm}
  >
    <div id="modal-errors">
      <TinyTitle>Errori individuati:</TinyTitle>
      { Object.keys(validation)
        .filter(id => validation[id].response === "ERROR")
        .map(id => <SmallParagraph key={id}>
          <b className="text-red-500 mr-1">{fields_descriptions?.[id] || 'Sconosciuto'}: </b>
          {validation[id].description}
        </SmallParagraph>
      )}
    </div>
  </Modal>
);

export default CheckValidationModal;