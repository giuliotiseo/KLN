import { useState, useCallback } from "react";
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { FiCheck, FiDelete, FiPaperclip, FiPlusCircle, FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";
import Button from "../../../globals/components/buttons_v2/Button";
import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import InputText from "../../../globals/components/dataEntry_v2/InputText";
import LiveFiles from "../../../globals/components/dataDisplay/LiveFiles";
// Helpers
import { formatDate } from "../../../globals/libs/helpers";
import { generateFileForOrderDoc } from "../../libs/helpers";
import { toast } from "react-toastify";

// Constants & Functions ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const docsTable = { headings: ["", "Numero", "Data", "Tipo", "Allegato"]}
const starterDoc = { number: "", date: new Date(), type: "DDT", files: []}

async function handleDocs({ action, prevDocs, newDoc, updateForm, index }) {
  if(action === "add") {
    await updateForm({ name: "docs", type: "docs", value: prevDocs.concat({
      ...newDoc,
      date: newDoc.date.toISOString()
    })});
  }

  if(action === "remove") {
    await updateForm({ name: "docs", type: "docs", value: prevDocs.filter((_, doc_idx) => doc_idx !== index)});
  }
}

// Sub component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
  * Docs: Table
*/
const DocsSummaryTable = ({
  docs,
  showAttachments,
  handleRemoveDocRow
}) => (
  <table className="border-collapse table-auto w-full">
    <thead>
      <tr>
        {/* In case of only readable use, the first element used for remove a single row will disappear */}
        { !handleRemoveDocRow 
          ? docsTable.headings.slice(1).map(th => <th className="border-b pb-2 dark:border-slate-600 text-slate-400 dark:text-slate-200 text-left" key={th}>{th}</th>)
          : docsTable.headings.map(th => <th className="border-b pb-2 dark:border-slate-600 text-slate-400 dark:text-slate-200 text-left" key={th}>{th}</th>)
        }
      </tr>
    </thead>
    <tbody>
      { docs.length === 0 
      ? (
          <tr>
            <td colSpan={docsTable.headings.length}>
              <SmallParagraph styles="italic mt-2">
                Nessun documento caricato
              </SmallParagraph>
            </td>
          </tr>
        )
      : docs.map((doc, index) => (
        <tr key={index} className="text-left hover:bg-light-200 dark:hover:bg-dark-200">
          { handleRemoveDocRow && <td className="py-1 text-primary-200 dark:text-primary-300 hover:text-danger-200 dark:hover:text-danger-300 text-base">
            <button className="rotate-180 ml-1" onClick={() => handleRemoveDocRow(index)}>
              <FiDelete />
            </button>
          </td> }
          <td className="py-1">{doc?.number}</td>
          <td className="py-1">{doc?.date ? formatDate(new Date(doc.date)) : ""}</td>
          <td className="py-1">{doc?.type}</td>
          <td className="py-1">{ doc?.files?.length > 0 
            ? <button 
                onClick={() => showAttachments(index + 1)}
                className="flex w-full items-center text-primary-100 dark:text-primary-300 hover:text-primary-300 dark:hover:text-primary-200"
              >
                <FiPaperclip className="inline-block mr-1" />
                <span className="inline-block">Vedi allegati</span>
              </button> 
            : <SmallParagraph>Nessun allegato</SmallParagraph>}
          </td>
        </tr>
      ))}
    </tbody>        
  </table>
)

/*
  * Docs: Form
*/
const DocsCompilerForm = ({
  docs,
  newDoc,
  setNewDoc,
  validationError
}) => {
  const { number, type, date, files } = newDoc;

  const addFile = useCallback(async (file) => {
    const fileObj = await generateFileForOrderDoc(file);
    setNewDoc(prev => ({ ...prev, files: prev.files.concat(fileObj)}))
  }, [newDoc.files]);

  const removeFile = useCallback((indexToRemove) => {
    let files = [...newDoc.files];
    files.splice(indexToRemove, 1);
    setNewDoc((prev) => ({ ...prev, files }));
  }, [newDoc.files]);
  
  return (
    <>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1">
          <InputText
            id="number"
            className="flex-col w-full"
            label="Numero documento *"
            placeholder='Numero documento'
            contentClassName="w-full text-base"
            labelClassName="block"
            value={number || ""}
            forceUpperCase={false}
            callback={({ value }) => setNewDoc(prev => ({ ...prev, number: value }))}
            disabled={false}
            isError={validationError.includes("number")}
          />
        </div>

        <div className="flex-1">
          <label className="label" htmlFor={`order-date-${docs.length + 1}`}>Data documento</label>
          <DatePicker
            id={`order-date-${docs.length + 1}`}
            className="input w-full text-base"
            selected={date}
            onChange={(date) => setNewDoc(prev => ({ ...prev, date }))}
            locale="it"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="flex-1">
          <InputText
            id="type"
            className="flex-col w-full"
            label="Numero documento"
            placeholder='Numero documento'
            contentClassName="w-full text-base"
            labelClassName="block"
            value={type || ""}
            forceUpperCase={false}
            callback={({ value }) => setNewDoc(prev => ({ ...prev, type: value }))}
            disabled={false}
          />
        </div>
      </div>

      <div className="mt-4">
        <LiveFiles
          files={files}
          dropCallback={addFile}
          removeCallback={removeFile}
          showEmptyBox={true}
          dropZoneHeight={200}
          loadedText={""}
        />
      </div>
    </>
  )
}

/*
  * Docs: Module router
*/
const DocsCompilerModuleRouter = ({
  docs,
  isForm,
  newDoc,
  setNewDoc,
  updateForm,
  handleRemoveDocRow,
  showAttachments,
  validationError
}) => {
  return (
    <div className="border-collapse table-auto w-full text-sm">
      { isForm 
        ? <DocsCompilerForm
            docs={docs}
            newDoc={newDoc}
            setNewDoc={setNewDoc}
            validationError={validationError}
          />
        : <DocsSummaryTable
            docs={docs}
            updateForm={updateForm}
            handleRemoveDocRow={handleRemoveDocRow}
            showAttachments={showAttachments}
          />
      }
    </div>
  )
}

const DocsCompilerHeader = ({
  form,
  showForm,
  resetView,
  confirmNewDoc,
  updateForm
}) => {
  return (
    <>
      <h4 className="title-3">Documenti allegati</h4>
      { !form && updateForm && (
          <Button
            text="Aggiungi"
            icon={<FiPlusCircle />}
            className="text-sm btn-primary"
            onClick={() => showForm(true)}
          />
      )}

      { form && updateForm && (
        <div className="flex items-center">
          <Button
            text="Conferma"
            icon={<FiCheck />}
            onClick={confirmNewDoc}
            className="text-sm btn-primary"
          />

          <Button
            icon={<FiX />}
            onClick={resetView}
            className="bg-light-100 dark:bg-dark-100 hover:bg-light-200 dark:hover:bg-dark-200 flex items-center justify-center w-[40px] h-[40px] text-center p-1 rounded-full ml-2"
          />
        </div>
      )}
    </>
  )
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function DocsCompiler({
  order,
  updateForm,
  showAttachments
}) {
  const { docs } = order;
  const [ form, showForm ] = useState(false);
  const [ newDoc, setNewDoc ] = useState(starterDoc);
  const [ validationError, setValidationError ] = useState([]);

  const confirmNewDoc = async () => {
    if(!newDoc?.number) {
      toast.error("Devi inserire il numero del documento");
      setValidationError(prev => prev.concat("number"));
      return null;
    } else {
      await handleDocs({ action: "add", prevDocs: docs, newDoc, updateForm });
      setValidationError([]);
      showForm(false);
      setNewDoc(starterDoc);
    }
  }

  const resetView = () => {
    showForm(false);
    setNewDoc(starterDoc);
  }

  const handleRemoveDocRow = (index) => {
    handleDocs({ action: "remove", prevDocs: docs, index, updateForm })
  }
  
  return (
    <CardDetails
      className="mt-4"
      header={(
        <DocsCompilerHeader
          form={form}
          showForm={showForm}
          updateForm={updateForm}
          resetView={resetView}
          confirmNewDoc={confirmNewDoc}
        />
      )}
    >
    <DocsCompilerModuleRouter
      docs={docs}
      updateForm={updateForm}
      isForm={form}
      newDoc={newDoc}
      setNewDoc={setNewDoc}
      showAttachments={showAttachments}
      handleRemoveDocRow={updateForm ? handleRemoveDocRow : null}
      validationError={validationError}
    />
  </CardDetails>)
}