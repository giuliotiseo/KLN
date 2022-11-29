import React from 'react'
import { FiX } from 'react-icons/fi'
import Button from '../../../globals/components/buttons_v2/Button'
import LiveFiles from '../../../globals/components/dataDisplay/LiveFiles'

const OrderAttachmentsFloatingWindow = ({
  docs,
  addFile,
  removeFile,
  restoreFile,
  title = "Titolo finestra",
  attachments,
  showAttachments,
}) => {
  return (
    <div>
      {/* Fixed window for attachments */}
      <div className={`fixed right-6 bottom-10 transition-all ${attachments ? "pointer-events-all" : "pointer-events-none"}`}>
        <div
          className={`mb-2 z-50 backdrop-blur-lg bg-base-100/30 w-[400px] h-[350px] shadow-xl rounded-md border border-zinc-300 
          ${attachments ? "pointer-events-all opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <div className='p-2 relative'>
            <div className='flex items-start'>
              <h3 className='title-4 mb-2 flex-1'>{title}</h3>
              <Button
                icon={<FiX className='text-xl' />}
                onClick={() => showAttachments(false)}
                className="btn-ghost pt-1"
              />
            </div>
            <LiveFiles
              files={docs?.[attachments - 1]?.files || []}
              dropCallback={(value) => addFile({ value, docIndex: attachments - 1})}
              removeCallback={(value) => removeFile({ value, docIndex: attachments - 1 })}
              restoreFile={(value) => restoreFile({ value, docIndex: attachments - 1 })}
              showEmptyBox={true}
              dropZoneHeight={200}
              loadedText={""}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderAttachmentsFloatingWindow
