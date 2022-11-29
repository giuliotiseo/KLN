import React from 'react'
import CardDetails from '../../../globals/components/dataDisplay/CardDetails'
import { EditorReader } from '../../../globals/components/dataEntry_v2/TextEditor'

const CheckNoteReader = ({
  note
}) => {
  return (
    <CardDetails
      className="mt-4"
      header={<h3 className="title-3">Annotazioni</h3>}
    >
    <EditorReader content={note} />
  </CardDetails>
  )
}

export default CheckNoteReader
