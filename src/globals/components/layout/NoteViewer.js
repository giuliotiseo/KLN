import { Editor, EditorState, ContentState, convertFromRaw } from 'draft-js';
import { useState } from 'react';
import { isJSON } from "../../libs/helpers";

export default function NoteViewer({ content, styles }) {
  const [viewerState, setViewerState] = useState(
    content
      ? () => isJSON(content) ? EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : EditorState.createWithContent(ContentState.createFromText(content))
      : () => EditorState.createEmpty()
  );

  return (
    <div className={`${styles}`}>
      <Editor
        editorState={viewerState}
        onChange={setViewerState}
        handleKeyCommand={null}
        readOnly={true}
      />
    </div>
  )
}