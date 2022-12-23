// Icons
import { FiCheck } from "react-icons/fi";
import Select from "../../../globals/components/dataEntry_v2/Select";
import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import InputCurrency from "../../../globals/components/dataEntry_v2/InputCurrency";

// Sub component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const AdditionalRequestModule = ({ updateForm, companiesNames, collectChecks, checksAmount }) => {
  console.log("Valore...", collectChecks);

  return (
    <>
      <div className="text-lg">
        <Select
          id="collectChecks"
          name="collectChecks"
          label="Gestione assegni *"
          value={collectChecks}
          selectClassName="block w-full"
          callback={updateForm}
        >
          <option value="NONE" disabled> - Seleziona un'opzione - </option>
          <option value={1}>Richiedi gestione assegni</option>
          <option value={0}>Non richiedere la gestione assegni</option>
        </Select>

        <p className="mt-2 text-sm my-2 mx-1">
          Richiedi al camionista di ritirare l'assegno emesso da <b>{companiesNames?.receiver?.name || <i>destinatario</i>}</b> per <b>{companiesNames?.sender?.name || <i>mittente</i>}</b>
        </p>
      </div>

      { Boolean(parseInt(collectChecks)) && collectChecks !== "NONE" && (
        <div>
          <div className="flex items-center">
            <InputCurrency
              id="checksAmount"
              label="Importo assegno/i"
              value={checksAmount}
              callback={updateForm}
              className="mb-2 block w-full flex-col"
              labelClassName="w-full"
              onBlurCallback={true}
              iconButton={() => <FiCheck />}
            />
          </div>
        </div>
      )}
    </>
  )
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function AdditionalRequestCompiler({ companiesNames, order, updateForm }) {
  const { collectChecks, checksAmount } = order;

  console.log("Vedi", { collectChecks, checksAmount })
  return (
    <CardDetails
      header={<h3 className="title-3">Richieste aggiuntive</h3>}
      className="mt-4"
    >
      <AdditionalRequestModule
        companiesNames={companiesNames}
        collectChecks={collectChecks}
        checksAmount={checksAmount}
        updateForm={updateForm}
      />
    </CardDetails>
  )
}