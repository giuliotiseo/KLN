import { useState } from "react";
import PalletQuantityViewer from "./PalletQuantityViewer";
import PalletValidationViewer from "./PalletValidationViewer";
import PalletVoucherViewer from "./PalletVoucherViewer";
import PalletFilesViewer from "./PalletFilesViewer";
import Modal from "../../../globals/components/layout/Modal";
import { EditorReader } from "../../../globals/components/dataEntry/TextEditor";
import { Paragraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { formatDate } from "../../../globals/libs/helpers";
import { useQueryStringId } from "../../../globals/libs/hooks";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";
import { Link } from "react-router-dom";

const PalletHandlingRefSummary = ({ palletHandling, id }) => id && id.includes("REVSTNDALN")
  ? <div className="py-4 px-8 bg-base-100 rounded-md flex items-center justify-center">
      <p className="text-lg text-gray-400 dark:text-gray-500">
        Storno pallet effettuato sul conto di <br/> <b>{palletHandling.reversalName}</b>
      </p>
    </div>
  : <div className="py-4 px-8 bg-base-100 rounded-md flex items-center justify-center">
      <p className="text-lg text-gray-400 dark:text-gray-500">
        Consegna dell'ordine inviato da <br/> <b>{palletHandling.reversalName}</b> per <b>{ palletHandling.customerName }</b>
      </p>
    </div>



const TradeQuantities = ({ palletHandling, showModal, setNote }) => <>
  <PalletQuantityViewer
    type="LOAD"
    value={palletHandling?.loadQuantity || 0}
    nc_value={palletHandling?.disposableLoad || 0}
    note={palletHandling.loadNote}
    nc_note={palletHandling.disposableLoadNote}
    showModal={showModal}
    setNote={setNote}
  />

  <PalletQuantityViewer
    type="UNLOAD"
    value={ palletHandling?.unloadQuantity}
    nc_value={palletHandling?.disposableUnload || 0}
    note={palletHandling.unloadNote}
    nc_note={palletHandling.disposableUnloadNote}
    showModal={showModal}
    setNote={setNote}
  />
</>

const ReversalQuantities = ({ palletHandling, showModal, setNote, id }) => <>
  <PalletQuantityViewer
    type="REVERSAL"
    value={ palletHandling?.reversalQuantity}
    nc_value={0}
    note={palletHandling.reversalNote}
    showModal={showModal}
    setNote={setNote}
  />

  <PalletHandlingRefSummary
    palletHandling={palletHandling}
    id={id}
  />
</>

// Main component ---------------------------------------------------------------------------------------------------------------------
export default function PalletBasicInfoViewer({
  palletHandling,
  className = "mt-4",
  idKey = "id"
}) {
  const [ modal, showModal ] = useState(false);
  const [ note, setNote ] = useState(false);
  const handlingType = palletHandling.reversalId === "NO_REVERSAL" ? "TRADE" : "REVERSAL";
  const id = useQueryStringId(idKey);
  const queryFrom = useQueryStringId("from");

  console.log(queryFrom);

  return (
    <section className={`bg-base-200 pr-4 pl-2 ${className}`}>
      <div className="bg-base-100 p-4 rounded-md">
        <Paragraph styles="uppercase opacity-50">Registrato in data {formatDate(new Date(palletHandling.createdAt))}</Paragraph>
        <SmallTitle>
          { handlingType === "TRADE" 
            ? `Movimentazione pallet codice: ${palletHandling.stamp?.split('-')[1]}`
            : `Storno rif. movimentazione ${palletHandling.stamp?.split('-')[1]}`
          }
        </SmallTitle>

        { handlingType === "REVERSAL" && palletHandling?.palletHandlingRefId && (
          <Link
            className="text-primary-100 dark:text-primary-300 hover:underline"
            to={`/pallets/details?from=${queryFrom}&id=${palletHandling.palletHandlingRefId}`}
          >
            Apri movimentazione allegata
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 text-center mt-4 mb-10 gap-4">
        { palletHandling.reversalId !== "NO_REVERSAL"
          ? id && <ReversalQuantities palletHandling={palletHandling} showModal={showModal} setNote={setNote} id={id} />
          : <TradeQuantities palletHandling={palletHandling} showModal={showModal} setNote={setNote} />
        }
        
        <PalletValidationViewer
          title="Validazione amministrativa vettore"
          companyName={palletHandling.carrierName}
          validation={palletHandling.carrierValidation}
          validator={palletHandling.carrierValidator}
          message={palletHandling.carrierValidationMessage}
        />

        { handlingType === "TRADE"
          ? <PalletValidationViewer
              title="Validazione amministrativa cliente"
              companyName={palletHandling.customerName}
              validation={palletHandling.customerValidation || "NOT_DECLARED"}
              validator={palletHandling.customerValidator}
              message={palletHandling.customerValidationMessage}
            />
          : <PalletValidationViewer
              title="Validazione amministrativa cliente"
              companyName={palletHandling.reversalName}
              validation={palletHandling.customerValidation || "NOT_DECLARED"}
              validator={palletHandling.customerValidator}
              message={palletHandling.customerValidationMessage}
            />
        }

        <PalletVoucherViewer
          voucher={palletHandling?.voucherImage}
        />

        <PalletFilesViewer
          data={palletHandling?.files}
        />
      </div>

      {/* Floating elements */}
      <Modal
        title={`Nota operazione ${note?.title?.toLowerCase()} ${note?.compliance?.toLowerCase()}`}
        messageStyle={'alert-danger'}
        closeModal={() => showModal(false)}
        showModal={modal}
        size={540}
      >
        { note && (
          <EditorReader
            content={note.text}
            styles="bg-base-200 px-2 py-4 rounded-md"
          />
        )}
      </Modal>
    </section>
  )
}