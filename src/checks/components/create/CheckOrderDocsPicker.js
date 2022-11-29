import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import Checkbox from "../../../globals/components/dataEntry/Checkbox";
import SelectPrimaryDocsInCheck from "./SelectPrimaryDocsInCheck";
import WarningMessage from "../../../globals/components/dataDisplay/WarningMessage";


// Sub components -------------------------------------------------------------------------------------------------------------------
const CheckOrderDocsPickerHeader = () => <p className="title-4 py-2">
  Documento di riferimento
</p>

const DocCheckboxLabel = ({ doc }) => <span className="flex items-center">
  <span className="text-base">{doc.type}</span>
  <span className="text-sm text-zinc-400 dark:text-zinc-600 ml-2">N. {doc.number}</span>
</span>

// Main component -------------------------------------------------------------------------------------------------------------------
export default function CheckOrderDocsPicker({
  orderDocs = [],
  checkDocs = {},
  docNumCallback = (value) => console.log("Change check key doc in <CheckOrderDocsPicker />", value),
  docsRefCallback = (value) => console.log("Change checks ref in <CheckOrderDocsPicker />", value),
}) {
  const { docsRef, keyDocNum } = checkDocs;
  const validDocs = orderDocs?.length > 0 ? orderDocs.filter(doc => doc?.number && doc?.type) : [];

  return (
    <CardDetails
      className={`mb-4`}
      header={<CheckOrderDocsPickerHeader />}
      footer={docsRef.length <= 1 
        ? null 
        : <SelectPrimaryDocsInCheck
            options={docsRef}
            value={keyDocNum}
            onSelect={(value) => docNumCallback(value)}
          />
      }
    >
      { validDocs.length > 0
        ? validDocs.map((doc, index) => (
          <Checkbox
            key={`${doc.number}-${index}`}
            id={`${doc.number}-${index}`}
            name={`${doc.number}-${index}`}
            label={<DocCheckboxLabel doc={doc} />}
            value={`${doc.number}-${index}`}
            controlled={true}
            initialStatus={docsRef?.length > 0
              ? docsRef.filter(({ id }) => id.includes(doc.number)).length
              : false
            }
            onChange={(id) => docsRefCallback({ ...doc, id })}
            styles="mb-2"
          />
        ))
        : <p className="text-gray-400 dark:text-gray-500">Nessun documento caricato</p>
      }
      
      { validDocs.length !== orderDocs.length && (
        <WarningMessage
          text="Alcuni dei documenti presenti in quest'ordine sono privi di informazioni fondamentali (numero e tipo) e non potranno essere selezionati"
          className={`mt-2`}
        />
      )}
    </CardDetails>
  )
}