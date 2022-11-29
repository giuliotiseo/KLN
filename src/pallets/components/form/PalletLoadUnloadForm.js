import { TinyTitle } from "../../../globals/components/typography/titles";
import PalletInputItem from "./PalletInputItem";
import { FiAlertTriangle } from "react-icons/fi";
import { toast } from "react-toastify";

export default function PalletLoadUnloadForm({
  title,
  compliantValue,
  compliantFeatures,
  compliantNote,
  disposableValue,
  disposableFeatures,
  disposableNote,
  onChangeCompliant,
  onChangeCompliantNote,
  onChangeDisposable,
  onChangeDisposableNote,
  showAlert = false,
  className = ""
}) {
  return (
    <div className="flex-1">
      <div className={className}>
        <TinyTitle styles="uppercase flex items-center mt-4">
          { showAlert && <button onClick={() => toast.warn("I valori non corrispondono con quelli indicati negli ordini. Assicurati che i dati siano giusti prima di procedere.")}>
              <FiAlertTriangle className="mr-1 text-yellow-500 dark:text-yellow-300" />
          </button>}
          {title}
        </TinyTitle>
        <div className="mt-2">
          <PalletInputItem
            type="COMPLIANT"
            title="Pallet validi"
            value={compliantValue}
            features={compliantFeatures}
            note={compliantNote}
            onChangeValue={onChangeCompliant}
            onChangeNote={onChangeCompliantNote}
          />

          <PalletInputItem
            type="DISPOSABLE"
            title="Pallet esclusi"
            value={disposableValue}
            features={disposableFeatures}
            note={disposableNote}
            onChangeValue={onChangeDisposable}
            onChangeNote={onChangeDisposableNote}
          />
        </div>
      </div>
    </div>
  )
}