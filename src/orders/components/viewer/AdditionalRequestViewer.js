import { FiCheckSquare, FiGitPullRequest, FiSquare } from "react-icons/fi";
import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import { priceFormatter } from "../../../globals/libs/helpers";

const AdditionalRequestHeader = () => {
  return (
    <div className="flex items-center">
      <FiGitPullRequest className="mr-1" />
      <h4 className="title-3">Richieste aggiuntive</h4>
    </div>
  )
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function AdditionalRequestViewer({ collectChecks, checksAmount }) {
  return (
    <CardDetails
      header={<AdditionalRequestHeader />}
    >
      <div className="my-4">
        { collectChecks 
          ? <p className="flex items-center"><FiCheckSquare className="mr-2 text-primary-200 dark:text-primary-300" />Richiesto ritiro dell'assegno</p>
          : <p className="flex items-center"><FiSquare className="mr-2 text-zinc-500" />Ritiro dell'assegno non richiesto</p>
        }
        
        { checksAmount ? ( <p>Importo assegno/i: <b>{priceFormatter(checksAmount)}</b></p> ) : ""}
      </div>
    </CardDetails>
  )
}