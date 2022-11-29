import { Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";

// Constant -----------------------------------------------------------------------------------------------
const senderSetupOptions = [
  {
    id: 1,
    id: "PREORDER",
    name: "senderSetup-createOrderForm",
    label: "Collegamento ad elenco pre-ordini (consigliato)",
  }, {
    id: 2,
    id: "MANUAL",
    name: "senderSetup-createOrderForm",
    label: "Inserimento manuale",
  }
];

// Main component -----------------------------------------------------------------------------------------------
const SenderOptionSelector = ({ title, value, onChange, styles }) => {
  return (
    <div className={`${styles}`}>
      <SmallParagraph>{title}</SmallParagraph>
      <ul className="mt-2">
        { senderSetupOptions.map(opt => (
          <li className='text-lg' key={opt.id}>
            <input
              id={opt.id}
              type="radio"
              value={opt.id}
              checked={value === opt.id}
              name={opt.name}
              onChange={(e) => onChange(e.target.value)}
              className='mr-1 cursor-pointer'
            />
            <label className='cursor-pointer' htmlFor={opt.id}>{opt.label}</label>
          </li>
        ))}
      </ul>

      { value === "MANUAL" && (
        <Paragraph styles="alert-warn px-4 mt-2">
          Attenzione: se inserisci un nuovo ordine senza collegarlo ad un pre-ordine potresti imbatterti in problemi nella gestione della spedizione. Per ottimizzare la comunicazione fra le aziende coinvolte, si consiglia di procedere con questa modalità solo se già consapevoli della disponibilità del vettore, in caso contrario passa all'invio di un pre-ordine.
        </Paragraph>
      )}
    </div>
  )
}

export default SenderOptionSelector;