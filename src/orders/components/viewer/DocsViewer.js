import React from 'react'
import CardDetails from '../../../globals/components/dataDisplay/CardDetails'
import { FiFileText, FiPaperclip } from 'react-icons/fi'
import { formatDate } from '../../../globals/libs/helpers'

// Constants & Functions ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const docsTable = {
  headings: ["Numero", "Data", "Tipo", "Allegato"]
}

const DocsViewerHeader = () => {
  return (
    <div className="flex items-center">
      <FiFileText className="text-lg mr-1" />
      <h3 className="title-3">Documenti allegati</h3>
    </div>
  )
}

function DocsViewer({
  docs,
  showAttachments
}) {
  return (
    <CardDetails
      header={<DocsViewerHeader />}
    >
      <table className="border-collapse table-auto w-full">
        <thead>
          <tr>
            { docsTable.headings.map(th => <th className="border-b pb-2 dark:border-slate-600 text-slate-400 dark:text-slate-200 text-left" key={th}>{th}</th>)}
          </tr>
        </thead>
        <tbody>
          { docs.length === 0 
          ? (
              <tr>
                <td colSpan={docsTable.headings.length}>
                  <p className="italic mt-2">
                    Nessun documento caricato
                  </p>
                </td>
              </tr>
            )
          : docs.map((doc, index) => (
            <tr key={index} className="text-left hover:bg-light-200 dark:hover:bg-dark-200">
              <td className="py-1">{doc?.number}</td>
              <td className="py-1">{doc?.date ? formatDate(new Date(doc.date)) : ""}</td>
              <td className="py-1">{doc?.type}</td>
              <td className="py-1">{doc?.files?.length > 0 
                ? <button 
                    onClick={() => showAttachments(index + 1)}
                    className="flex w-full items-center text-primary-100 dark:text-primary-300 hover:text-primary-300 dark:hover:text-primary-200"
                  >
                    <FiPaperclip className="inline-block mr-1" />
                    <span className="inline-block">Vedi allegati</span>
                  </button> 
                : <p className='text-sm'>Nessun allegato</p>}
              </td>
            </tr>
          ))}
        </tbody>        
      </table>
    </CardDetails>
  )
}

export default DocsViewer
