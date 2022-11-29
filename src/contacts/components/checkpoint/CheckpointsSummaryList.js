import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { TinyTitle } from "../../../globals/components/typography/titles";
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import HeaderCheckpoint from "./summary/HeaderCheckpoint";
import CheckpointLocation from "./summary/CheckpointLocation";
import CheckpointAccessInfo from "./summary/CheckpointAccessInfo";
import CheckpointContacts from "./summary/CheckpointContacts";
import CheckpointAssets from "./summary/CheckpointAssets";
import WindowCheckpointDetails from "../WindowCheckpointDetails";
import NoteViewer from "../../../globals/components/layout/NoteViewer";
// Store
import { selectAllContactsIds } from "../../slices/allContactsSlice";
// Helpers
import { CONTACT_TYPES_SCOPE } from "../../libs/helpers";
import { createContactThunk } from "../../../app/thunks/contactsThunks";
import { selectCompanyInfo } from "../../../company/slices/companyInfoSlice";

export default function CheckpointsSummaryList ({
  checkpoints,
  dispatchEdit,
  editEnabled,
  handleRemoveCheckpoint,
  setModalAddress,
  hideMap
}) {
  const allContactsIds = useSelector(selectAllContactsIds);
  const myCompany = useSelector(selectCompanyInfo);
  const dispatch = useDispatch();

  async function runCreateContact(contact, fromRemote, enabledToast) {
    if(fromRemote) {
      dispatch(createContactThunk({
        type: CONTACT_TYPES_SCOPE["WAREHOUSE"], 
        contact: {
          ...contact,
          id: `${contact.email}-c-fromRemote`,
          tenant: myCompany.tag,
          avatar: null,
        }, 
        enabledToast,
        fromRemote
      }));
    }
  }

  return (
    <section>
      { checkpoints?.length > 0
        ? checkpoints.map((checkpoint, index) => {
          const windows = Array.isArray(checkpoint.windows) 
            ? checkpoint.windows.map(window => ({ ...window, type: !window?.type ? "CARICO" : window.type }))
            : checkpoint.windows;

          return (
            <div key={`${index}-${v4()}`} className={`${index > 0 && 'border-t mt-4 pt-4 border-light-50 dark:border-dark-300'}`}>
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

              <CheckpointAccessInfo
                checkpoint={checkpoint}
                styles="mt-4"
              />

              <WindowCheckpointDetails
                windows={windows}
                styles="mt-4"
              />

              <CheckpointAssets
                checkpoint={checkpoint}
                styles="mt-4"
              />
              
              { checkpoint?.contacts?.length > 0 &&  
                <CheckpointContacts
                  checkpoint={checkpoint}
                  runCreateContact={runCreateContact}
                  allContactsIds={allContactsIds}
                  styles="mt-4"
                />
              }

              { checkpoint?.note && (
                <div className="mt-4">
                  <TinyTitle>Note punto di interesse</TinyTitle>
                  <NoteViewer content={checkpoint.note} />
                </div>
              )}
            </div>
          )})
        : <SmallParagraph>Nessun checkpoint registrato</SmallParagraph>
      }
    </section>
  )
}
