import { useState } from "react";
import FormText from "../../../globals/components/dataEntry/FormText";
import DatePicker from "react-datepicker";
import MultipleFilePicker from "../../../globals/components/dataEntry/MultipleFilePicker";
import ActionButton from "../../../globals/components/buttons/ActionButton";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
// Helpers
import { formatDate } from "../../../globals/libs/helpers";
// Icons
import { FiCheck, FiDelete, FiFileText, FiPaperclip, FiPlusCircle, FiX } from "react-icons/fi";

// Constants & Functions ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const docsTable = {
  headings: ["", "Numero", "Data", "Tipo", "Allegato"]
}

const starterDoc = { number: null, date: new Date(), type: "DDT", files: []}

async function handleDocs({ action, prevDocs, newDoc, updateForm, index }) {
  if(action === "add") {
    await updateForm({ target: { name: "docs", type: "docs", value: prevDocs.concat(newDoc)}});
  }

  if(action === "remove") {
    await updateForm({ target: { name: "docs", type: "docs", value: prevDocs.filter((_, doc_idx) => doc_idx !== index)}});
  }
}

// Sub component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
  * Docs: Table
*/
const DocsSummaryTable = ({ docs, showAttachments, handleRemoveDocRow }) => (
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
const DocsCompilerForm = ({ docs, newDoc, setNewDoc }) => {
  const { number, type, date, files } = newDoc;
  return (
    <>
      <div className="flex flex-wrap">
        <FormText
          label="Numero documento" 
          value={number} 
          onChange={({ target: { value }}) => setNewDoc(prev => ({ ...prev, number: value }))}
          styles="flex-1 mr-2"
        />

        <div className="flex-1 my-2 mr-2">
          <label className="label" htmlFor={`order-date-${docs.length + 1}`}>Data documento</label>
          <DatePicker
            id={`order-date-${docs.length + 1}`}
            selected={date}
            onChange={(date) => setNewDoc(prev => ({ ...prev, date }))}
            className="input w-full"
            locale="it"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="flex-1 my-2">
          <label className="label" htmlFor="order-doc-type">Tipo documento</label>
          <input
            id="order-doc-type"
            name="order-doc-type"
            type="text"
            onChange={({ target: { value }}) => setNewDoc(prev => ({ ...prev, type: value }))}
            className="input w-full"
            value={type}
          />
        </div>
      </div>


      <MultipleFilePicker
        id={`order-doc-${docs.length + 1}`}
        selectorButtonText="Aggiungi allegato"
        label="Seleziona dall'esplora risorse i file da allegare all'ordine (.xls, .docx, .pdf)"
        onChange={(item) => setNewDoc(prev => ({ ...prev, files: prev.files.concat(item) }))}
        onRemove={(newFileList) => setNewDoc(prev => ({ ...prev, files: newFileList }))}
        files={files}
      />
    </>
  )
}

/*
  * Docs: Module router
*/
const DocsCompilerModuleRouter = ({ docs, isForm, newDoc, setNewDoc, updateForm, handleRemoveDocRow, showAttachments }) => {
  return (
    <div className="border-collapse table-auto w-full text-sm">
      { isForm 
        ? <DocsCompilerForm
            docs={docs}
            newDoc={newDoc}
            setNewDoc={setNewDoc}
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

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function DocsCompiler({ docs = [], updateForm, showCompiler, showAttachments }) {
  const [ form, showForm ] = useState(false);
  const [ newDoc, setNewDoc ] = useState(starterDoc);

  const confirmNewDoc = async () => {
    await handleDocs({ action: "add", prevDocs: docs, newDoc, updateForm });
    showForm(false);
    setNewDoc(starterDoc);
  }

  const resetView = () => {
    showForm(false);
    setNewDoc(starterDoc);
  }

  const handleRemoveDocRow = (index) => {
    handleDocs({ action: "remove", prevDocs: docs, index, updateForm })
  }
  
  return <>
    <SmallTitle styles="flex items-center justify-between mb-4">
      {/* <img src={deliveryIcon} className='w-[30px] mr-2' /> */}
      <div className="flex items-center">
        <FiFileText className="text-lg mr-1" />
        <span>Documenti allegati</span>
      </div>

      { !form && showCompiler && updateForm && (
          <ActionButton
            text="Aggiungi"
            icon={() => <FiPlusCircle />}
            styles="text-sm btn-primary"
            onClick={() => showForm(true)}
          />
      )}

     { form && showCompiler && updateForm && (
        <div className="flex items-center">
          <ActionButton
            text="Conferma"
            icon={() => <FiCheck />}
            onClick={() => confirmNewDoc()}
            styles="text-sm btn-primary"
          />

          <ActionButton
            icon={() => <FiX />}
            onClick={resetView}
            styles="bg-light-100 dark:bg-dark-100 hover:bg-light-200 dark:hover:bg-dark-200 flex items-center justify-center w-[40px] h-[40px] text-center p-1 rounded-full ml-2"
          />
        </div>
      )}
    </SmallTitle>

    { showCompiler 
      ? <DocsCompilerModuleRouter
          docs={docs}
          updateForm={updateForm}
          isForm={form}
          newDoc={newDoc}
          setNewDoc={setNewDoc}
          showAttachments={showAttachments}
          handleRemoveDocRow={updateForm ? handleRemoveDocRow : null}
        />
      : <Paragraph styles="alert-info px-4 mt-4">
          Indica le informazioni di ritiro e consegna per procedere
        </Paragraph>
    }
  </>
}