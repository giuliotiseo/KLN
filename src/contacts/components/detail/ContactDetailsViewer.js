import CopyTagOnClipboard from "../../../company/components/CopyTagOnClipboard"
import { SmallTitle } from "../../../globals/components/typography/titles"

// Sub component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const ContactCompanyViewer = ({ contact }) => {
  return (
    <>
      <div className="mt-4">
        <p className="label">Ragione sociale</p>
        <p>{contact.name}</p>
      </div>

      <div className="mt-4">
        <p className="label">Partita IVA</p>
        <p>{contact?.vatNumber || <span className="italic">Nessun valore inserito</span>}</p>
      </div>

      <div className="mt-4">
        <p className="label">Indirizzo PEC</p>
        <p>{contact?.pec || <span className="italic">Nessun valore inserito</span>}</p>
      </div>

      <div className="mt-4">
        <p className="label">Codice univoco</p>
        <p>{contact?.uniqueCode || <span className="italic">Nessun valore inserito</span>}</p>
      </div>
    </>
  )
}

const ContactUserViewer = ({ contact, forceHideSurname }) => {
  return (
    <>
      <div className="mt-4">
        <label className="label" htmlFor="name">Nome</label>
        <p>{contact.name} {!forceHideSurname && contact.surname}</p>
      </div>
    </>
  )
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ContactDetailsViewer({ contact, viewerType, forceHideSurname = false }) {
  return (
    <div className="bg-base-100 rounded-md">
      <SmallTitle styles="flex items-center mb-2">
        <span>Anagrafica contatto</span>
      </SmallTitle>
      { viewerType === "COMPANY" && <ContactCompanyViewer contact={contact} />}
      { viewerType === "USER" && <ContactUserViewer contact={contact} forceHideSurname={forceHideSurname} />}
    </div>
  )
}