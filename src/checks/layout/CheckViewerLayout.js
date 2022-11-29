import { useState } from "react";
import SafeCol from "../../globals/components/layout/SafeCol";
import CheckOrderRefViewer from "../components/display/CheckOrderRefViewer";
import LinkedChecks from "../components/create/LinkedChecks";
import CheckViewerContainer from "../containers/CheckViewerContainer";
import AttachmentsList from "../../orders/components/viewer/AttachmentsList";
import DeleteCheckDialog from "../components/viewer/DeleteCheckDialog";
import { CHECK_STATUS_DESCRIPTION } from "../libs/constants";
import { globalStatusColorsText } from "../../globals/libs/helpers";
import { GrStatusGoodSmall } from "react-icons/gr";
import Button from "../../globals/components/buttons_v2/Button";
import LinkButton from "../../globals/components/buttons_v2/LinkButton";
import { FiCheck, FiTerminal } from "react-icons/fi";
import { BiReset } from "react-icons/bi";

// Main component ------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function CheckViewerLayout({
  check,
  buttons,
  queryFrom,
}) {
  const [ deleteDialog, setDeleteDialog ] = useState(false);
  const [ attachments, showAttachments ] = useState(false);
  const { order } = check;

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">

        {/* Sidebar */}
        <aside className="relative rounded-lg flex-1 my-2 overflow-hidden">
          <SafeCol id="CheckViewer--sidebar">
            <div className="mr-4">
              <div className="mt-4">
                <h1 className="title-2">Assegno {check.stamp.split('-')[1]}</h1>
                <div className='text-lg bg-base-100 p-2 rounded-md my-4'>
                  <GrStatusGoodSmall className={`inline-block mr-1 ${globalStatusColorsText[check.status]}`} />
                  <p className="inline-block">{ CHECK_STATUS_DESCRIPTION[check.status]}</p>
                </div>
              </div>

              <CheckOrderRefViewer
                order={order}
                docs={check.docsRef}
                keyDocNum={check.keyDocNum}
                queryFrom={queryFrom}
                showAttachments={showAttachments}
              />

              { order?.id && ( 
                <LinkedChecks
                  orderId={order.id}
                  stamp={order.stamp}
                  queryFrom={queryFrom}
                />
              )}
            </div>
          </SafeCol>
        </aside>

        {/* Content */}
        <section className="relative flex-1 bg-base-200">
          <SafeCol id="CheckViewer--content">
            <div className="pl-2 pr-4">
              <CheckViewerContainer check={check} />
            </div>
          </SafeCol>
        </section>

        {/* Fixed window for attachments */}
        <div className={`fixed right-6 bottom-8 ${attachments ? "pointer-events-all" : "pointer-events-none"}`}>
          <div
            className={`mb-2 z-50 backdrop-blur-lg bg-base-100/30 w-[400px] h-[350px] shadow-xl rounded-md border border-zinc-300 
            ${attachments ? "pointer-events-all opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <AttachmentsList
              docs={order.docs}
              showAttachments={showAttachments}
              indexAttachment={attachments ? attachments - 1 : null}
              remote={true}
            />
          </div>
        </div>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Visualizzazione assegno</span>
        </h5>
        
        { queryFrom !== 'sender' && (
          <div className="flex items-center gap-2">
            <Button
              className="btn-primary-outline  ml-auto"
              icon={<BiReset />}
              text="Elimina"
              onClick={() => setDeleteDialog(true)}
            />

            <LinkButton
              className="btn-primary ml-auto"
              icon={<FiCheck />}
              text={buttons.edit.text}
              to={buttons.edit.to}
            />
          </div>
        )} 
      </footer>

      <DeleteCheckDialog
        open={deleteDialog}
        close={() => setDeleteDialog(false)}
        topMessage="Perderai tutti i dati di questo assegno"
        buttons={buttons.delete}
        check={check}
        loading={buttons.loading}
      />

    </div>
  )
}