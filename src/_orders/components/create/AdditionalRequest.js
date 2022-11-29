import { Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";
import TextEditor from "../../../globals/components/dataEntry/TextEditor";
// Icons
import { FiGitPullRequest } from "react-icons/fi";
import { BiEuro } from "react-icons/bi";

// Sub component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const AdditionalRequestModule = ({ updateForm, note, companiesNames, collectChecks, checksAmount }) => {
  return (
    <>
      <div className="my-4 text-lg">
        <label htmlFor="collectChecks" className="label block">Gestione assegni *</label>
        <select
          id="collectChecks"
          name="collectChecks"
          defaultValue={collectChecks}
          className="input cursor-pointer text-base"
          onChange={({ target: { name, value, type }}) => updateForm({ target: { name, value: value == 1 ? true : false, type }})}
        >
          <option value="NONE" disabled> - Seleziona un'opzione - </option>
          <option value={1}>Richiedi gestione assegni</option>
          <option value={0}>Non richiedere la gestione assegni</option>
        </select>
        <SmallParagraph styles="mt-1">
          Richiedi al camionista di ritirare l'assegno emesso da <b>{companiesNames.receiver.name}</b> per <b>{companiesNames.sender.name}</b>
        </SmallParagraph>
      </div>

      { Boolean(collectChecks) && collectChecks !== "NONE" && (
        <div>
          <label htmlFor="checksAmount" className="label mb-0">Importo assegno/i</label>
          <div className="flex items-center">
            <span className="text-2xl mr-1"><BiEuro /></span>
            <input 
              id="checksAmount"
              name="checksAmount"
              className="bg-transparent outline-none border-b text-xl py-2 block w-full font-bold focus:border-primary-200 dark:focus:border-primary-300"
              type="number"
              value={checksAmount}
              onChange={updateForm}
              placeholder={"Inserisci importo in EUR"}
            />
          </div>
        </div>
      )}
      
      <div className="mt-3">
        <TextEditor
          content={note}
          onSaveTextEditor={(content) => updateForm({ target: { name: "note", type: "text", value: content }})} 
          label="Aggiungi note all'ordine"
          actionButtonPosition="INTERNAL"
        />
      </div>
    </>
  )
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function AdditionalRequest({ note, companiesNames, collectChecks, checksAmount, updateForm, showModule }) {
  return (
    <div>
      <SmallTitle styles="mb-2 flex items-center">
        <FiGitPullRequest className="mr-1" />
        <span>Richieste aggiuntive</span>
      </SmallTitle>
      { showModule 
        ? <AdditionalRequestModule
          companiesNames={companiesNames}
          collectChecks={collectChecks}
          checksAmount={checksAmount}
          updateForm={updateForm}
          note={note}
        />
        : <Paragraph styles="alert-info px-4 mt-4">
          Indica le informazioni di ritiro e consegna per procedere
        </Paragraph>
      }
    </div>
  )
}