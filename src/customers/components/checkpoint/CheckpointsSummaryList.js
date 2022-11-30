import { v4 } from "uuid";
import NoteViewer from "../../../globals/components/layout/NoteViewer";
import CheckpointAssets from "./summary/CheckpointAssets";
import CheckpointContacts from "./summary/CheckpointContacts";
import CheckpointLocation from "./summary/CheckpointLocation";
import HeaderCheckpoint from "./summary/HeaderCheckpoint";
import WindowCheckpointDetails from "./summary/WindowCheckpointDetails";
import { MdGpsOff } from "react-icons/md";
import CheckpointThirdCompany from "./summary/CheckpointThirdCompany";

export default function CheckpointsSummaryList ({
  checkpoints,
  dispatchEdit,
  editEnabled,
  handleRemoveCheckpoint,
  setModalAddress,
  hideMap,
  noItemsText = "Nessun checkpoint registrato"
}) {
  return (
    <section>
      { checkpoints?.length > 0
        ? checkpoints.map((checkpoint, index) => {
          const windows = Array.isArray(checkpoint.windows) 
            ? checkpoint.windows.reduce((acc,val) => ({
                ...acc,
                [val.type]: checkpoint.windows.filter(window => window.type === val.type)
              }), {})
            : checkpoint.windows;

          return (
            <div key={`${index}-${v4()}`} className={`bg-base-100 p-4 rounded-md ${index > 0 && 'mt-4 pt-4 border-light-50 dark:border-dark-300'}`}>
              <HeaderCheckpoint
                checkpoint={checkpoint}
                dispatchEdit={dispatchEdit}
                handleRemoveCheckpoint={handleRemoveCheckpoint}
                editEnabled={editEnabled}
                index={index}
              />
              
              <CheckpointLocation
                checkpoint={checkpoint}
                setModalAddress={setModalAddress}
                editEnabled={editEnabled}
                index={index}
                hideMap={hideMap}
              />

              {(checkpoint?.thirdCompany?.id || checkpoint?.thirdCompanyId ) && (
                <CheckpointThirdCompany
                  checkpoint={checkpoint}
                  className="mt-4"
                />
              )}

              <WindowCheckpointDetails
                windows={windows}
                className="mt-4"
              />

              <CheckpointAssets
                checkpoint={checkpoint}
                className="mt-4"
              />
              
              { checkpoint?.contacts?.length > 0 &&  
                <CheckpointContacts
                  checkpoint={checkpoint}
                  // runCreateContact={runCreateContact}
                  // allContactsIds={allContactsIds}
                  className="mt-4"
                />
              }

              { checkpoint?.note && (
                <div className="mt-4">
                  <h4 className="title-4">Note punto di interesse</h4>
                  <NoteViewer content={checkpoint.note} />
                </div>
              )}
            </div>
          )
        })
        : <div className="bg-base-100 py-4 px-2 rounded-md flex items-center text-base text-gray-500 dark:text-gray-400">
            <MdGpsOff className="mr-1" />
            <span>
              { noItemsText }
            </span>
          </div>
      }
    </section>
  )
}
