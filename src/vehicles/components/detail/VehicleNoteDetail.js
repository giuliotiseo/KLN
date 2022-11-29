import { VscNote } from "react-icons/vsc";
import NoteViewer from "../../../globals/components/layout/NoteViewer";
import { Paragraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";

const VehicleNoteDetail = ({ content }) => {
  return (
  <div className="flex mx-2">
    <VscNote className="text-3xl text-zinc-400 dark:text-zinc-500" />
    <div className="flex flex-col ml-2">
      <SmallTitle>Annotazioni</SmallTitle>
      { content 
        ? <NoteViewer content={content} />
        : <Paragraph styles="opacity-50">Nessuna nota presente</Paragraph>
      }
      
    </div>
  </div>
)}

export default VehicleNoteDetail;