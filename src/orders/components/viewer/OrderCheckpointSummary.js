import React from 'react'
import CheckpointAssets from '../../../customers/components/checkpoint/summary/CheckpointAssets'
import CheckpointContacts from '../../../customers/components/checkpoint/summary/CheckpointContacts'
import WindowCheckpointDetails from '../../../customers/components/checkpoint/summary/WindowCheckpointDetails'
import NoteViewer from '../../../globals/components/layout/NoteViewer'

function OrderCheckpointSummary({
  checkpoint,
  windowsToShow = ["CARICO", "SCARICO"]
}) {
  return (
    <div className={`bg-base-100 rounded-md`}>
      <WindowCheckpointDetails
        windows={checkpoint?.windows}
        windowsToShow={windowsToShow}
      />

      <CheckpointAssets
        checkpoint={checkpoint}
        className="mt-4"
      />
      
      { checkpoint?.contacts?.length > 0 &&  
        <CheckpointContacts
          checkpoint={checkpoint}
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
}

export default OrderCheckpointSummary
