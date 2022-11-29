import { SmallTitle } from "../../../globals/components/typography/titles";

export default function ContactReferencesViewer({ contact, viewerType }) {
  return (
    <div className="bg-base-100 rounded-md">
      <SmallTitle styles="flex items-center mb-2">
        <span>Riferimenti contatto</span>
      </SmallTitle>
      <div className="mt-4">
        <p className="label">Email</p>
        <p>{contact?.email || <span className="italic">Nessun valore inserito</span>}</p>
      </div>

      <div className="mt-4">
        <p className="label">Telefono</p>
        <p>{contact?.phone || <span className="italic">Nessun valore inserito</span>}</p>
      </div>

      { viewerType === "USER" && (
        <>
          <div className="mt-4">
            <p>Lavora presso {contact?.job || <span className="italic">Nessun valore inserito</span>}</p>
          </div>
        </>
      )}
    </div>
  )
}