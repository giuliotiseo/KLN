import React from 'react'
import CheckpointLocation from '../../../contacts/components/checkpoint/summary/CheckpointLocation';
import CheckpointAssets from '../../../customers/components/checkpoint/summary/CheckpointAssets';
import CheckpointContacts from '../../../customers/components/checkpoint/summary/CheckpointContacts';
import CheckpointThirdCompany from '../../../customers/components/checkpoint/summary/CheckpointThirdCompany';
import HeaderCheckpoint from '../../../customers/components/checkpoint/summary/HeaderCheckpoint';
import WindowCheckpointDetails from '../../../customers/components/checkpoint/summary/WindowCheckpointDetails';
import NoteViewer from '../../../globals/components/layout/NoteViewer';

const PreOrderCheckpointDetails = ({
  preOrder
}) => {
  let { checkpoint } = preOrder; 
  const windows = Array.isArray(checkpoint.windows) 
    ? checkpoint.windows.reduce((acc,val) => ({
        ...acc,
        [val.type]: checkpoint.windows.filter(window => window.type === val.type)
      }), {})
    : checkpoint.windows;

  return (
    <section>
      <HeaderCheckpoint
        checkpoint={checkpoint}
        editEnabled={false}
        index={0}
      />
      
      <CheckpointLocation
        checkpoint={checkpoint}
        editEnabled={false}
        index={0}
        hideMap={true}
      />

      { checkpoint?.thirdCompany?.id && (
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
          className="mt-4"
        />
      }

      { checkpoint?.note && (
        <div className="mt-4">
          <h4 className="title-4">Note punto di interesse</h4>
          <NoteViewer content={checkpoint.note} />
        </div>
      )}
    </section>
  )
}

export default PreOrderCheckpointDetails
